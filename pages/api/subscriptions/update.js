import nextConnect from "next-connect";
import { dbConnect, dbDisconnect } from "../../../lib/dbConnect";
import Subscription from "../../../schemas/Subscription";

const handler = nextConnect();

handler.put(async (req, res) => {
  await dbConnect();

  const { id, fullName, email, telephone, iban, address, additional, zipCode, city, amount, status, comment, createdAt } = req.body;

  try {
    const subscription = await Subscription.findByIdAndUpdate(
      id,
      { fullName, email, telephone, iban, address, additional, zipCode, city, amount, status, comment, createdAt },
      { new: true }
    );

    res.status(200).json({ success: true, subscription: subscription });
  } catch (error) {
    res.status(400).json({ success: false });
  }

  await dbDisconnect();
});

export default handler;
