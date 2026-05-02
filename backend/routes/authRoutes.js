const express = require("express");
const router = express.Router();
const User = require("../models/User");


// =======================
// SIGNUP USER
// =======================
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        error: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: "Member", // 👈 FORCE ALL SIGNUPS TO MEMBER
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// =======================
// LOGIN USER
// =======================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        error: "User not found. Please sign up.",
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        error: "Invalid password",
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({
      error: "Server error",
    });
  }
});

module.exports = router;

