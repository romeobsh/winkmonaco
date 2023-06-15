import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema({
  firstText: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  secondText: {
    type: String,
  },
});

export default mongoose.models.Partner || mongoose.model("Partner", partnerSchema);
