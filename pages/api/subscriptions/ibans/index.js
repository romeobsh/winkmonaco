import { SubscriptionModel } from '@/schemas/subscriptionSchema';
import { dbConnect, dbDisconnect } from '../../../../lib/dbConnect';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      title,
      firstName,
      lastName,
      address,
      addressDetails,
      zipCode,
      city,
      country,
      tel,
      email,
      amountAsked,
      createdAt,
      iban,
      status,
    } = req.body;

    await dbConnect();

    try {
      // Check if there is an existing subscription with the provided IBAN
      const existingSubscription = await SubscriptionModel.findOne({ iban });

      if (existingSubscription) {
        // If an existing subscription is found, return an error message
        await dbDisconnect();
        return res.status(409).json({ message: 'alreadyExist' });
      }

      // If no existing subscription is found, create a new subscription
      const newSubscription = new SubscriptionModel({
        title,
        firstName,
        lastName,
        address,
        addressDetails,
        zipCode,
        city,
        country,
        tel,
        email,
        amountAsked,
        createdAt,
        iban,
        status,
      });

      // Save the new subscription in the database
      await newSubscription.save();
      await dbDisconnect();

      return res.status(201).json({ message: 'success', subscription: newSubscription });
    } catch (error) {
      await dbDisconnect();
      console.error('Error creating subscription:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'PATCH') {
    const { iban, amount } = req.body;

    await dbConnect();

    async function updateSubscriptionStatus(iban, amount) {
      try {
        // Find the subscription with the matching IBAN
        const subscription = await SubscriptionModel.findOne({ iban });

        if (!subscription) {
          return res.status(404).json({ message: 'No subscription associated with this IBAN' });
        }

        // Update the subscription status and amountAsked based on the logic in the comments
        if (!amount) {
          // If no amount is sent, change the IBAN status to 'requestForCancellation' and set amountAsked value to 0
          subscription.status = 'requestForCancellation';
          subscription.amountAsked = 0;
        } else if (
          ['subscribed', 'cancelled', 'pending', 'requestForCancellation', 'newAmountAsked'].includes(
            subscription.status
          )
        ) {
          // If status is 'subscribed' or 'cancelled' or 'pending' or 'newAmountAsked' and an amount is sent
          // Change status to 'newAmountAsked' and set amountAsked to the body's amount value
          subscription.status = 'newAmountAsked';
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
        console.error('Error updating subscription:', error);
        throw error;
      }
    }

    try {
      const updatedSubscription = await updateSubscriptionStatus(iban, amount);

      return res.status(200).json({ updatedSubscription });
    } catch (error) {
      console.error('Error updating subscription:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
