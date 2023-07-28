import { translate } from "@/lib/translations/translate";
import { ArrowBack, AttachEmail, CalendarMonth, CreditCard, Edit, Euro, LooksOne } from "@mui/icons-material";
import { Box, Button, Checkbox, Collapse, FormControl, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import TransferOrCheque from "./TransferOrCheque";
import { renderTextWithLineBreaks } from "@/lib/renderTextWithLineBreaks";

export default function OneTimeForm({ language, handleClick, paymentInfos }) {
  const [isSending, setIsSending] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [customAmount, setCustomAmount] = useState(0);

  const [method, setMethod] = useState("");
  const [selectedOption, setSelectedOption] = useState("50");

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Box>
      <Box sx={{ marginTop: "-1rem", textAlign: "left" }}>
        <Button startIcon={<ArrowBack />} onClick={() => handleClick("main")}>
          {translate({ tKey: "general.back", lang: language })}
        </Button>
      </Box>
      <Box mb={3}>
        <Typography mb={3}>{translate({ tKey: "donate.choseType", lang: language })}</Typography>
        <Box sx={{ display: "flex", gap: { xs: "1rem", md: " 3rem" }, width: "fit-content", margin: "auto" }}>
          <Button
            onClick={() => setMethod("card")}
            disabled={method === "card"}
            sx={{ borderRadius: "1rem", display: "flex", flexDirection: "column", width: "7.5rem", height: "7.5rem" }}
            variant='contained'
            color='secondary'>
            <Typography variant='body2' color='white' mb={0.6} sx={{ fontWeight: 600 }}>
              {translate({ tKey: "donate.card", lang: language })}
            </Typography>
            <CreditCard fontSize='large' />
          </Button>
          <Button
            onClick={() => setMethod("transferOrCheque")}
            disabled={method === "transferOrCheque"}
            sx={{ borderRadius: "1rem", display: "flex", flexDirection: "column", width: "7.5rem", height: "7.5rem" }}
            variant='contained'
            color='secondary'>
            <Typography color='white' variant='body2' mb={0.6} sx={{ fontWeight: 600 }}>
              {translate({ tKey: "donate.transferOrCheque", lang: language })}
            </Typography>
            <AttachEmail fontSize='large' />
          </Button>
        </Box>
      </Box>
      <Collapse in={method === "card"}>
        <Box>
          <Typography> {translate({ tKey: "donate.amountOfDonation", lang: language })}</Typography>
          <FormControl>
            <Grid container mb={2}>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  disabled={isSending}
                  control={<Checkbox checked={selectedOption === "20"} onChange={handleRadioChange} value={"20"} />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", textAlign: "right" }}>
                      <Typography variant='h6' sx={{ width: "60px", paddingRight: "0.5rem" }}>
                        20
                      </Typography>
                      <Euro fontSize='small' />
                    </Box>
                  }
                  value={20}
                  sx={{
                    backgroundColor: "#f0f0f0",
                    borderRadius: "1rem",
                    padding: "0.4rem 2rem 0.4rem 1.4rem",
                    width: "fit-content",
                    margin: "1rem",
                  }}
                />
                <FormControlLabel
                  disabled={isSending}
                  control={<Checkbox checked={selectedOption === "50"} onChange={handleRadioChange} value={"50"} />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", textAlign: "right" }}>
                      <Typography variant='h6' sx={{ width: "60px", paddingRight: "0.5rem" }}>
                        50
                      </Typography>
                      <Euro fontSize='small' />
                    </Box>
                  }
                  value={50}
                  sx={{
                    backgroundColor: "#f0f0f0",
                    borderRadius: "1rem",
                    padding: "0.4rem 2rem 0.4rem 1.4rem",
                    width: "fit-content",
                    margin: "1rem",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  disabled={isSending}
                  control={<Checkbox checked={selectedOption === "100"} onChange={handleRadioChange} value={"100"} />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", textAlign: "right" }}>
                      <Typography variant='h6' sx={{ width: "60px", paddingRight: "0.5rem" }}>
                        100
                      </Typography>
                      <Euro fontSize='small' />
                    </Box>
                  }
                  value={100}
                  sx={{
                    backgroundColor: "#f0f0f0",
                    borderRadius: "1rem",
                    padding: "0.4rem 2rem 0.4rem 1.4rem",
                    width: "fit-content",
                    margin: "1rem",
                  }}
                />
                <FormControlLabel
                  disabled={isSending}
                  sx={{
                    backgroundColor: "#f0f0f0",
                    borderRadius: "1rem",
                    padding: "0.4rem 2rem 0.4rem 1.4rem",
                    width: "fit-content",
                    margin: 0,
                    margin: "1rem",
                  }}
                  control={<Checkbox checked={selectedOption === "custom"} onChange={handleRadioChange} value='custom' />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <TextField
                        type='number'
                        variant='standard'
                        sx={{ width: "60px" }}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        inputProps={{ min: 0 }}
                        InputProps={{
                          sx: {
                            fontSize: "1.2rem",
                            fontWeight: 600,
                            "&.MuiInputBase-root": {
                              backgroundColor: "#f0f0f0",
                            },
                            "& input[type=number]": {
                              MozAppearance: "textfield",
                            },
                            "& input[type=number]::-webkit-outer-spin-button": {
                              WebkitAppearance: "none",
                              margin: 0,
                            },
                            "& input[type=number]::-webkit-inner-spin-button": {
                              WebkitAppearance: "none",
                              margin: 0,
                            },
                          },
                        }}
                      />
                      {customAmount === 0 || customAmount === "" ? <Edit fontSize='small' /> : <Euro fontSize='small' />}
                    </Box>
                  }
                  value={customAmount}
                />
              </Grid>
            </Grid>
          </FormControl>
        </Box>
      </Collapse>
      <Collapse in={method === "transferOrCheque"}>
        <Box>
          <Typography mt={2} mb={2}>
            {renderTextWithLineBreaks(translate({ tKey: "donate.infoTransferOrCheque", lang: language }))}
          </Typography>
          <TransferOrCheque data={paymentInfos} english={language === "en"} />
        </Box>
      </Collapse>
    </Box>
  );
}
