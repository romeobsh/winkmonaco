import { dbConnect } from "../../../lib/dbConnect";
import Donation from "../../../schemas/Donation";

export default async function handler(req, res) {
  const { donationId } = req.query;

  if (req.method === "GET") {
    try {
      await dbConnect();

      // Find the donation by its ID in the MongoDB collection
      const donation = await Donation.findById(donationId);

      if (!donation) {
        // Return a not found response if the donation is not found
        return res.status(404).json({ message: "Donation not found" });
      }

      // Return the donation data as the response
      res.status(200).json({ donation });
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
