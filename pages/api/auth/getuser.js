import connectDb from "../../../src/database/connection";
import userSchema from "../../../src/models/UserSchema";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "GET": {
      await getuser(req, res);
    }
  }
};

const getuser = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const user = await userSchema.findOne({
      tokens: { $elemMatch: { token: token } },
    });
    if (user === null) {
      res.status(400).json({ err: "User Not Found. Need to Login" });
      return;
    }

    return res.json({ message: "User Found", data: user });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
