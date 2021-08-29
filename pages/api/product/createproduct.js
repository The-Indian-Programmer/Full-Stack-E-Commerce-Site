import connectDb from "../../../src/database/connection";
import productSchema from "../../../src/models/productSchema";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "POST": {
      await createProductData(req, res);
    }
  }
};

const createProductData = async (req, res) => {
  try {
    console.log(req.body.images);
    return res.json({ data: "product" });
  } catch (error) {
    return res.status(500).json({ err: "Error Found" });
  }
};
