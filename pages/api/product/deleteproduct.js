import connectDb from "../../../src/database/connection";
import productSchema from "../../../src/models/productSchema";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "DELETE": {
      await deleteproductData(req, res);
    }
  }
};

const deleteproductData = async (req, res) => {
  try {
    const id = req.headers.authorization;
    const deleteproduct = await productSchema.findByIdAndDelete({ _id: id });
    if (deleteproduct) {
      return res.json({ message: "Product Deleted." });
    }
    res.json({ err: "Can't delete Product " });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
