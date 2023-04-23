import { FintectureClient } from "@fintecture/fintecture-sdk";

const fintecture = new FintectureClient({
  app_id: process.env.FINTECTURE_APP_ID,
  app_secret: process.env.FINTECTURE_APP_SECRET,
  // Set the appropriate API environment: 'sandbox' or 'production'
  env: "sandbox",
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { returnUrl } = req.body;

    try {
      const redirectUrl = await fintecture.getAuthorizeUrl(returnUrl);
      return res.status(200).json({ redirectUrl });
    } catch (error) {
      console.error("Error processing payment: ", error);
      return res.status(400).json({ error: error.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
