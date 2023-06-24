import mongoose from "mongoose";

const paymentInfoSchema = new mongoose.Schema({
  ownerName: {
    type: String,
    required: true,
  },
  iban: {
    type: String,
    required: true,
  },
  bic: {
    type: String,
    required: true,
  },
  recipient: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

export default mongoose.models.PaymentInfo || mongoose.model("PaymentInfo", paymentInfoSchema);
