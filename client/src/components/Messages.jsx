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
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const Messages = ({ user, isAdmin, allUsers, userById }) => {
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");

  const [messages, setMessages] = useState([]);
  console.log("messages", messages);

  const filterMessages = (messages) => {
    const seenMessages = getSeenMessages();
    const filterBySeen = messages.filter(
      (message) => !seenMessages.includes(message.id)
    );
    if (isAdmin) {
      return filterBySeen.filter(
        (message) => userById[message.userId].group === user.group
      );
    }
    return filterBySeen;
  };

  useEffect(() => {
    if (isAdmin) {
      httpService.get(`/messages`).then((response) => {
        setMessages(filterMessages(response.data.messages));
      });
    } else {
      httpService.get(`/messages/${user.id}`).then((response) => {
        setMessages(filterMessages(response.data.messages));
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

  const handleDeleteMessage = async (messageId) => {
    const seenMessages = getSeenMessages();
    const newSeenMessages = [...seenMessages, messageId];
    localStorage.setItem("seenMessages", JSON.stringify(newSeenMessages));
    setMessages(filterMessages(messages));
  };

  return (
    <Box p={5}>
      <h1>הודעות</h1>
      <Box>
        {messages.map((message) => (
          <Box
            key={message.id}
            textAlign="start"
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
            <DeleteForeverIcon
              onClick={() => handleDeleteMessage(message.id)}
            />
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
function getSeenMessages() {
  return JSON.parse(localStorage.getItem("seenMessages") ?? "[]");
}
