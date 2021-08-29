const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    basket: {
      type: Array,
      required: true,
    },
    orders: {
      type: Array,
      required: true,
    },
    favourite: {
      type: Array,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
      default:
        "https://res.cloudinary.com/da4nd5uif/image/upload/v1629737054/portofolio/g_cncn9m.jpg",
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);
/// generate the token here
Schema.methods.generateAuthToken = async function () {
  try {
    const token = await jwt.sign({ _id: this._id }, process.env.SECRET_TOKEN);
    /// add token into the database
    this.tokens = this.tokens.concat({ token: token });
    // this.token = token;
    return token;
  } catch (error) {
    console.log(`Error is ${error}`);
  }
};
const userSchema = mongoose.models.users || mongoose.model("users", Schema);
export default userSchema;
