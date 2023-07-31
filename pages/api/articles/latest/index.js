import { dbConnect, dbDisconnect } from "@/lib/dbConnect";
import { Article } from "@/schemas/article";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Connect to the database
  await dbConnect();

  try {
    // Query the database to retrieve the two articles based on priority and date criteria
    const articles = await Article.find({})
      .sort({ priority: -1, date: -1 }) // Sorting by priority (true first) and then by date (descendant)
      .limit(2); // Limit the results to two articles

    res.status(200).json({ success: true, data: articles });
  } catch (error) {
    res.status(500).json({ error: "Error fetching articles" });
  } finally {
    // Disconnect from the database after the API response is sent
    await dbDisconnect();
  }
}
