import connectDb from "../../../src/database/connection";
import categorySchema from "../../../src/models/categorySchema";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "DELETE": {
      await deleteCategory(req, res);
    }
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.body;
    const deleteQuery = await categorySchema.findByIdAndDelete(id);

    if (deleteQuery) {
      return res.status(200).json({ message: "Category Deleted" });
    }
    return res.json({ err: "Some Error Found" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
