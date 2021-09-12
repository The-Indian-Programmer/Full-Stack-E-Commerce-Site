import connectDb from "../../../src/database/connection";
import productSchema from "../../../src/models/productSchema";
import userSchema from "../../../src/models/UserSchema";
connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "POST": {
      await addproductreply(req, res);
    }
    case "PUT": {
      await updateproductreply(req, res);
    }
    case "DELETE": {
      await deleteproductreply(req, res);
    }
  }
};

const addproductreply = async (req, res) => {
  console.log(req.body);
  try {
    const update = await productSchema.updateOne(
      {
        _id: req.body.productid,
        "questions.question": req.body.question,
      },
      { $set: { "questions.$.answer": req.body.replytext } }
    );
    if (update) {
      const product = await productSchema.findById(req.body.productid);
      if (product) {
        return res.json({ message: "Reply Added", product: product });
      }
      return res.json({ message: "Reply Added" });
    }
    return res.json({ err: "Something went wrong" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const updateproductreply = async (req, res) => {};

const deleteproductreply = async (req, res) => {};
