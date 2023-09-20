import { LanguageContext } from "@/contexts/LanguageContext";
import { renderTextWithLineBreaks } from "@/lib/renderTextWithLineBreaks";
import { translate } from "@/lib/translations/translate";
import { Box, Button, Fade, Paper, Slide, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import ContactCard from "../contact/ContactCard";
import { CalendarMonth, LooksOne } from "@mui/icons-material";
import RecurringForm from "./RecurringForm";
import OneTimeForm from "./OneTimeForm";

const Donate = ({ paymentInfos }) => {
  const [currentPage, setCurrentPage] = useState("main");
  const { language } = useContext(LanguageContext);

  const handleClick = (page) => {
    if ("scrollBehavior" in document.documentElement.style) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Fallback for browsers that don't support smooth scrolling
      window.scrollTo(0, 0);
    }
    setCurrentPage(null);
    setTimeout(() => {
      setCurrentPage(page);
    }, 600);
  };

  return (
    <React.Fragment>
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
        <Fade in={true} timeout={1000}>
          <Box>
            <Slide direction={"right"} in={currentPage === "main"} appear={false} unmountOnExit mountOnEnter timeout={600}>
              <Box>
                <Typography sx={{ maxWidth: "850px", margin: "auto auto 1.5rem" }}>
                  {renderTextWithLineBreaks(translate({ tKey: "donate.mainText", lang: language }))}
                </Typography>
                <Typography variant='h6' mb={2}>
                  {translate({ tKey: "donate.iMakeA", lang: language })}
                </Typography>
                <Box sx={{ display: "flex", gap: { xs: "1rem", md: " 3rem" }, width: "fit-content", margin: "auto" }}>
                  <Button
                    onClick={() => handleClick("monthly")}
                    sx={{ borderRadius: "1rem", display: "flex", flexDirection: "column", width: "7.5rem", height: "7.5rem" }}
                    variant='contained'
                    color='secondary'>
                    <Typography color='white' mb={0.6} sx={{ fontWeight: 600 }}>
                      {translate({ tKey: "donate.recurring", lang: language })}
                    </Typography>
                    <CalendarMonth fontSize='large' />
                  </Button>
                  <Button
                    onClick={() => handleClick("oneTime")}
                    sx={{ borderRadius: "1rem", display: "flex", flexDirection: "column", width: "7.5rem", height: "7.5rem" }}
                    variant='contained'
                    color='secondary'>
                    <Typography color='white' mb={0.6} sx={{ fontWeight: 600 }}>
                      {translate({ tKey: "donate.oneTime", lang: language })}
                    </Typography>
                    <LooksOne fontSize='large' />
                  </Button>
                </Box>
              </Box>
            </Slide>
            <Slide direction={"left"} in={currentPage === "monthly"} mountOnEnter unmountOnExit timeout={600}>
              <Box>
                <RecurringForm language={language} handleClick={handleClick} />
              </Box>
            </Slide>
            <Slide direction={"left"} in={currentPage === "oneTime"} mountOnEnter unmountOnExit timeout={600}>
              <Box>
                <OneTimeForm language={language} handleClick={handleClick} paymentInfos={paymentInfos} />
              </Box>
            </Slide>
          </Box>
        </Fade>
        <Typography variant='h4' mt={4} mb={2} sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
          {translate({ tKey: "donate.help", lang: language })}
        </Typography>
        <Typography> {translate({ tKey: "donate.donationService", lang: language })}</Typography>
        <Paper sx={{ backgroundColor: "#fafafa", width: "fit-content", textAlign: "left", margin: "2rem auto", borderRadius: "1rem", padding: "1rem" }}>
          <ContactCard language={language} />
        </Paper>
      </Box>
    </React.Fragment>
  );
};

export default Donate;
