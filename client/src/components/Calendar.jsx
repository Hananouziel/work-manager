import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { Box, Stack } from "@mui/material";

const Day = (date, _, DayProps) => {
  console.log("date", date);
  // Customize the rendering of each day here
  return (
    <Stack position={"relative"}>
      <PickersDay {...DayProps}>{date.day.$D}</PickersDay>
      {/* <Box
        position="absolute"
        bottom={0}
        right={"50%"}
        width={5}
        height={5}
        sx={{
          bgcolor: "red",
        }}
      ></Box> */}
    </Stack>
  );
};

export const Calendar = () => {
  return (
    <div id="calendar">
      <h1>לוח שנה</h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          //   renderDay={(date, _, DayProps) => {
          //     console.log("date", date);
          //     // Customize the rendering of each day here
          //     return <div {...DayProps}>{date.getDate()}!</div>;
          //   }}

          slots={{
            day: Day,
          }}
        />
      </LocalizationProvider>
    </div>
  );
};
