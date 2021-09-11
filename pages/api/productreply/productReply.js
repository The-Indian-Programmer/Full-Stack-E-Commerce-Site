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
  try {
    console.log(req.body);
    const update = await productSchema.updateOne(
      {
        _id: req.body.productid,
        "questions.username": req.body.username,
        "questions.question": req.body.question,
      },
      { $set: { "questions.$.answer": req.body.replytext } }
    );
    if (update) {
      return res.json({ message: "Reply Added" });
    }
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const updateproductreply = async (req, res) => {};

const deleteproductreply = async (req, res) => {};
