import { Box } from "@mui/material";
import { SHIFTS } from "./Shifts";
import { STATUSES, hebrewDayNames } from "../constants";

export const ShiftStatus = ({ shifts }) => {
  console.log("shifts", shifts);
  return (
    <div>
      <h1>סטטוס משמרות</h1>

      {shifts.map((shift) => (
        <ShiftCard key={shift.date._seconds} shift={shift} />
      ))}
    </div>
  );
};

function ShiftCard({ shift }) {
  const date = new Date(shift.date._seconds * 1000);
  return (
    <Box key={shift.id}>
      <Box bgcolor="lightgray">
        {hebrewDayNames[date.getDay()]} {date.toLocaleDateString("en-GB")}
      </Box>

      <Box display="flex" justifyContent="center">
        <Box>
          <p>משמרת שהוגשה:</p>
          <p>{SHIFTS[shift.shiftType]}</p>
          <div>הערות:</div>
          <p>{shift.notes}</p>
        </Box>
        <Box flex={1}>
          <p>{STATUSES[shift.status]}</p>
        </Box>
      </Box>
    </Box>
  );
}
