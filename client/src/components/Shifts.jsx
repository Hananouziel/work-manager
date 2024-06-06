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
import { httpService } from "../api";
import { hebrewDayNames } from "../constants";
import { TextareaAutosize } from "./common/TextArea";

export const SHIFTS = [
  "משמרת בוקר 8:00-13:00",
  "משמרת צהריים 15:00-20:00",
  "משמרת ערב 22:00-03:00",
];

export const Shifts = ({ user, refetchShifts }) => {
  const [date, setDate] = useState(dayjs(new Date().toISOString()));
  const [shiftType, setShiftType] = useState(0);
  const [notes, setNotes] = useState("");

  const handleShiftSubmit = async (e) => {
    e.preventDefault();
    console.log(date.$d, shiftType, notes);

    const data = {
      date: date.$d.toISOString(),
      shiftType,
      notes,
      userId: user?.id,
    };

    try {
      await httpService.post("/shifts", data);
      refetchShifts();
      setShiftType(0);
      setNotes("");
      setDate(dayjs(new Date().toISOString()));
    } catch (error) {
      console.error(error);
    }
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
          {SHIFTS.map((shift, index) => (
            <MenuItem key={index} value={index}>
              {shift}
            </MenuItem>
          ))}
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
