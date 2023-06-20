import nextConnect from "next-connect";
import { dbConnect, dbDisconnect } from "../../../../lib/dbConnect";
import PaymentInfo from "../../../../models/PaymentInfo";

const handler = nextConnect();

handler.put(async (req, res) => {
  await dbConnect();

  const { id, ownerName, iban, bic, recipient, address } = req.body;

  try {
    const paymentInfo = await PaymentInfo.findOneAndUpdate(id, { ownerName, iban, bic, recipient, address }, { upsert: true, new: true });

    res.status(200).json({ success: true, data: paymentInfo });
  } catch (error) {
    res.status(400).json({ success: false });
  }

  await dbDisconnect();
});

export default handler;
