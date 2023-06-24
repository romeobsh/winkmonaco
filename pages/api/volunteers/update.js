import nextConnect from "next-connect";
import { dbConnect, dbDisconnect } from "../../../lib/dbConnect";
import Volunteer from "../../../schemas/Volunteer";

const handler = nextConnect();

handler.put(async (req, res) => {
  await dbConnect();

  const { id, firstName, lastName, telephone, email, job, address, comment } = req.body;

  try {
    const volunteer = await Volunteer.findByIdAndUpdate(id, { firstName, lastName, telephone, email, job, address, comment }, { new: true });

    res.status(200).json({ success: true, data: volunteer });
  } catch (error) {
    res.status(400).json({ success: false });
  }

  await dbDisconnect();
});

export default handler;
