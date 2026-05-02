require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


// Add CORS middleware before routes
app.use(cors({
  origin: 'https://innovative-delight-production.up.railway.app',  // Your frontend URL
  credentials: true,  // Allow cookies or authorization headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Include OPTIONS for preflight
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allow custom headers (Authorization)
}));

// Your routes go below this
app.post('/auth/signup', (req, res) => {
  // signup logic here
});
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
