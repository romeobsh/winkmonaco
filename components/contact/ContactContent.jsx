import React from "react";
import Translation from "../general/Translation";
import { Paper, Typography } from "@mui/material";
import ContactCard from "./ContactCard";
import { renderTextWithLineBreaks } from "@/lib/renderTextWithLineBreaks";
import { translate } from "@/lib/translations/translate";

const ContactContent = ({ language }) => {
  return (
    <React.Fragment>
      <Typography variant='h2' mb={2} sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
        <Translation tKey='contact.title' lang={language} />
      </Typography>
      <Typography>{renderTextWithLineBreaks(translate({ tKey: "contact.text", lang: language }))}</Typography>
      <Paper sx={{ backgroundColor: "#fafafa", width: "fit-content", textAlign: "left", margin: "2rem auto", borderRadius: "1rem", padding: "1rem" }}>
        <ContactCard language={language} />
      </Paper>
      <Typography variant='h4' mb={2} sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
        <Translation tKey='contact.stopSubscription' lang={language} />
      </Typography>
      <Typography mb={2}>{renderTextWithLineBreaks(translate({ tKey: "contact.stopSubscriptionText", lang: language }))}</Typography>
    </React.Fragment>
  );
};

export default ContactContent;
