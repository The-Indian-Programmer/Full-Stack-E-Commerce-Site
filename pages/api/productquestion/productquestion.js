import connectDb from "../../../src/database/connection";
import productSchema from "../../../src/models/productSchema";
import userSchema from "../../../src/models/UserSchema";
connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "POST": {
      await addproductquestion(req, res);
    }
    case "PUT": {
      await updateproductquestion(req, res);
    }
    case "DELETE": {
      await deleteproductquestion(req, res);
    }
  }
};

const addproductquestion = async (req, res) => {
  try {
    const productupdate = await productSchema.findByIdAndUpdate(
      {
        _id: req.body.productid,
      },
      {
        $push: {
          questions: {
            username: req.body.name,
            userid: req.body.userid,
            question: req.body.question,
            answer: "",
          },
        },
      }
    );
    if (productupdate) {
      return res.json({ message: "Questions Added ! Wait for the reply" });
    }
    res.json({ err: "Something went wrong !" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const updateproductquestion = async (req, res) => {};

const deleteproductquestion = async (req, res) => {};
