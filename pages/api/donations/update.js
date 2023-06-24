import nextConnect from "next-connect";
import { dbConnect, dbDisconnect } from "../../../lib/dbConnect";
import Donation from "../../../schemas/Donation";

const handler = nextConnect();

handler.put(async (req, res) => {
  await dbConnect();

  const { id, fullName, email, amount, type, createdAt } = req.body;

  try {
    const donation = await Donation.findByIdAndUpdate(id, { fullName, email, amount, type, createdAt }, { new: true });

    res.status(200).json({ success: true, donation: donation });
  } catch (error) {
    res.status(400).json({ success: false });
  }

  await dbDisconnect();
});

export default handler;
