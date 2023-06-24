import nextConnect from "next-connect";
import { dbConnect, dbDisconnect } from "../dbConnect";

export function generateElementApiHandler(schema) {
  const handler = nextConnect();

  handler.get(async (req, res) => {
    await dbConnect();

    const { id } = req.query;

    try {
      const element = await schema.findById(id);
      if (!element) {
        console.log(req.query);
        res.status(404).json({ success: false, error: "Element not found!" });
      } else {
        res.status(200).json({ success: true, data: element });
      }
    } catch (error) {
      res.status(400).json({ success: false });
    }

    await dbDisconnect();
  });

  handler.put(async (req, res) => {
    await dbConnect();

    const { id } = req.query;

    try {
      const element = await schema.findByIdAndUpdate(id, req.body, { new: true });
      if (!element) {
        res.status(404).json({ success: false, error: "Element not found" });
      } else {
        res.status(200).json({ success: true, data: element });
      }
    } catch (error) {
      res.status(400).json({ success: false });
    }

    await dbDisconnect();
  });

  handler.delete(async (req, res) => {
    await dbConnect();

    const { id } = req.query;

    try {
      const element = await schema.findByIdAndRemove(id);
      if (!element) {
        res.status(404).json({ success: false, error: "Element not found" });
      } else {
        res.status(204).json();
      }
    } catch (error) {
      res.status(400).json({ success: false });
    }

    await dbDisconnect();
  });

  return handler;
}
