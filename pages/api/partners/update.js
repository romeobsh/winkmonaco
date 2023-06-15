import nextConnect from "next-connect";
import { dbConnect, dbDisconnect } from "../../../lib/dbConnect";
import Partner from "../../../models/Partner";

const handler = nextConnect();

handler.put(async (req, res) => {
  await dbConnect();

  const { id, firstText, enFirstText, imageUrl, secondText, enSecondText } = req.body;

  try {
    const partner = await Partner.findOneAndUpdate(id, { firstText, enFirstText, imageUrl, secondText, enSecondText }, { upsert: true, new: true });

    res.status(200).json({ success: true, data: partner });
  } catch (error) {
    res.status(400).json({ success: false });
  }

  await dbDisconnect();
});

export default handler;
