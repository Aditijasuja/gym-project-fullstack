import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [5, "Minimum 5 Char are required"],
    maxlength: [15, "Maximum 15 Char should be there"],
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Enter valid email address"],
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: ["member", "admin"],
    default: "member",
  },
  progress: {
    weight: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0,
    },
    attendence: {
      type: Number,
      default: 0,
    },
    workoutsCompleted: {
      type: Number,
      default: 0,
    },
  },
});

userSchema.methods = {
  generateJWTToken: async function () {
    return await jwt.sign(
      {
        id: this._id,
        email: this.email,
        subscription: this.subscription,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWR_EXPIRY,
      }
    );
  },
};

const User = model("User", userSchema);

export default User;
