import nextConnect from "next-connect";
import { dbConnect, dbDisconnect } from "../../../lib/dbConnect";
import Product from "../../../schemas/Product";

const handler = nextConnect();

handler.put(async (req, res) => {
  await dbConnect();

  const { id, name, description, price, imageUrl } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(id, { name, description, price, imageUrl }, { new: true });

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false });
  }

  await dbDisconnect();
});

export default handler;
