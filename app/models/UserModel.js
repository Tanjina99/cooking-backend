const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  photo: { type: String, default: "default.jpg" },
  address: { type: String },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Password must be at least 8 characters, include one uppercase letter, one lowercase letter, and one number
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value);
      },
      message:
        "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one number.",
    },
  },
  role: {
    type: String,
    enum: ["user", "admin", "author"],
    default: "user",
  },
  status: { type: String, enum: ["active", "block"], default: "active" },
});

//hashing the password in userSchema
userSchema.pre("save", async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error);
  }
});

//comparing the password
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error("Password comparison failed");
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
