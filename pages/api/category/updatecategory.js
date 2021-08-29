import connectDb from "../../../src/database/connection";
import categorySchema from "../../../src/models/categorySchema";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "PUT": {
      await updateCategory(req, res);
    }
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id, name } = req.body;
    const findCategory = await categorySchema.findOne({ name: name });
    if (findCategory) {
      return res.status(400).json({ err: "This category already exists" });
    }
    const updateQuery = await categorySchema.findByIdAndUpdate(id, {
      name,
    });

    if (updateQuery) {
      return res.status(200).json({ message: "Category Updated" });
    }
    return res.json({ err: "Some Error Found" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
