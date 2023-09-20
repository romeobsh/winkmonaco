import { LanguageContext } from "@/contexts/LanguageContext";
import React, { useContext, useState } from "react";
import { Box, Button, Fade, Slide } from "@mui/material";
import Translation from "../general/Translation";
import ContactContent from "./ContactContent";
import { Block } from "@mui/icons-material";
import ContactForm from "./ContactForm";

const Contact = () => {
  const { language } = useContext(LanguageContext);

  const [seeContent, setSeeContent] = useState(true);
  const [seeForm, setSeeForm] = useState(false);

  const handleClick = () => {
    document.body.scrollTo({ top: 0, behavior: "smooth" });
    seeContent ? setSeeContent(false) : setSeeForm(false);
    setTimeout(() => {
      seeForm ? setSeeContent(true) : setSeeForm(true);
    }, 600);
  };

  return (
    <Fade in={true} timeout={1000}>
      <Box sx={{ maxWidth: { xs: "600px", md: "1000px" }, width: "100%", margin: "1.2rem auto", justifyContent: "center", textAlign: "center" }}>
        <Slide direction={"right"} in={seeContent} appear={false} unmountOnExit mountOnEnter timeout={600}>
          <Box>
            <ContactContent language={language} />
            <Button variant='contained' color='error' endIcon={<Block />} sx={{ marginTop: 1, marginBottom: 4 }} onClick={handleClick}>
              <Translation tKey='contact.button' lang={language} />
            </Button>
          </Box>
        </Slide>
        <Slide direction={"left"} in={seeForm} mountOnEnter unmountOnExit timeout={600}>
          <Box>
            <ContactForm language={language} onClick={handleClick} />
          </Box>
        </Slide>
      </Box>
    </Fade>
  );
};

export default Contact;
