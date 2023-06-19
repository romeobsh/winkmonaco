import { dbConnect } from "../../../lib/dbConnect";
import Volunteer from "../../../models/Volunteer";

export default async function handler(req, res) {
  const { volunteerId } = req.query;

  if (req.method === "GET") {
    try {
      await dbConnect();

      // Find the volunteer by its ID in the MongoDB collection
      const volunteer = await Volunteer.findById(volunteerId);

      if (!volunteer) {
        // Return a not found response if the volunteer is not found
        return res.status(404).json({ message: "Volunteer not found" });
      }

      // Return the volunteer data as the response
      res.status(200).json({ volunteer });
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
