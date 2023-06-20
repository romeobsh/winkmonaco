import nextConnect from "next-connect";
import { dbConnect, dbDisconnect } from "../../../lib/dbConnect";
import Contact from "../../../models/Contact";

const handler = nextConnect();

handler.put(async (req, res) => {
  await dbConnect();

  const { id, fullName, frTel, internationalTel, email, profilePic } = req.body;

  try {
    const contact = await Contact.findOneAndUpdate(id, { fullName, frTel, internationalTel, email, profilePic }, { upsert: true, new: true });

    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    res.status(400).json({ success: false });
  }

  await dbDisconnect();
});

export default handler;
