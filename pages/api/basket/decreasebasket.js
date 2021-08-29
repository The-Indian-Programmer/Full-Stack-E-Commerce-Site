import connectDb from "../../../src/database/connection";
import productSchema from "../../../src/models/productSchema";
import userSchema from "../../../src/models/UserSchema";
connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "POST": {
      await decreaseBasket(req, res);
    }
  }
};

const decreaseBasket = async (req, res) => {
  try {
    const update = await userSchema.updateOne(
      { _id: req.body.userId, "basket._id": req.body.data._id },
      { $set: { "basket.$.quantity": req.body.data.quantity - 1 } }
    );
    if (update) {
      const user = await userSchema.findById(req.body.userId);
      return res
        .status(200)
        .json({ message: "Descreased Item", userdata: user });
    }
    res.status(400).json({ err: "Can't Decrease Item" });
  } catch (error) {
    return res.status(500).json({ err: "Error Found" });
  }
};
