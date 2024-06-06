import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { Box, Stack } from "@mui/material";
import { createContext, useContext, useState } from "react";
import { SHIFTS } from "../constants";

const ShiftContext = createContext();

const Day = (date, _, DayProps) => {
  const { shiftsMap, onDaySelect } = useContext(ShiftContext);

  const dateKey =
    date.day.$y +
    "-" +
    (date.day.$M + 1).toString().padStart(2, "0") +
    "-" +
    date.day.$D.toString().padStart(2, "0");
  const hasEvent = shiftsMap[dateKey];

  return (
    <Stack position={"relative"}>
      <PickersDay
        {...DayProps}
        onDaySelect={() => {
          onDaySelect(dateKey);
        }}
      >
        {date.day.$D}
      </PickersDay>
      {hasEvent && (
        <Box
          position="absolute"
          bottom={0}
          right={"43%"}
          width={5}
          height={5}
          sx={{
            bgcolor: "red",
            borderRadius: "50%",
          }}
        ></Box>
      )}
    </Stack>
  );
};

export const Calendar = ({ shifts, isAdmin, allUsers }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const shiftsMap = shifts.reduce((acc, shift) => {
    if (shift.status !== "approved") return acc;
    const date = new Date(shift.date._seconds * 1000)
      .toISOString()
      .split("T")[0];
    acc[date] = [...(acc[date] ?? []), shift];
    return acc;
  }, {});

  const selectedDayShifts = shifts.filter(
    (shift) =>
      new Date(shift.date._seconds * 1000).toISOString().split("T")[0] ===
      selectedDate
  );

  return (
    <div id="calendar">
      <h1>לוח שנה</h1>
      <ShiftContext.Provider
        value={{ shiftsMap, onDaySelect: setSelectedDate }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            slots={{
              day: Day,
            }}
          />
        </LocalizationProvider>
      </ShiftContext.Provider>
      <Box>
        <Box height={"1px"} bgcolor="lightgray"></Box>
        {selectedDayShifts.map((shift) => (
          <Box key={shift.id} display="flex" gap="10px" p="10px">
            <Box textAlign={"start"}>
              <Box>{SHIFTS[shift.shiftType]}</Box>
              {isAdmin && (
                <>
                  {" "}
                  שם המתנדב: {allUsers.find((u) => u.id === shift.userId).name}
                </>
              )}
              {shift.notes && <Box>הערות: {shift.notes}</Box>}
            </Box>
          </Box>
        ))}
      </Box>
    </div>
  );
};
