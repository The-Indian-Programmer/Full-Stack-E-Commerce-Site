import connectDb from "../../../src/database/connection";
import productSchema from "../../../src/models/productSchema";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "PUT": {
      await updateproductData(req, res);
    }
  }
};

const updateproductData = async (req, res) => {
  try {
    console.log(req.body);

    const productUpdate = await productSchema.findByIdAndUpdate(
      { _id: req.body._id },
      {
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        price: req.body.price,
        originalprice: req.body.originalprice,
        inStock: req.body.inStock,
        category: req.body.category,
        checked: req.body.checked,
        images: req.body.images,
      }
    );
    console.log(productUpdate);
    if (productUpdate) {
      return res.json({ message: "Product Updated" });
    }
    res.json({ err: "Can't Update Product " });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
