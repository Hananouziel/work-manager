import { Box, Button } from "@mui/material";
import { TextareaAutosize } from "./common/TextArea";
import { useState } from "react";
import { httpService } from "../api";

export const About = ({ user }) => {
  const [message, setMessage] = useState("");

  const handleSendClick = async () => {
    await httpService.post("/messages", {
      userId: user.id,
      type: "feedback",
      message,
    });
  };

  return (
    <Box p="10px">
      <h1>אודות</h1>

      <Box display="flex" flexDirection="column" gap="10px" pt="5px">
        <TextareaAutosize
          minRows={3}
          sx={{ width: "100%" }}
          placeholder="פידבק ודיווח תקלות"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSendClick}>
          שלח
        </Button>
      </Box>
    </Box>
  );
};
