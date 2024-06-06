import { Box, Button } from "@mui/material";
import { useState } from "react";
import { TextareaAutosize } from "./common/TextArea";
import { httpService } from "../api";

const buttonStyles = { borderRadius: "50%", width: "100px", height: "100px" };
export const Attendance = ({ user }) => {
  console.log("user", user);
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [note, setNote] = useState("");

  const handleExit = () => {
    setShowNoteInput(true);
  };

  const handleSendClick = () => {
    httpService.post("/users/attendance/exit", {
      userId: user.id,
      note,
    });

    setShowNoteInput(false);
    setNote("");

    alert("הנתונים נשמרו בהצלחה");
  };

  const handleEnter = () => {
    httpService.post("/users/attendance/enter", {
      userId: user.id,
    });

    alert("הנתונים נשמרו בהצלחה");
  };

  return (
    <Box p={5}>
      <h1>שעון נוכחות</h1>

      <Box>
        <Button
          variant="contained"
          color="primary"
          sx={buttonStyles}
          onClick={handleEnter}
        >
          כניסה
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={buttonStyles}
          onClick={handleExit}
        >
          יציאה
        </Button>
      </Box>

      {showNoteInput && (
        <Box display="flex" gap="5" pt="5">
          <TextareaAutosize
            minRows={3}
            placeholder="הערות"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSendClick}>
            שלח
          </Button>
        </Box>
      )}
    </Box>
  );
};
