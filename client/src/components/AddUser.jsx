import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { httpService } from "../api";

export const AddUser = () => {
  const [fullName, setFullName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleAddUser = async (e) => {
    e.preventDefault();
    const data = {
      fullName,
      id,
      password,
      role,
    };
    console.log("data", data);
    await httpService.post("/users", data);

    setFullName("");
    setId("");
    setPassword("");
    setRole("user");
  };

  return (
    <Box p="15px">
      <h1>הוספת משתמש</h1>
      <Stack gap="10px" component={"form"} onSubmit={handleAddUser}>
        <div>
          <TextField
            label="שם מלא"
            variant="outlined"
            fullWidth
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div>
          <TextField
            label="מספר אישי"
            variant="outlined"
            fullWidth
            required
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div>
          <TextField
            label="סיסמה"
            placeholder="סיסמה"
            variant="outlined"
            fullWidth
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="demo-simple-select-label">תפקיד</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="תפקיד"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value={"admin"}>מנהל</MenuItem>
              <MenuItem value={"user"}>עובד</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <Button type="submit" variant="contained" color="primary">
            הוסף
          </Button>
        </div>
      </Stack>
    </Box>
  );
};
