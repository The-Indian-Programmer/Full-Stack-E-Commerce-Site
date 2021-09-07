import connectDb from "../../../src/database/connection";
import productSchema from "../../../src/models/productSchema";
import userSchema from "../../../src/models/UserSchema";
connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "POST": {
      await addproductrating(req, res);
    }
    case "PUT": {
      await updateproductrating(req, res);
    }
    case "DELETE": {
      await deleteproductrating(req, res);
    }
  }
};

const addproductrating = async (req, res) => {
  try {
    console.log(req.body);
    const productupdate = await productSchema.findByIdAndUpdate(
      {
        _id: req.body.productid,
      },
      {
        $push: {
          reviews: {
            username: req.body.name,
            userid: req.body.userid,
            rating: req.body.rating,
            ratingtext: req.body.ratingtext,
          },
        },
      }
    );
    if (productupdate) {
      return res.json({ message: "Review Added ! " });
    }
    res.json({ err: "Something went wrong !" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const updateproductrating = async (req, res) => {};

const deleteproductrating = async (req, res) => {};
