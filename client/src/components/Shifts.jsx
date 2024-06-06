import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/system";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};
const TextareaAutosize = styled(BaseTextareaAutosize)(
  ({ theme }) => `
    box-sizing: border-box;
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);

const hebrewDayNames = [
  "ראשון",
  "שני",
  "שלישי",
  "רביעי",
  "חמישי",
  "שישי",
  "שבת",
];

export const Shifts = () => {
  const [date, setDate] = useState(dayjs(new Date().toISOString()));
  const [shiftType, setShiftType] = useState(0);
  const [notes, setNotes] = useState("");

  const handleShiftSubmit = (e) => {
    e.preventDefault();
    console.log(date, shiftType);
  };

  return (
    <Box
      component="form"
      onSubmit={handleShiftSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        padding: "40px",
      }}
      id="shifts"
    >
      <h1>משמרות</h1>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="10px"
      >
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          dateFormats={{ keyboardDate: "DD/MM/YYYY" }}
        >
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DatePicker
              label="תאריך משמרת"
              value={date}
              onChange={(newValue) => setDate(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>

        <Box>{hebrewDayNames[date.$d.getDay()]}</Box>
      </Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">משמרת</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={shiftType}
          label="משמרת"
          onChange={(e) => setShiftType(e.target.value)}
        >
          <MenuItem value={0}>משמרת בוקר 8:00-13:00</MenuItem>
          <MenuItem value={1}>משמרת צהריים 15:00-20:00</MenuItem>
          <MenuItem value={2}>משמרת ערב 22:00-03:00</MenuItem>
        </Select>
      </FormControl>
      <TextareaAutosize
        minRows={3}
        placeholder="הערות"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <Button variant="contained" type="submit">
        הגש משמרת
      </Button>
    </Box>
  );
};
