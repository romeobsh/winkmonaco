import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  telephone: {
    type: String,
    required: true,
  },
  iban: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  additional: {
    type: String,
  },
  zipCode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Subscription || mongoose.model("Subscription", subscriptionSchema);
