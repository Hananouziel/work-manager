import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

export function Navbar({ setUser, isAdmin }) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logout = {
    name: "התנתק",
    to: "/login",
    onClick: () => setUser(null),
  };

  const messages = {
    name: "הודעות",
    to: "/messages",
  };
  const attendance = {
    name: "נוכחות",
    to: "/attendance",
  };
  const items = isAdmin
    ? [
        {
          name: "משמרות שהוגשו",
          to: "/shifts-approval",
        },
        {
          name: "הוספת משתמש",
          to: "/add-user",
        },
        {
          name: "משתמשים",
          to: "/users",
        },
        attendance,
        messages,
        logout,
      ]
    : [
        {
          name: "לוח שנה",
          to: "/calendar",
        },
        {
          name: "הגשת משמרות",
          to: "/shifts",
        },
        {
          name: "סטטוס משמרות",
          to: "/shift-status",
        },
        attendance,
        messages,
        {
          name: "אודות",
          to: "/about",
        },
        logout,
      ];

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {items.map(({ name, to, onClick }, index) => {
          return (
            <ListItem key={name} disablePadding onClick={onClick}>
              <Link to={to}>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}
      </List>
      {/* <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  const anchor = "left";
  return (
    <div>
      <Button sx={{ display: "flex" }} onClick={toggleDrawer(anchor, true)}>
        <MenuIcon />
      </Button>
      <Drawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
      >
        {list(anchor)}
      </Drawer>
    </div>
  );
}
