import nextConnect from "next-connect";
import { dbConnect, dbDisconnect } from "../../../lib/dbConnect";
import Subscription from "../../../schemas/Subscription";

const handler = nextConnect();

handler.get(async (req, res) => {
  await dbConnect();

  try {
    const subscription = await Subscription.find();
    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    res.status(400).json({ success: false });
  }

  await dbDisconnect();
});

export default handler;
