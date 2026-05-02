require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "*",
  credentials: false,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

app.use("/users", require("./routes/userRoutes"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/projects", require("./routes/projectRoutes"));
app.use("/tasks", require("./routes/taskRoutes"));

// MongoDB connection using ENV
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//  Use PORT from ENV
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
