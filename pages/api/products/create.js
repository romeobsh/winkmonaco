import nextConnect from "next-connect";
import { dbConnect, dbDisconnect } from "../../../lib/dbConnect";
import Product from "../../../models/Product";

const handler = nextConnect();

handler.post(async (req, res) => {
  await dbConnect();

  const { name, description, price, imageUrl } = req.body;
  const product = new Product({ name, description, price, imageUrl });

  try {
    await product.save();
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false });
  }

  await dbDisconnect();
});

export default handler;
