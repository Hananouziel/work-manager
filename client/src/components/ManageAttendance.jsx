import { useEffect } from "react";
import { useState } from "react";
import { httpService } from "../api";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
const border = { border: "1px solid gray" };

export const ManageAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  console.log("attendance", attendance);

  useEffect(() => {
    const getAttendance = async () => {
      const response = await httpService.get(`/users/attendance`);
      setAttendance(response.data.attendance);
    };

    getAttendance();
  }, []);

  const handleDeleteLine = (userId, timestamp1, timestamp2) => {
    console.log("timestamp1", timestamp1);
    console.log("timestamp2", timestamp2);
    httpService.delete(`/users/attendance/${userId}`, {
      data: {
        timestamp1,
        timestamp2,
      },
    });
  };

  return (
    <div>
      <h1>ניהול נוכחות</h1>
      <div>
        {attendance.map((user) => {
          const days = {};
          for (const report of user.attendance) {
            const date = new Date(report.date._seconds * 1000);
            const day = date.getDate();
            days[day] = [...(days[day] ?? [])];
            days[day].push(report);
          }
          console.log("days", days);
          return (
            <Accordion key={user.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                {user.name}
              </AccordionSummary>
              <AccordionDetails>
                <Box {...border} display="flex" justifyContent="space-between">
                  <Box {...border} flex={1}>
                    תאריך
                  </Box>
                  <Box {...border} flex={1}>
                    כניסה
                  </Box>
                  <Box {...border} flex={1}>
                    יציאה
                  </Box>
                  <Box {...border} flex={1}>
                    הערה
                  </Box>
                  <Box {...border} flex={1}>
                    פעולה
                  </Box>
                </Box>
                {Object.values(days).map((reports, i) => {
                  const lines = [];

                  for (const report of reports) {
                    if (report.type === "enter") {
                      lines.push([report]);
                    }
                    if (report.type === "exit") {
                      lines[lines.length - 1].push(report);
                    }
                  }
                  console.log("lines", lines);

                  return lines.map((line) => {
                    const date = new Date(line[0].date._seconds * 1000)
                      .toLocaleDateString("en-GB")
                      .slice(0, -5);
                    return (
                      <Box
                        display="flex"
                        {...border}
                        justifyContent="space-between"
                        key={i}
                      >
                        <Box {...border} flex={1}>
                          {date}
                        </Box>
                        <Box {...border} flex={1}>
                          {new Date(
                            line[0].date._seconds * 1000
                          )?.toLocaleTimeString(undefined, {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          }) ?? ""}
                        </Box>
                        <Box {...border} flex={1}>
                          {new Date(
                            line[1].date._seconds * 1000
                          )?.toLocaleTimeString(undefined, {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          }) ?? ""}
                        </Box>
                        <Box {...border} flex={1}>
                          {line[1]?.note ?? ""}
                        </Box>
                        <Box {...border} flex={1}>
                          <DeleteForeverIcon
                            onClick={() =>
                              handleDeleteLine(
                                user.id,
                                line[0].date._seconds,
                                line[1].date._seconds
                              )
                            }
                          />
                        </Box>
                      </Box>
                    );
                  });
                })}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};
