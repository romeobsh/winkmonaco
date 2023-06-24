import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
  },
  email: {
    type: String,
  },
  job: String,
  address: String,
  comments: String,
});

export default mongoose.models.Volunteer || mongoose.model("Volunteer", volunteerSchema);
