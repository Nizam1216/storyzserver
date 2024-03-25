const userModel = require("../models/Users");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const jwt_secret = process.env.JWT_SECRET;

exports.registerController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, email, password, confirmPassword } = req.body;
    let user = await userModel.findOne({ email: email });

    if (user) {
      return res
        .status(400)
        .json({ message: "User Already exists With This Email" });
    }
    const salt = await bcrypt.genSalt(10);
    securePassword = await bcrypt.hash(password, salt);
    user = new userModel({
      // name: "nizam",
      // email: "nizam@gmail.com",
      // password: "123456",
      // confirmPassword: "123456",
      name: name,
      email: email,
      password: securePassword,
    });

    await user.save();
    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, jwt_secret);

    res.status(200).json({ authToken: authToken });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.loginController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // user will enter email and password in frontend login
    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: "Invalid Credentials" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(404).json({ error: "Invalid Credentials" });
    }
    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, jwt_secret);
    res.status(200).json({ authToken: authToken });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

//route 3 get user

exports.getuserController = async (req, res) => {
  try {
    //this userid will come from headers which has authToken
    const userId = req.user.id;
    const user = await userModel.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
