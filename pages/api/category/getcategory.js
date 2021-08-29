import connectDb from "../../../src/database/connection";
import categorySchema from "../../../src/models/categorySchema";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "GET": {
      await getCategory(req, res);
    }
  }
};

const getCategory = async (req, res) => {
  try {
    const findCategory = await categorySchema.find();
    if (findCategory) {
      return res
        .status(400)
        .json({ data: findCategory, message: "All category found" });
    }
    return res.json({ err: "Some Error Found" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
