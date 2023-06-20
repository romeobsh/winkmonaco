import nextConnect from "next-connect";
import { dbConnect, dbDisconnect } from "../../../lib/dbConnect";
import Donation from "../../../models/Donation";

const handler = nextConnect();

handler.post(async (req, res) => {
  await dbConnect();

  const { fullName, email, amount, type, createdAt } = req.body;

  const donation = new Donation({ fullName, email, amount, type, createdAt });

  try {
    await donation.save();
    res.status(201).json({ success: true, donation: donation });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error });
  }

  await dbDisconnect();
});

export default handler;
