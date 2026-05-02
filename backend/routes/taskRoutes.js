const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// =======================
// CREATE TASK
// =======================
router.post("/", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =======================
// GET TASKS (ROLE BASED)
// =======================
router.get("/", async (req, res) => {
  try {
    const { role, userId } = req.query;

    let tasks;

    if (role === "Admin") {
      tasks = await Task.find()
        .populate("assignedTo", "name email")
        .populate("createdBy", "name email")
        .sort({ createdAt: -1 });
    } else {
      tasks = await Task.find({ assignedTo: userId })
        .populate("assignedTo", "name email")
        .sort({ createdAt: -1 });
    }

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =======================
// UPDATE TASK
// =======================
router.put("/:id", async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("assignedTo", "name email role");

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =======================
// DELETE TASK
// =======================
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;