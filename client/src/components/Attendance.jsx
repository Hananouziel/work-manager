import { Box, Button } from "@mui/material";
import { useState } from "react";
import { TextareaAutosize } from "./common/TextArea";

const buttonStyles = { borderRadius: "50%", width: "100px", height: "100px" };
export const Attendance = ({ user }) => {
  const [showNoteInput, setShowNoteInput] = useState(false);

  const handleExit = () => {
    console.log("exit");
    setShowNoteInput(true);
  };

  return (
    <div>
      <h1>שעון נוכחות</h1>

      <Box>
        <Button variant="contained" color="primary" sx={buttonStyles}>
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
        <Box>
          <TextareaAutosize />
          <Button variant="contained" color="primary">
            שלח
          </Button>
        </Box>
      )}
    </div>
  );
};
