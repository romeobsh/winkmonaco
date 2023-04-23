import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  logoUrl: {
    type: String,
    required: true,
  },
  websiteUrl: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Partner || mongoose.model("Partner", partnerSchema);
