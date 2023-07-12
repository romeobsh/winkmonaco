import { Box, Button, Fade, Slide, Typography } from "@mui/material";
import React, { useState } from "react";
import Translation from "../general/Translation";
import VolunteersContent from "./VolunteersContent";
import { Favorite } from "@mui/icons-material";
import VolunteersForm from "./VolunteersForm";

const VolunteersPage = ({ data, loading, language }) => {
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
      <Box sx={{ maxWidth: { xs: "600px", lg: "1000px" }, width: "100%", margin: "1.2rem auto", justifyContent: "center", textAlign: "center" }}>
        <Typography variant='h2' mb={4}>
          <Translation tKey='volunteers.title' lang={language} />
        </Typography>
        <Slide direction={"right"} in={seeContent} appear={false} unmountOnExit mountOnEnter timeout={600}>
          <Box>
            <VolunteersContent data={data} loading={loading} language={language} />
            <Button variant='contained' color='success' endIcon={<Favorite />} sx={{ marginTop: 4 }} onClick={handleClick}>
              <Translation tKey='volunteers.button' />
            </Button>
          </Box>
        </Slide>
        <Slide direction={"left"} in={seeForm} mountOnEnter unmountOnExit timeout={600}>
          <Box>
            <VolunteersForm data={data} loading={loading} language={language} onClick={handleClick} />
          </Box>
        </Slide>
      </Box>
    </Fade>
  );
};

export default React.memo(VolunteersPage);
