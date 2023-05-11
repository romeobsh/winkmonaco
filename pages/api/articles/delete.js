import nextConnect from "next-connect";
import { dbConnect, dbDisconnect } from "../../../lib/dbConnect";
import Article from "../../../models/Article";

const handler = nextConnect();

handler.delete(async (req, res) => {
  await dbConnect();

  const { id } = req.query;

  try {
    await Article.findByIdAndRemove(id);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false });
  }

  await dbDisconnect();
});

export default handler;