import { Base64 } from "js-base64";
import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  try {
    // Generate a unique orderId
    const orderId = uuidv4();
    let APIpassword;

    const apiUrl = `https://${process.env.PAYZEN_SERVER}/api-payment/V4/Charge/CreatePayment`;

    if (process.env.NODE_ENV === "development") {
      APIpassword = Base64.encode(process.env.PAYZEN_TESTPASSWORD);
    } else {
      APIpassword = Base64.encode(process.env.PAYZEN_PRODPASSWORD);
    }

    // Define your headers
    // Authorization = Basic + clé API encodée en base 64
    const headers = {
      Authorization: `Basic ${APIpassword}`,
      "Content-Type": "application/json",
    };

    // Retrieve additional parameters from query
    let { amount, email, address } = req.query;
    amount = amount * 100; // Convert to centimes

    // Define your request body with dynamic orderId and additional parameters
    const requestBody = JSON.stringify({
      amount: amount, // Default amount to 990 if not provided
      currency: "EUR",
      orderId: orderId, // Use the generated orderId
      customer: {
        email: email, // Default email if not provided
        billingDetails: {
          address: address,
        },
      },
    });

    // Make the API call using fetch
    const response = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: requestBody,
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
}
