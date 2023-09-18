import PaymentLoading from "@/components/loading/PaymentLoading";
import SuccessModal from "@/components/ui/SuccessModal";
import { LanguageContext } from "@/contexts/LanguageContext";
import { translate } from "@/lib/translations/translate";
import KRGlue from "@lyracom/embedded-form-glue";
import { Box, Card, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";

const Payment = () => {
  const [status, setStatus] = useState("");
  const [isOpened, setIsOpened] = useState(false);
  const [loading, setLoading] = useState(true);

  const { language } = useContext(LanguageContext);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const [values, setValues] = useState({
    fullName: router.query.fullName,
    amount: router.query.amount,
    email: router.query.email,
    address: router.query.address,
    type: "cb",
    createdAt: new Date(),
  });

  useEffect(() => {
    const setupPaymentForm = async () => {
      try {
        const res = await fetch(`/api/payments/createPayment?address=${values.address}&amount=${values.amount}&email=${values.email}`);

        if (!res.ok) {
          throw new Error(`API request failed with status ${res.status}`);
        }
        const data = await res.json();
        const formToken = data.answer.formToken;

        let publicKey;

        if (process.env.NODE_ENV === "development") {
          publicKey = "28487566:testpublickey_lzWHlBVHry7z37yufxTWJFCclTrLJhOrCCtPNsn9pYcH6";
        } else {
          publicKey = "28487566:publickey_k3tBxd0O7BN6XfBoouK6YzX8jl5CopxNQJqt2l1NtcJsg";
        }

        const { KR } = await KRGlue.loadLibrary("https://static.payzen.eu", publicKey); /* Load the remote library */

        await KR.setFormConfig({
          /* set the minimal configuration */
          formToken: formToken,
          "kr-language": language === "fr" ? "fr-FR" : "en-EN" /* to update initialization parameter */,
        });

        await KR.onSubmit(async (paymentData) => {
          const response = await fetch(`/api/payments/validatePayment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(paymentData),
          });
          if (response.status === 200) {
            try {
              const res = await fetch("/api/donations", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              });
              if (res.ok) {
                setStatus("success");
                setIsOpened(true);
                setTimeout(() => {
                  router.push("/");
                }, 5000);
              } else {
                enqueueSnackbar(translate({ tKey: "general.errorOccurred", lang: language }), { variant: "error" });
                setIsSending(false);
              }
            } catch (err) {
              enqueueSnackbar(translate({ tKey: "general.errorOccurred", lang: language }), { variant: "error" });
              setIsSending(false);
              console.error(err);
            }
          } else {
            setStatus("error");
            console.log(response);
          }
        });

        setLoading(false);

        const { result } = await KR.attachForm("#myPaymentForm"); /* Attach a payment form  to myPaymentForm div*/

        await KR.showForm(result.formId); /* show the payment form */
      } catch (err) {
        setStatus("error");
        console.log(err);
      }
    };

    setupPaymentForm();
  }, []);

  return (
    <React.Fragment>
      <SuccessModal
        opened={isOpened}
        title={translate({ lang: language, tKey: "donate.thankYou" }) + "!"}
        text={translate({ lang: language, tKey: "donate.modalText" }) + "!"}
      />
      <Box
        sx={{
          maxWidth: { xs: "600px", md: "1050px" },
          width: "100%",
          margin: "1.2rem auto",
          justifyContent: "center",
          textAlign: "center",
        }}>
        <Typography variant='h2' mb={2} sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
          {translate({ tKey: "donate.title", lang: language })}
        </Typography>
        <Card sx={{ maxWidth: "600px", margin: "auto", justifyContent: "center", textAlign: "center", backgroundColor: "#fafafa", padding: "1rem 0 0.5rem" }}>
          {loading && <PaymentLoading />}
          <div id='myPaymentForm' style={{ margin: "auto", justifyContent: "center", textAlign: "center" }}>
            <div className='kr-smart-form' style={{ margin: "auto" }}></div>
          </div>
        </Card>
      </Box>
    </React.Fragment>
  );
};

export default Payment;

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}