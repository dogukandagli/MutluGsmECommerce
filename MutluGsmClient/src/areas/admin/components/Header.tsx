import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

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
      </Toolbar>
    </AppBar>
  );
}
