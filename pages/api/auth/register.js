import valid from "../../../src/controller/userUtils";
import connectDb from "../../../src/database/connection";
import userSchema from "../../../src/models/UserSchema";
import bcrypt from "bcrypt";
import generateAuthToken from "../../../src/models/UserSchema";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "POST": {
      await register(req, res);
    }
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password, cpassword } = req.body;
    const errMsg = valid(name, email, password, cpassword);
    if (errMsg) return res.status(400).json({ err: errMsg });
    const user = await userSchema.findOne({ email: email });
    if (user !== null) {
      return res.status(400).json({ err: "This email already exist" });
    }
    const password_hash = await bcrypt.hash(password, 12);
    const newUser = new userSchema({
      name,
      email,
      password: password_hash,
    });
    const token = await newUser.generateAuthToken();
    // console.log(token);
    const userSave = await newUser.save();
    if (userSave) {
      res.status(201).json({ msg: "Registration Success", data: newUser });
    }
    console.log(newUser);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
