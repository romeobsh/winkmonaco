import nextConnect from "next-connect";
import { dbConnect, dbDisconnect } from "../../../lib/dbConnect";
import Subscription from "../../../schemas/Subscription";

const handler = nextConnect();

handler.post(async (req, res) => {
  await dbConnect();

  const { fullName, email, telephone, iban, address, additional, zipCode, city, amount, status, comment, createdAt } = req.body;

  const subscription = new Subscription({ fullName, email, telephone, iban, address, additional, zipCode, city, amount, status, comment, createdAt });

  try {
    await subscription.save();
    res.status(201).json({ success: true, subscription: subscription });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error });
  }

  await dbDisconnect();
});

export default handler;
