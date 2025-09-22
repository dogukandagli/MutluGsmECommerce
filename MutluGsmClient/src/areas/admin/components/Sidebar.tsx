import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
  Avatar,
  IconButton,
  Chip,
  Collapse,
} from "@mui/material";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useState } from "react";
import { NavLink } from "react-router";

const drawerWidth = 240;

interface HeaderProps {
  sideBarOpen: boolean;
  handleSideBar: () => void;
  mobile: boolean;
}

export default function Sidebar({
  sideBarOpen,
  handleSideBar,
  mobile,
}: HeaderProps) {
  const [tasksOpen, setTasksOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);

  const mobileProps = mobile
    ? {
        variant: "temporary" as const,
        open: sideBarOpen,
        onClose: handleSideBar,
      }
    : { variant: "permanent" as const, open: sideBarOpen }; // persistent'ta onClose gereksiz

  return (
    <Drawer
      anchor="left"
      {...mobileProps}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">Acme Co.</Typography>
      </Box>
      <Divider />

      {/* Menü */}
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HomeRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <DashboardRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton selected>
            <ListItemIcon>
              <ShoppingCartRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItemButton>
        </ListItem>

        {/* Tasks */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => setTasksOpen(!tasksOpen)}>
            <ListItemIcon>
              <AssignmentRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Ürün" />
            <KeyboardArrowDownIcon
              sx={{
                transform: tasksOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "0.2s",
              }}
            />
          </ListItemButton>
        </ListItem>
        <Collapse in={tasksOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton component={NavLink} to="products" sx={{ pl: 4 }}>
              Ürünler
            </ListItemButton>
            <ListItemButton
              component={NavLink}
              to="products/new"
              sx={{ pl: 4 }}
            >
              Ürün Oluştur
            </ListItemButton>
          </List>
        </Collapse>

        {/* Messages */}
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <QuestionAnswerRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Messages" />
            <Chip label="4" color="primary" size="small" />
          </ListItemButton>
        </ListItem>

        {/* Users */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => setUsersOpen(!usersOpen)}>
            <ListItemIcon>
              <GroupRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
            <KeyboardArrowDownIcon
              sx={{
                transform: usersOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "0.2s",
              }}
            />
          </ListItemButton>
        </ListItem>
        <Collapse in={usersOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>My profile</ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>Create a new user</ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>Roles & permission</ListItemButton>
          </List>
        </Collapse>
      </List>

      <Divider />

      <Divider />

      {/* User info */}
      <Box sx={{ display: "flex", alignItems: "center", p: 2, mt: "auto" }}>
        <Avatar
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=40"
          sx={{ mr: 1 }}
        />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="subtitle2">Siriwat K.</Typography>
          <Typography variant="caption">siriwatk@test.com</Typography>
        </Box>
        <IconButton size="small">
          <LogoutRoundedIcon fontSize="small" />
        </IconButton>
      </Box>
    </Drawer>
  );
}
