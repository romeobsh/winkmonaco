import { transporter } from '@/lib/mailer';
import { HmacSHA256 } from 'crypto-js';
import Hex from 'crypto-js/enc-hex';

export default async function handler(req, res) {
  try {
    const answer = req.body.paymentData.clientAnswer;
    const hash = req.body.paymentData.hash;

    const answerHash = Hex.stringify(
      HmacSHA256(
        JSON.stringify(answer),
        process.env.NODE_ENV === 'development' ? process.env.PAYZEN_HMAC : process.env.PAYZEN_PRODHMAC
      )
    );

    if (hash === answerHash) {
      const { subject, emailContent } =
        req.body.language === 'fr'
          ? getFrenchEmailContent()
          : req.body.language === 'it'
          ? getItalienEmailContent()
          : getEnglishEmailContent();

      const mailOptions = {
        from: {
          name: 'Wink Monaco',
          address: 'noreply.winkmonaco@gmail.com',
        },
        to: req.body.email,
        subject: subject,
        html: emailContent,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Email sending error:', error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      res.status(200).json({ message: 'Valid payment' });
    } else res.status(500).json({ message: 'Payment hash mismatch' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Payment hash mismatch' });
  }
}

// Define French email subject and content
function getFrenchEmailContent() {
  return {
    subject: 'Merci pour votre générosité envers Wink Monaco',
    emailContent: `
      <p>Cher donateur,</p><br />
      <p>Je tiens à vous exprimer ma sincère gratitude au nom de toute l’équipe de WINK MONACO pour votre généreux don que nous avons reçu.</p>
      <p>Votre soutien est primordial pour notre cause et nous sommes touchés par votre générosité.</p>
      <p>Vos contributions nous donnent les moyens pour réaliser nos missions, de prévention, de formations, afin de préserver la vue et l’audition du plus grand nombre, ainsi que de proposer des placements dans les entreprises des personnes malvoyantes.</p>
      <br /><p>Pour vous informer sur nos projets ou participer, vous pouvez nous contacter par mail à l'adresse : winkmonaco@gmail.com</p>
      <p>Une fois encore merci pour votre soutien,</p><br />
      <p>Avec toute notre gratitude,</p>
      <p>Corinne Rodier</p>
      <p>Présidente</p>
      <p>WINK MONACO</p>
    `,
  };
}

// Define English email subject and content
function getEnglishEmailContent() {
  return {
    subject: 'Thank you for your generosity to Wink Monaco',
    emailContent: `
      <p>Dear donor,</p><br />
      <p>I want to express my sincere gratitude on behalf of the entire team at WINK MONACO for your generous donation that we have received.</p>
      <p>Your support is essential to our cause, and we are touched by your generosity.</p>
      <p>Your contributions enable us to carry out our missions, including prevention, education, and supporting the vision and hearing of a larger audience, as well as providing job placements for visually impaired individuals.</p>
      <br /><p>If you would like to learn more about our projects or participate, you can contact us via email at: winkmonaco@gmail.com</p>
      <p>Once again, thank you for your support,</p><br />
      <p>With all our gratitude,</p>
      <p>Corinne Rodier</p>
      <p>President</p>
      <p>WINK MONACO</p>
    `,
  };
}

// Define Italian email subject and content
function getItalienEmailContent() {
  return {
    subject: 'Grazie per la vostra generosità verso Wink Monaco',
    emailContent: `
      <p>Cari donatori,</p><br />
      <p>Desidero esprimervi la mia sincera gratitudine a nome di tutto il team di WINK MONACO per la vostra generosa donazione che abbiamo ricevuto.</p>
      <p>Il vostro sostegno è fondamentale per la nostra causa e siamo toccati dalla vostra generosità.</p>
      <p>Le vostre contribuzioni ci consentono di portare avanti le nostre missioni di prevenzione e formazione, al fine di preservare la vista e l'udito della maggior parte delle persone, nonché di offrire opportunità di lavoro nelle aziende per le persone ipovedenti.</p>
      <br /><p>Per informazioni sui nostri progetti o per partecipare, potete contattarci via email all'indirizzo: winkmonaco@gmail.com</p>
      <p>Ancora una volta, grazie per il vostro sostegno,</p><br />
      <p>Con tutta la nostra gratitudine,</p>
      <p>Corinne Rodier</p>
      <p>Presidente</p>
      <p>WINK MONACO</p>
    `,
  };
}
