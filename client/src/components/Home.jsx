import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div id="home">
      <h1>דף הבית</h1>

      <Stack gap="10px">
        <Link to="/login">
          <Button variant="contained">כניסה</Button>
        </Link>
      </Stack>
    </div>
  );
};
