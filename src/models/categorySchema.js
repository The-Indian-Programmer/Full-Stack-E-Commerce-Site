const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const categorySchema =
  mongoose.models.category || mongoose.model("category", Schema);

export default categorySchema;
