const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET USERS
router.get("/", async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json(users);
});

// UPDATE USER
router.put("/:id", async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE USER
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;