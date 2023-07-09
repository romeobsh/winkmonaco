import React, { useContext } from "react";
import Image from "next/image";
import { Box, MenuItem, Select } from "@mui/material";
import { LanguageContext } from "@/contexts/LanguageContext";

const SelectLanguage = () => {
  const { language, changeLanguage } = useContext(LanguageContext);

  const handleChangeLanguage = (event) => {
    changeLanguage(event.target.value);
  };

  return (
    <Select
      size='small'
      variant='standard'
      disableUnderline
      color='primary'
      sx={{
        mr: 1,
        ".MuiOutlinedInput-notchedOutline": { border: 0 },
        ".MuiSvgIcon-root ": {
          fill: "#60C7FA !important",
        },
      }}
      onChange={handleChangeLanguage}
      value={language}
      displayEmpty
      renderValue={(value) => {
        return (
          <Box sx={{ display: "flex", gap: 1 }}>
            {language === "fr" ? (
              <Image src={"/images/france.png"} width={30} height={30} alt='drapeau français' style={{ padding: "3px 0 0 5px" }} />
            ) : (
              <Image src={"/images/united-kingdom.png"} width={30} height={30} alt='drapeau uk' style={{ padding: "3px 0 0 5px" }} />
            )}
          </Box>
        );
      }}>
      {" "}
      <MenuItem value={"fr"}>Français</MenuItem>
      <MenuItem value={"en"}>English</MenuItem>
    </Select>
  );
};

export default SelectLanguage;
