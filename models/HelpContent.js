import mongoose from "mongoose";

const helpContentSchema = new mongoose.Schema({
  firstText: {
    type: String,
    required: true,
  },
  enFirstText: {
    type: String,
    required: true,
  },
  isActiveKit: {
    type: Boolean,
    required: true,
  },
  kitContent: {
    type: String,
    required: true,
  },
  enKitContent: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  imageUrl2: {
    type: String,
    required: true,
  },
  imageUrl3: {
    type: String,
    required: true,
  },
  secondText: {
    type: String,
    required: true,
  },
  enSecondText: {
    type: String,
    required: true,
  },
});

export default mongoose.models.HelpContent || mongoose.model("HelpContent", helpContentSchema);
