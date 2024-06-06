import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { TextareaAutosize } from "./common/TextArea";
import { httpService } from "../api";

export const Messages = ({ user, isAdmin }) => {
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");

  const handleSendClick = async () => {
    console.log({ topic, message });
    await httpService.post("/messages", {
      userId: user.id,
      topic,
      message,
    });
  };

  return (
    <Box p={5}>
      <h1>הודעות</h1>
      <Box></Box>
      <Box display="flex" flexDirection="column" gap="10px" pt="5px">
        {isAdmin && (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">משמרת</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={recipient}
              label="משמרת"
              onChange={(e) => setRecipient(e.target.value)}
            >
              {["1", "2"].map((shift, index) => (
                <MenuItem key={index} value={index}>
                  {shift}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <TextField
          id="outlined-basic"
          label="נושא"
          variant="outlined"
          dir="rtl"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <TextareaAutosize
          minRows={3}
          sx={{ width: "100%" }}
          placeholder="הודעה"
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
