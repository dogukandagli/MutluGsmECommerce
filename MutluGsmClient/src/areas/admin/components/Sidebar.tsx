import * as React from "react";
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
  Card,
  CardContent,
  LinearProgress,
  Button,
  Collapse,
} from "@mui/material";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import SupportRoundedIcon from "@mui/icons-material/SupportRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const drawerWidth = 240;

export default function Sidebar() {
  const [tasksOpen, setTasksOpen] = React.useState(false);
  const [usersOpen, setUsersOpen] = React.useState(false);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
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
            <ListItemText primary="Tasks" />
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
            <ListItemButton sx={{ pl: 4 }}>All tasks</ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>Backlog</ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>In progress</ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>Done</ListItemButton>
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

      {/* Support & Settings */}
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SupportRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Support" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SettingsRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>

      {/* Used space card */}
      <Box sx={{ p: 2 }}>
        <Card variant="outlined">
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle2">Used space</Typography>
              <IconButton size="small">
                <CloseRoundedIcon fontSize="small" />
              </IconButton>
            </Box>
            <Typography variant="caption">
              Your team has used 80% of your available space. Need more?
            </Typography>
            <LinearProgress variant="determinate" value={80} sx={{ my: 1 }} />
            <Button size="small" variant="contained">
              Upgrade plan
            </Button>
          </CardContent>
        </Card>
      </Box>

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
