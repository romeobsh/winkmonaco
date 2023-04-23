// Temporary
let items = [];

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, description, price, imageUrl } = req.body;

    if (!name || !description || !price || !imageUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newItem = {
      name,
      description,
      price,
      imageUrl,
    };

    items.push(newItem);

    return res.status(201).json(newItem);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
