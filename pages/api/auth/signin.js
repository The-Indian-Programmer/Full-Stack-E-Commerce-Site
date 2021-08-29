import connectDb from "../../../src/database/connection";
import userSchema from "../../../src/models/UserSchema";
import bcrypt from "bcrypt";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "POST": {
      await signin(req, res);
    }
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email: email });
    console.log(user);
    if (user === null) {
      return res.status(400).json({ err: "This email does not exist" });
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.json({ err: "Password don't match" });
    }
    res.status(200).json({ message: "Login Success", data: user });
  } catch (err) {
    res.status(500).json({ err: err.message });
    console.log(err.message);
  }
};
