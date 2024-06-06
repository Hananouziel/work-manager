import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { httpService } from "../api";

export const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log({ id, password });
    const response = await httpService.post("/users/login", { id, password });
    console.log(response);
  };

  return (
    <div id="login">
      <h1>כניסה</h1>
      <Stack component="form" gap="10px" onSubmit={handleLogin}>
        <TextField
          name="id"
          id="outlined-basic"
          label="מספר אישי"
          variant="outlined"
          dir="rtl"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="סיסמה"
          variant="outlined"
          dir="rtl"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" type="submit">
          התחבר
        </Button>
      </Stack>
    </div>
  );
};
