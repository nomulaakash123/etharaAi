const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// CREATE PROJECT
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;

    const existing = await Project.findOne({ name });
    if (existing) {
      return res.status(400).json({ error: "Project already exists" });
    }

    const project = await Project.create({ name, description });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL PROJECTS
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;