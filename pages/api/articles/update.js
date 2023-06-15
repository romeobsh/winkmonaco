import nextConnect from "next-connect";
import { dbConnect, dbDisconnect } from "../../../lib/dbConnect";
import Article from "../../../models/Article";

const handler = nextConnect();

handler.put(async (req, res) => {
  await dbConnect();

  const { id, title, content, imageUrl, priority } = req.body;

  try {
    const article = await Article.findByIdAndUpdate(id, { title, content, imageUrl, priority }, { new: true });

    res.status(200).json({ success: true, data: article });
  } catch (error) {
    res.status(400).json({ success: false });
  }

  await dbDisconnect();
});

export default handler;
