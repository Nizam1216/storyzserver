const express = require("express");
const { body } = require("express-validator");
const {
  registerController,
  loginController,
  getuserController,
} = require("../controllers/userControllers");
const fetchUser = require("../middleware/fetchuser");
const router = express.Router();

router.post(
  "/register",
  [
    body("name", "Enter a Valid Name(min 5 characters)").isLength({ min: 5 }),
    body("email", "Enter a Valid e-mail").isEmail(),
    body("password", "Enter a Valid Password(min 5 characters)").isLength({
      min: 5,
    }),
  ],
  registerController
);
router.post(
  "/login",
  [
    body("email", "Enter a Valid e-mail").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],

  loginController
);

router.post("/getuser", fetchUser, getuserController);

module.exports = router;
