import nextConnect from "next-connect";
import { dbConnect, dbDisconnect } from "../../../lib/dbConnect";
import HelpContent from "../../../schemas/HelpContent";

const handler = nextConnect();

handler.get(async (req, res) => {
  await dbConnect();

  try {
    const helpContent = await HelpContent.find();

    res.status(200).json({ success: true, helpContent: helpContent });
  } catch (error) {
    res.status(400).json({ success: false });
  }

  await dbDisconnect();
});

export default handler;
