import connectDb from "../../../src/database/connection";
import userSchema from "../../../src/models/UserSchema";
import orderSchema from "../../../src/models/orderSchema";
connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "POST": {
      await addOrder(req, res);
    }
  }
};

const addOrder = async (req, res) => {
  const date = new Date();
  try {
    const userUpdate = await userSchema.findByIdAndUpdate(
      {
        _id: req.body.user._id,
      },
      {
        orders: req.body.user.basket,
        basket: [],
      }
    );
    if (userUpdate) {
      const finduser = await userSchema.findById(req.body.user._id);
      if (finduser) {
        const newOrder = await new orderSchema({
          userid: req.body.user._id,
          useremail: req.body.user.email,
          productInfo: req.body.user.basket,
          useraddress: req.body.userInfo.address,
          usermobile: req.body.userInfo.phone,
          orderdate: date,
          amount: req.body.amount,
          delivered: false,
        });
        const orderSave = await newOrder.save();
        if (orderSave) {
          return res.json({
            message:
              "Done ! We Will contact you by email when product is out for delivery",
            user: finduser,
          });
        }
      }
      return res.json({
        message:
          "Done ! We Will contact you by email when product is out for delivery",
        user: req.body.user,
      });
    }
    return res.json({ err: "Some Error Found" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
