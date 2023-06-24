import nextConnect from "next-connect";
import { dbConnect, dbDisconnect } from "../../../lib/dbConnect";
import Volunteer from "../../../schemas/Volunteer";

const handler = nextConnect();

handler.delete(async (req, res) => {
  await dbConnect();

  const { id } = req.query;

  try {
    await Volunteer.findByIdAndRemove(id);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false });
  }

  await dbDisconnect();
});

export default handler;
