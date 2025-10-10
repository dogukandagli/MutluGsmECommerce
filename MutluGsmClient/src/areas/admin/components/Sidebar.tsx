import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  // Typography,
  Box,
  // Avatar,
  // IconButton,
  // MenuItem,
  // Menu,
  ListSubheader,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

import { NavLink, useNavigate } from "react-router";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined"; // Products
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined"; // Create Product
import { useAppDispatch } from "../../../app/store/hooks";
import { signOut } from "../../../features/account/store/authSlice";
// import { useState } from "react";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

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
  // const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  // const menuOpen = Boolean(menuAnchor);

  // const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) =>
  //   setMenuAnchor(e.currentTarget);
  // const handleMenuClose = () => setMenuAnchor(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
        <Box sx={{ display: "flex", alignItems: "center", height: 100 }}>
          <Box
            component="img"
            alt="Logo"
            src="/mutlugsm.png"
            sx={{ height: "auto", width: 190, objectFit: "cover" }}
          />
        </Box>

        {/* Nav sections */}
        <Box sx={{ flex: 1, overflow: "auto" }}>
          <List
            subheader={
              <ListSubheader component="div" disableSticky>
                Ürünler
              </ListSubheader>
            }
          >
            <ListItemButton component={NavLink} to="products">
              <ListItemIcon>
                <Inventory2OutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Ürünler" />
            </ListItemButton>
            <ListItemButton component={NavLink} to="products/new">
              <ListItemIcon>
                <AddBoxOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Ürün Oluştur" />
            </ListItemButton>
          </List>

          <Divider sx={{ my: 1 }} />
          <List
            subheader={
              <ListSubheader component="div" disableSticky>
                Slider
              </ListSubheader>
            }
          >
            <ListItemButton component={NavLink} to="sliders">
              <ListItemIcon>
                <Inventory2OutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Slider" />
            </ListItemButton>
            <ListItemButton component={NavLink} to="sliders/new">
              <ListItemIcon>
                <AddBoxOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Slider Oluştur" />
            </ListItemButton>
          </List>

          <Divider sx={{ my: 1 }} />

          <List
            subheader={
              <ListSubheader component="div" disableSticky>
                Hesap
              </ListSubheader>
            }
          >
            <ListItemButton
              onClick={() => {
                dispatch(signOut());
                navigate("/admin/login");
              }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Çıkış Yap" />
            </ListItemButton>
          </List>
        </Box>

        {/* Footer (user + menu) */}
        {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
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
        </Box> */}
      </Box>
    </Drawer>
  );
}
