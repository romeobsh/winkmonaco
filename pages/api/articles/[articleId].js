import { dbConnect } from "../../../lib/dbConnect";
import Article from "../../../models/Article";

export default async function handler(req, res) {
  const { articleId } = req.query;

  if (req.method === "GET") {
    try {
      await dbConnect();

      // Find the article by its ID in the MongoDB collection
      const article = await Article.findById(articleId);

      if (!article) {
        // Return a not found response if the article is not found
        return res.status(404).json({ message: "Article not found" });
      }

      // Return the article data as the response
      res.status(200).json({ article });
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
