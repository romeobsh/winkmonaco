import nextConnect from "next-connect";
import { dbConnect, dbDisconnect } from "../../../lib/dbConnect";
import Partner from "../../../models/Partner";

const handler = nextConnect();

handler.put(async (req, res) => {
  await dbConnect();

  const { id, name, logoUrl, websiteUrl } = req.body;

  try {
    const partner = await Partner.findByIdAndUpdate(id, { name, logoUrl, websiteUrl }, { new: true });

    res.status(200).json({ success: true, data: partner });
  } catch (error) {
    res.status(400).json({ success: false });
  }

  await dbDisconnect();
});

export default handler;
