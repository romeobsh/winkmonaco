import nextConnect from "next-connect";
import { dbConnect, dbDisconnect } from "../dbConnect";

export const generateCollectionApiHandler = (Model) => {
  const handler = nextConnect();

  handler.post(async (req, res) => {
    await dbConnect();

    const model = new Model(req.body);

    try {
      await model.save();
      res.status(201).json({ success: true, data: model });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false, error });
    }

    await dbDisconnect();
  });

  handler.get(async (req, res) => {
    await dbConnect();

    try {
      const models = await Model.find();
      res.status(200).json({ success: true, data: models });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
    }

    await dbDisconnect();
  });

  return handler;
};
