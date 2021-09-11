import connectDb from "../../../src/database/connection";
import productSchema from "../../../src/models/productSchema";
import userSchema from "../../../src/models/UserSchema";
connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "POST": {
      await addproductreplyreq(req, res);
    }
    case "PUT": {
      await updateproductreply(req, res);
    }
    case "DELETE": {
      await deleteproductreply(req, res);
    }
  }
};

const addproductreplyreq = async (req, res) => {
  try {
    console.log(req.body);
    res.json({ err: "Something went wrong !" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const updateproductreply = async (req, res) => {};

const deleteproductreply = async (req, res) => {};
