import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
  Avatar,
  IconButton,
  MenuItem,
  Menu,
  ListSubheader,
} from "@mui/material";

import { useState } from "react";
import { NavLink } from "react-router";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined"; // Products
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined"; // Create Product
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

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
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(menuAnchor);

  const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) =>
    setMenuAnchor(e.currentTarget);
  const handleMenuClose = () => setMenuAnchor(null);

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
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          boxShadow: (theme) => theme.shadows[12],
          m: 2,
          height: (theme) => `calc(100dvh - ${theme.spacing(4)})`,
          overflow: "hidden",

          backgroundClip: "padding-box",
        },
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 2,
        }}
      >
        {/* Header (logo) */}
        <Box sx={{ display: "flex", alignItems: "center", height: 48 }}>
          <Box
            component="img"
            alt="Logo"
            src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
            sx={{ height: 24, objectFit: "cover" }}
          />
        </Box>

        {/* Nav sections */}
        <Box sx={{ flex: 1, overflow: "auto" }}>
          <List
            subheader={
              <ListSubheader component="div" disableSticky>
                Products
              </ListSubheader>
            }
          >
            <ListItemButton component={NavLink} to="products">
              <ListItemIcon>
                <Inventory2OutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItemButton>
            <ListItemButton component={NavLink} to="products/new">
              <ListItemIcon>
                <AddBoxOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Create Product" />
            </ListItemButton>
          </List>

          <Divider sx={{ my: 1 }} />

          <List
            subheader={
              <ListSubheader component="div" disableSticky>
                Account
              </ListSubheader>
            }
          >
            <ListItemButton>
              <ListItemIcon>
                <PersonOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="User" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <SettingsOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </ListItemButton>
          </List>
        </Box>

        {/* Footer (user + menu) */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
            sx={{ width: 36, height: 36 }}
          >
            J
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="subtitle2" noWrap>
              John Smith
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              Product Manager
            </Typography>
          </Box>
          <IconButton size="small" onClick={handleMenuOpen}>
            <MoreHorizIcon />
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            open={menuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <PersonOutlineIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <SettingsOutlinedIcon fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <LogoutOutlinedIcon fontSize="small" />
              </ListItemIcon>
              Log out
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Drawer>
  );
}
