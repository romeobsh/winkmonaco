import nextConnect from "next-connect";
import { dbConnect, dbDisconnect } from "../../../lib/dbConnect";
import Partner from "../../../models/Partner";

const handler = nextConnect();

handler.get(async (req, res) => {
  await dbConnect();

  try {
    const partners = await Partner.find();
    // Set cache control header to indicate caching strategy

    res.status(200).json({ success: true, data: partners });
  } catch (error) {
    res.status(400).json({ success: false });
  }

  await dbDisconnect();
});

export default handler;
