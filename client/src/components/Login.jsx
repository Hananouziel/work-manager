import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { httpService } from "../api";
import { useNavigate } from "react-router-dom";

export const Login = ({ setUser }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log({ id, password });
    try {
      const response = await httpService.post("/users/login", { id, password });
      setUser(response.data.user);
      navigate("/calendar");
    } catch (error) {
      console.log("error", error);
      alert(error.response.data.message);
    }
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
