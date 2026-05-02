const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // 👤 Full Name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // 📧 Email (unique login identifier)
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please enter a valid email address",
      ],
    },

    // 🔑 Password (required for login)
    password: {
      type: String,
      required: true,
      minlength: 4, // simple validation for now
    },

    // 🧑‍💼 Role (Admin / Member)
    role: {
      type: String,
      enum: ["Admin", "Member"],
      default: "Member",
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

module.exports = mongoose.model("User", userSchema);