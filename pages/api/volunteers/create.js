import nextConnect from "next-connect";
import { dbConnect, dbDisconnect } from "../../../lib/dbConnect";
import Volunteer from "../../../schemas/Volunteer";

const handler = nextConnect();

handler.post(async (req, res) => {
  await dbConnect();

  const { firstName, lastName, telephone, email, job, address, comment } = req.body;

  const volunteer = new Volunteer({ firstName, lastName, telephone, email, job, address, comment });

  try {
    await volunteer.save();
    res.status(201).json({ success: true, data: volunteer });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }

  await dbDisconnect();
});

export default handler;
