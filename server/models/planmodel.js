import { Schema, model } from "mongoose";

const planSchema = new Schema({
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

const Plan = model("Plan", planSchema);
export default Plan;
