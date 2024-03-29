import { Box, Grid, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { translate } from "@/lib/translations/translate";

export const DateFilter = ({ selectedStartDate, selectedEndDate, handleStartDateChange, handleEndDateChange, language }) => {
  // Min and Max Date Configurations
  const today = new Date();
  const minDate = new Date(2022, 0); // January 2022
  const maxDate = new Date(today.getFullYear(), today.getMonth()); // Current month

  return (
    <Grid item xs={12} sx={{ minWidth: "550px", maxWidth: "400px" }}>
      {/* Date Range Filter */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
          <Box sx={{ display: "flex" }}>
            <Typography m={1} ml={2} mb={3} sx={{ textAlign: "left" }}>
              Publication:
            </Typography>
            <DatePicker
              disableFuture
              minDate={dayjs(minDate)}
              maxDate={dayjs(maxDate)}
              label={translate({ tKey: "general.startYear", lang: language })}
              views={["year"]}
              value={selectedStartDate}
              onChange={handleStartDateChange}
              slotProps={{ textField: { size: "small", sx: { width: "150px" } } }}
            />
          </Box>
          {/* <Box sx={{ display: "flex" }}>
            <Typography m={1} ml={{ xs: 0, md: 1 }} mb={3} sx={{ width: { xs: "50px", md: "auto" }, textAlign: "left" }}>
              {translate({ tKey: "general.to", lang: language }).toLowerCase()}
            </Typography>
            <DatePicker
              disableFuture
              defaultValue={dayjs(maxDate)}
              minDate={selectedStartDate ? dayjs(selectedStartDate).add(1, "year") : dayjs(minDate)}
              maxDate={dayjs(maxDate)}
              label={translate({ tKey: "general.endYear", lang: language })}
              views={["year"]}
              value={selectedEndDate}
              onChange={handleEndDateChange}
              slotProps={{ textField: { size: "small" } }}
            />
          </Box> */}
        </Box>
      </LocalizationProvider>
    </Grid>
  );
};
