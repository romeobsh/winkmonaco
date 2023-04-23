import dbConnect from "../../../lib/dbConnect";
import Item from "../../../models/Item";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { name, description, price, imageUrl } = req.body;

    if (!name || !description || !price || !imageUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newItem = new Item({
      name,
      description,
      price,
      imageUrl,
    });

    const savedItem = await newItem.save();

    return res.status(201).json(savedItem);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
