import nextConnect from "next-connect";
import { dbConnect, dbDisconnect } from "../../../lib/dbConnect";
import Donation from "../../../schemas/Donation";

const handler = nextConnect();

handler.get(async (req, res) => {
  await dbConnect();

  try {
    const donations = await Donation.find();
    res.status(200).json({ success: true, data: donations });
  } catch (error) {
    res.status(400).json({ success: false });
  }

  await dbDisconnect();
});

export default handler;
