import { Box, Button, TextField } from "@mui/material";
import { SHIFTS } from "./Shifts";
import { STATUSES, hebrewDayNames } from "../constants";
import { useState } from "react";
import { httpService } from "../api";

export const ShiftStatus = ({ shifts, isAdmin, refetchShifts }) => {
  console.log("shifts", shifts);
  return (
    <div>
      <h1>סטטוס משמרות</h1>

      {shifts.map((shift) => (
        <>
          <ShiftCard
            key={shift.date._seconds}
            shift={shift}
            isAdmin={isAdmin}
            refetchShifts={refetchShifts}
          />
        </>
      ))}
    </div>
  );
};

function ShiftCard({ shift, refetchShifts, isAdmin }) {
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [note, setNote] = useState(shift.notes);

  const date = new Date(shift.date._seconds * 1000);
  const onNoteClick = () => {
    setIsEditingNote(true);
  };

  const onNoteSave = async () => {
    setIsEditingNote(false);

    await httpService.put(`/shifts/${shift.id}`, {
      notes: note,
    });
    refetchShifts();
  };

  const onApprove = async () => {
    await httpService.put(`/shifts/${shift.id}`, {
      status: "approved",
    });
    refetchShifts();
  };

  const onReject = async () => {
    await httpService.put(`/shifts/${shift.id}`, {
      status: "rejected",
    });
    refetchShifts();
  };

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
          {isEditingNote ? (
            <>
              <TextField
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <Button variant="contained" onClick={onNoteSave}>
                שמור
              </Button>
            </>
          ) : (
            <p onClick={onNoteClick}>{note}</p>
          )}
        </Box>
        <Box flex={1}>
          <p>{STATUSES[shift.status]}</p>
          {isAdmin && (
            <Box
              flex={1}
              gap="5px"
              display="flex"
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Button variant="contained" onClick={onApprove}>
                אשר
              </Button>
              <Button variant="contained" onClick={onReject}>
                דחה
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
