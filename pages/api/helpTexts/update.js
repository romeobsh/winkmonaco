import nextConnect from "next-connect";
import { dbConnect, dbDisconnect } from "../../../lib/dbConnect";
import HelpContent from "../../../schemas/HelpContent";

const handler = nextConnect();

handler.put(async (req, res) => {
  await dbConnect();

  const { id, firstText, enFirstText, isActiveKit, kitContent, enKitContent, imageUrl, imageUrl2, imageUrl3, secondText, enSecondText, formText, enFormText } =
    req.body;

  try {
    const helpTexts = await HelpContent.findOneAndUpdate(
      id,
      { firstText, enFirstText, isActiveKit, kitContent, enKitContent, imageUrl, imageUrl2, imageUrl3, secondText, enSecondText, formText, enFormText },
      { upsert: true, new: true }
    );

    res.status(200).json({ success: true, data: helpTexts });
  } catch (error) {
    res.status(400).json({ success: false });
  }

  await dbDisconnect();
});

export default handler;
