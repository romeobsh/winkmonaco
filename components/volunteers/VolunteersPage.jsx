import { Box, Button, Slide, Typography } from "@mui/material";
import React, { useState } from "react";
import Translation from "../general/Translation";
import VolunteersContent from "./VolunteersContent";
import { Favorite } from "@mui/icons-material";
import VolunteersForm from "./VolunteersForm";

export const VolunteersPage = ({ data, loading, language }) => {
  const [clicked, setClicked] = useState(false);

  return (
    <React.Fragment>
      <Box
        sx={{
          position: "relative",
          maxWidth: { xs: "600px", lg: "1000px" },
          width: "100%",
          margin: "1.2rem auto",
          justifyContent: "center",
          textAlign: "center",
        }}>
        <Typography variant='h2' mb={4}>
          <Translation tKey='volunteers.title' lang={language} />
        </Typography>
        <Slide direction='right' in={!clicked} appear={false}>
          <Box>
            {!clicked && (
              <React.Fragment>
                <VolunteersContent data={data} loading={loading} language={language} />
                <Button variant='contained' color='success' endIcon={<Favorite />} sx={{ marginTop: 4 }} onClick={() => setClicked(true)}>
                  {" "}
                  <Translation tKey='volunteers.button' />
                </Button>
              </React.Fragment>
            )}
          </Box>
        </Slide>
        <Slide direction='left' in={clicked}>
          <Box>
            {clicked && (
              <React.Fragment>
                <VolunteersForm data={data} loading={loading} language={language} setClicked={setClicked} />
              </React.Fragment>
            )}
          </Box>
        </Slide>
      </Box>
    </React.Fragment>
  );
};
