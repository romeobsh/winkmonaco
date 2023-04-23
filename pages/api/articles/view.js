import nextConnect from "next-connect";
import { dbConnect, dbDisconnect } from "../../../lib/dbConnect";
import Article from "../../../models/Article";

const handler = nextConnect();

handler.get(async (req, res) => {
  await dbConnect();

  try {
    const articles = await Article.find();
    res.status(200).json({ success: true, data: articles });
  } catch (error) {
    res.status(400).json({ success: false });
  }

  await dbDisconnect();
});

export default handler;
