import { Subscription } from "@/schemas/subscription";
import { dbConnect, dbDisconnect } from "../../../../lib/dbConnect";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { iban, amount } = req.body;

    await dbConnect();

    async function updateSubscriptionStatus(iban, amount) {
      try {
        // Find the subscription with the matching IBAN
        const subscription = await Subscription.findOne({ iban });

        if (!subscription) {
          return res.status(404).json({ message: "No subscription associated with this IBAN" });
        }

        // Update the subscription status and amountAsked based on the logic in the comments
        if (!amount) {
          // If no amount is sent, change the IBAN status to 'requestForCancellation' and set amountAsked value to 0
          subscription.status = "requestForCancellation";
          subscription.amountAsked = 0;
        } else if (["subscribed", "cancelled", "pending", "requestForCancellation", "newAmountAsked"].includes(subscription.status)) {
          // If status is 'subscribed' or 'cancelled' or 'pending' or 'newAmountAsked' and an amount is sent
          // Change status to 'newAmountAsked' and set amountAsked to the body's amount value
          subscription.status = "newAmountAsked";
          subscription.amountAsked = amount;
        }

        // Save the updated subscription to the database
        await subscription.save();
        await dbDisconnect();

        // Return the updated subscription
        return subscription;
      } catch (error) {
        await dbDisconnect();
        // Handle any errors that occur during the database update
        console.error("Error updating subscription:", error);
        throw error;
      }
    }

    try {
      // Assuming you have an async function to fetch subscription data from the database
      const updatedSubscription = await updateSubscriptionStatus(iban, amount);

      return res.status(200).json({ updatedSubscription });
    } catch (error) {
      console.error("Error updating subscription:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
