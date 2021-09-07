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
    if (
      !req.body.productInfo.title ||
      !req.body.productInfo.description ||
      !req.body.productInfo.content ||
      !req.body.productInfo.price ||
      !req.body.productInfo.originalprice ||
      !req.body.productInfo.instock ||
      !req.body.productInfo.category ||
      !req.body.productInfo.isprime
    ) {
      return res.status(400).json({ err: "All Fields are required." });
    }
    if (req.body.images.length <= 0) {
      return res.status(400).json({ err: "Choose at least 1 image." });
    }
    const newProduct = new productSchema({
      title: req.body.productInfo.title,
      description: req.body.productInfo.description,
      content: req.body.productInfo.content,
      price: req.body.productInfo.price,
      originalprice: req.body.productInfo.originalprice,
      inStock: req.body.productInfo.instock,
      sold: 0,
      category: req.body.productInfo.category,
      checked: req.body.productInfo.isprime,
      images: req.body.images,
    });
    const productSave = await newProduct.save();
    if (productSave) {
      return res.status(200).json({ message: "Product Saved !" });
    }
    res.json({ err: "Something went wrong !" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
