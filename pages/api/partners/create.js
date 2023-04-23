import nextConnect from "next-connect";
import { dbConnect, dbDisconnect } from "../../../lib/dbConnect";
import Partner from "../../../models/Partner";

const handler = nextConnect();

handler.post(async (req, res) => {
  await dbConnect();

  const { name, logoUrl, websiteUrl } = req.body;
  const partner = new Partner({ name, logoUrl, websiteUrl });

  try {
    await partner.save();
    res.status(201).json({ success: true, data: partner });
  } catch (error) {
    res.status(400).json({ success: false });
  }

  await dbDisconnect();
});

export default handler;
