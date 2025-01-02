const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .send({ message: "User Already Exist", success: false });
    }
    bcrypt.hash(password, 10, async function (err, hash) {
      const UserModel = new userModel({
        name,
        email,
        password: hash,
      });
      await UserModel.save();
      return res
        .status(201)
        .send({ message: "Signup Successfully", UserModel, success: true });
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Internal Server Error", success: false });
  }
};
const login = async (req, res) => {
  let { email, password } = req.body;
  const User = await userModel.findOne({ email });
  if (User) {
    bcrypt.compare(password, User.password, function (err, result) {
      if (result) {
        const token = jwt.sign({ email: User.email }, process.env.JWT_TOKEN, {
          expiresIn: "24h",
        });
        return res.status(200).send({
          success: "Login Successfully",

          name: User.name,
          email: User.email,

          token,
        });
      } else {
        return res
          .status(404)
          .send({ message: "Invalid email or password", success: false });
      }
    });
  } else {
    return res
      .status(404)
      .send({ message: "You Have Don't Any Account", success: false });
  }
};
module.exports = {
  registration,
  login,
};
