import { SubscriptionModel } from "@/schemas/subscriptionSchema";
import { dbConnect, dbDisconnect } from "../../../../lib/dbConnect";

export default async function handler(req, res) {
  const { iban } = req.query;

  if (req.method === "GET") {
    await dbConnect();

    async function getSubscriptionByIBAN(iban) {
      try {
        await dbConnect();

        // Find the subscription with the matching IBAN
        const subscription = await SubscriptionModel.findOne({ iban });
        await dbDisconnect();

        // Return the found subscription or null if not found
        return subscription || null;
      } catch (error) {
        await dbDisconnect();
        // Handle any errors that occur during the database query
        console.error("Error retrieving subscription:", error);
        throw error;
      }
    }

    try {
      // Assuming you have an async function to fetch subscription data from the database
      const subscription = await getSubscriptionByIBAN(iban);

      if (subscription) {
        return res.status(200).json({ subscription });
      } else {
        return res.status(200).json({ message: "No subscription associated with this IBAN" });
      }
    } catch (error) {
      console.error("Error fetching subscription:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
