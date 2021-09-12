import connectDb from "../../../src/database/connection";
import userSchema from "../../../src/models/UserSchema";
import orderSchema from "../../../src/models/orderSchema";
connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "POST": {
      await changeDelivery(req, res);
    }
  }
};

const changeDelivery = async (req, res) => {
  try {
    const { userid, orderid } = req.body;
    const update = await orderSchema.findByIdAndUpdate(
      { _id: orderid },
      { $set: { delivered: true } }
    );
    if (update) {
      return res.json({ message: "Done" });
    }
    return res.json({ err: "Some Error Found" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
