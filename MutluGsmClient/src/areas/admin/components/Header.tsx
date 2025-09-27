import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Badge,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";

interface HeaderProps {
  handleSideBar?: () => void;
}

export default function Header({ handleSideBar }: HeaderProps) {
  return (
    <AppBar
      position="static"
      sx={{
        display: { md: "none" },
      }}
      color="transparent"
    >
      <Toolbar variant="dense">
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleSideBar}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Mutlu Gsm
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Avatar
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=40"
          sx={{ ml: 2 }}
        />
      </Toolbar>
    </AppBar>
  );
}
