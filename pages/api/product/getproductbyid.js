import connectDb from "../../../src/database/connection";
import productSchema from "../../../src/models/productSchema";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "POST": {
      await getproductData(req, res);
    }
  }
};

const getproductData = async (req, res) => {
  try {
    const id = req.body;
    const product = await productSchema.findById({ _id: id });
    if (!product) {
      return res.status(400).json({ err: "Some Error found" });
    }
    res.json({ product: product, message: "Product Found" });
    // res.status(200).json({ message: "Product Found" });
  } catch (error) {
    return res.status(500).json({ err: "Error Found" });
  }
};
