import { LanguageContext } from "@/contexts/LanguageContext";
import React, { useContext, useEffect, useState } from "react";
import ContactCard from "./ContactCard";
import { fetchData } from "@/lib/handlers/fetchData";
import { Box, Paper, Typography } from "@mui/material";
import { renderTextWithLineBreaks } from "@/lib/renderTextWithLineBreaks";
import { translate } from "@/lib/translations/translate";
import Translation from "../general/Translation";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    fetchData("contacts", setIsLoading, setData, "singleDocument");
  }, []);

  return (
    <Box sx={{ maxWidth: { xs: "600px", md: "1000px" }, width: "100%", margin: "1.2rem auto", justifyContent: "center", textAlign: "center" }}>
      <Typography variant='h2' mb={2} sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
        <Translation tKey='contact.title' lang={language} />
      </Typography>
      <Typography>{renderTextWithLineBreaks(translate({ tKey: "contact.text", lang: language }))}</Typography>
      <Paper sx={{ backgroundColor: "#fafafa", width: "fit-content", textAlign: "left", margin: "2rem auto", borderRadius: "1rem", padding: "1rem" }}>
        <ContactCard english={language === "en"} loading={isLoading} data={data} />
      </Paper>
    </Box>
  );
};

export default Contact;
