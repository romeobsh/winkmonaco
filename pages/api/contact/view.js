import nextConnect from "next-connect";
import { dbConnect, dbDisconnect } from "../../../lib/dbConnect";
import Contact from "../../../models/Contact";

const handler = nextConnect();

handler.get(async (req, res) => {
  await dbConnect();

  try {
    const contact = await Contact.find();

    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    res.status(400).json({ success: false });
  }

  await dbDisconnect();
});

export default handler;
