import { dbConnect } from "../../../lib/dbConnect";
import Subscription from "../../../schemas/Subscription";

export default async function handler(req, res) {
  const { subscriptionId } = req.query;

  if (req.method === "GET") {
    try {
      await dbConnect();

      // Find the subscription by its ID in the MongoDB collection
      const subscription = await Subscription.findById(subscriptionId);

      if (!subscription) {
        // Return a not found response if the subscription is not found
        return res.status(404).json({ message: "Subscription not found" });
      }

      // Return the subscription data as the response
      res.status(200).json({ subscription });
    } catch (error) {
      // Handle any errors that occurred during the database operation
      console.error("An error occurred:", error);
      res.status(500).json({ message: "Server Error" });
    }
  } else {
    // Handle other request methods if necessary
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
