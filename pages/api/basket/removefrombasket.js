import connectDb from "../../../src/database/connection";
import productSchema from "../../../src/models/productSchema";
import userSchema from "../../../src/models/UserSchema";
connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "POST": {
      await removeproductfrombasket(req, res);
    }
  }
};

const removeproductfrombasket = async (req, res) => {
  try {
    const userUpdated = await userSchema.findByIdAndUpdate(
      {
        _id: req.body.userId,
      },
      {
        $pull: {
          basket: req.body.data,
        },
      }
    );
    if (userUpdated) {
      const user = await userSchema.findById(req.body.userId);
      return res
        .status(200)
        .json({ message: "Removed From Cart", userdata: user });
    }
    res.status(400).json({ err: "Can't remove product" });
  } catch (error) {
    return res.status(500).json({ err: "Error Found" });
  }
};
