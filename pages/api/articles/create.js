import nextConnect from "next-connect";
import { dbConnect, dbDisconnect } from "../../../lib/dbConnect";
import Article from "../../../models/Article";

const handler = nextConnect();

handler.post(async (req, res) => {
  await dbConnect();

  const { title, content, imageUrl } = req.body;
  const article = new Article({ title, content, imageUrl });

  try {
    await article.save();
    res.status(201).json({ success: true, data: article });
  } catch (error) {
    res.status(400).json({ success: false });
  }

  await dbDisconnect();
});

export default handler;
