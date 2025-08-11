import { Schema, model } from "mongoose";
// import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: true,
  },
  durationInMonths: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  features: {
    type: [String], // e.g. ["Gym Access", "Personal Trainer", "Diet Plan"]
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Plan = mongoose.model("Plan", planSchema);
export default Plan;
