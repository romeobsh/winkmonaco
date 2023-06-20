import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  frTel: {
    type: String,
    required: true,
  },
  internationalTel: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Contact || mongoose.model("Contact", contactSchema);
