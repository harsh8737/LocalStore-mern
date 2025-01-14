const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecrect = "Isitmaketheprojectworkwithauthentication1$ "

router.post(
  "/createuser",
  body("email").isEmail().withMessage("Invalid email address"),
  body("name")
    .isLength({ min: 5 })
    .withMessage("Name must be at least 5 characters long"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10)
    let secPassword = await bcrypt.hash(req.body.password, salt)  

    try {
      let userData = await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,  

       }).then(res.json({ succes: true }))

    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

router.post(
  "/loginuser",
  body("email").isEmail(),
  body("password", "Incorrect Password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;

        // Find user by email
        const userData = await User.findOne({ email: req.body.email });
        if (!userData) {
          return res.status(400).json({ errors: "Invalid email or password" });
        }

        const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
        if (!pwdCompare) {
          return res.status(400).json({ errors: "Invalid email or password" });
        }

        const data = {
          user:{
            id:userData.id
          }
        }

        const authToken = jwt.sign(data,jwtSecrect)

      return res.json({ succes: true, authToken:authToken });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

module.exports = router;
