import connectDb from "../../../src/database/connection";
import productSchema from "../../../src/models/productSchema";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "GET": {
      await getproductsData(req, res);
    }
  }
};

const getproductsData = async (req, res) => {
  try {
    const product = await productSchema.find();
    if (product === []) {
      return res.status(400).json({ err: "Some Error found" });
    }
    return res.json({ data: product });
  } catch (error) {
    return res.status(500).json({ err: "Error Found" });
  }
};
