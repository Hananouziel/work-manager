import {
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { httpService } from "../api";

export const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [userAction, setUserAction] = useState("");

  const fetchUsers = async () => {
    const response = await httpService.get("/users");
    setAllUsers(response.data.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleActionSelect = async (value, userId) => {
    try {
      if (value === "delete-user") {
        console.log("delete user");
        const didConfirm = confirm("האם אתה בטוח שברצונך למחוק משתמש זה?");
        if (didConfirm) {
          await httpService.delete(`/users/${userId}`);
        }
      } else if (value === "freeze-user") {
        console.log("freeze user");
        await httpService.put(`/users/${userId}`, {
          isFrozen: true,
        });
      } else if (value === "unfreeze-user") {
        console.log("unfreeze user");
        await httpService.put(`/users/${userId}`, {
          isFrozen: false,
        });
      } else if (value === "set-group") {
        console.log("set group");
        const group = prompt(
          "הכנס את מספר הקבוצה שברצונך לשייך את המשתמש אליה"
        );
        await httpService.put(`/users/${userId}`, {
          group,
        });
      }
      await fetchUsers();
    } catch (error) {
      alert("אירעה שגיאה");
      console.error(error);
    }
    setUserAction("");
  };

  return (
    <div>
      <h1>משתמשים</h1>
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>שם מלא</TableCell>
                <TableCell>מספר אישי</TableCell>
                <TableCell>תפקיד</TableCell>
                <TableCell>קבוצה</TableCell>
                <TableCell>פעולות</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.type}</TableCell>
                  <TableCell>{user.group}</TableCell>
                  <TableCell>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="תפקיד"
                      required
                      value={userAction}
                      onChange={(e) =>
                        handleActionSelect(e.target.value, user.id)
                      }
                    >
                      <MenuItem value={"delete-user"}>מחק משתמש</MenuItem>
                      <MenuItem value={"freeze-user"}>הקפא משתמש</MenuItem>
                      <MenuItem value={"unfreeze-user"}>שחרר מהקפאה</MenuItem>
                      <MenuItem value={"set-group"}>שייך לקבוצה</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
