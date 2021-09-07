import connectDb from "../../../src/database/connection";
import userSchema from "../../../src/models/UserSchema";
import orderSchema from "../../../src/models/orderSchema";
connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "GET": {
      await getuserorders(req, res);
    }
  }
};

const getuserorders = async (req, res) => {
  const id = req.headers.authorization;
  try {
    const userOrders = await orderSchema.find({ userid: id });
    if (userOrders) {
      return res.json({ data: userOrders, message: "Data Found" });
    }
    return res.json({ err: "Some Error Found" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
