import connectDb from "../../../src/database/connection";
import categorySchema from "../../../src/models/categorySchema";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "POST": {
      await createcategory(req, res);
    }
  }
};

const createcategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ err: "Please fill the field" });
    }
    const findCategory = await categorySchema.findOne({ name: name });
    if (findCategory) {
      return res.status(400).json({ err: "This category already exists" });
    }
    const newCategory = new categorySchema({
      name,
    });
    const categorySave = await newCategory.save();
    const categories = await categorySchema.find();
    if (categorySave) {
      return res.status(201).json({ message: "Category created", categories });
    }
    return res.json({ err: "Some Error Found" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
