import nextConnect from "next-connect";
import { dbConnect, dbDisconnect } from "../../../lib/dbConnect";
import Volunteer from "../../../models/Volunteer";

const handler = nextConnect();

handler.get(async (req, res) => {
  await dbConnect();

  try {
    const volunteers = await Volunteer.find();
    res.status(200).json({ success: true, data: volunteers });
  } catch (error) {
    res.status(400).json({ success: false });
  }

  await dbDisconnect();
});

export default handler;
