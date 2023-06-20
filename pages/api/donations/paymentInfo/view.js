import nextConnect from "next-connect";
import { dbConnect, dbDisconnect } from "../../../../lib/dbConnect";
import PaymentInfo from "../../../../models/PaymentInfo";

const handler = nextConnect();

handler.get(async (req, res) => {
  await dbConnect();

  try {
    const paymentInfo = await PaymentInfo.find();

    res.status(200).json({ success: true, paymentInfo: paymentInfo });
  } catch (error) {
    res.status(400).json({ success: false });
  }

  await dbDisconnect();
});

export default handler;
