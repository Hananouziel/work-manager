import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { TextareaAutosize } from "./common/TextArea";
import { httpService } from "../api";

export const Messages = ({ user, isAdmin, allUsers }) => {
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");

  const [messages, setMessages] = useState([]);
  console.log("messages", messages);

  useEffect(() => {
    if (isAdmin) {
      httpService.get(`/messages`).then((response) => {
        setMessages(response.data.messages);
      });
    } else {
      httpService.get(`/messages/${user.id}`).then((response) => {
        setMessages(response.data.messages);
      });
    }
  }, [isAdmin, user?.id]);

  const handleSendClick = async () => {
    const messageBody = {
      userId: user.id,
      topic,
      message,
    };

    if (isAdmin) {
      messageBody.recipient = recipient;
    }

    await httpService.post("/messages", messageBody);
    setMessage("");
    setTopic("");
  };

  return (
    <Box p={5}>
      <h1>הודעות</h1>
      <Box>
        {messages.map((message) => (
          <Box
            textAlign="start"
            key={message.id}
            border="1px solid gray"
            p={2}
            my={1}
          >
            <div>מאת: {message.senderName}</div>
            <h3>נושא {message.topic}</h3>
            <p>
              הודעה: <br />
              {message.message}
            </p>
          </Box>
        ))}
      </Box>
      <Box display="flex" flexDirection="column" gap="10px" pt="5px">
        {isAdmin && (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">משמרת</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={recipient}
              label="נמען"
              onChange={(e) => setRecipient(e.target.value)}
            >
              {[
                { label: "כולם", value: "all" },
                ...allUsers.map((user) => ({
                  label: user.name,
                  value: user.id,
                })),
              ].map(({ label, value }, index) => (
                <MenuItem key={index} value={value}>
                  {label}
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
