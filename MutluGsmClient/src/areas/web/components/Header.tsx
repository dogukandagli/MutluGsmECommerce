import * as React from "react";
import {
  AppBar,
  Toolbar,
  Container,
  IconButton,
  Typography,
  Box,
  Stack,
  Button,
  Badge,
  TextField,
  InputAdornment,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useAppSelector } from "../../../app/store/hooks";
import { selectAllCategory } from "../../../features/category/store/categorySlice";
import { NavLink } from "react-router";

type HeaderProps = {
  cartCount?: number;
  onSearch?: (q: string) => void;
};

export default function Header({ cartCount = 0, onSearch }: HeaderProps) {
  const [q, setQ] = React.useState("");
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const submitSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    onSearch?.(q.trim());
  };

  const categories = useAppSelector((state) => selectAllCategory(state));

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="default"
      sx={{
        bgcolor: "background.paper",
        borderBottom: "0.5px solid #ebebeeff",
      }}
    >
      {/* ÜST ŞERİT */}
      <Box sx={{}}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: 72, gap: 1.5 }}>
            {/* Mobil: hamburger */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton size="large" onClick={() => setOpenDrawer(true)}>
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Logo */}
            <Box component={NavLink} to="/">
              <Typography
                sx={{
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  cursor: "pointer",
                  mr: 1,
                }}
              >
                Mutlu Gsm
              </Typography>
            </Box>

            {/* Arama */}
            <Box
              component="form"
              onSubmit={submitSearch}
              sx={{
                flex: 1,
                mx: { xs: 1, md: 3 },
                maxWidth: 680,
              }}
            >
              <TextField
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Aranan kelimeyi buraya yazınız…"
                size="small"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Sağ aksiyonlar */}
            <Stack direction="row" spacing={1} alignItems="center">
              <Button
                startIcon={<StorefrontIcon />}
                color="inherit"
                sx={{ display: { xs: "none", sm: "inline-flex" } }}
              >
                Mağaza Seçiniz
              </Button>
              <IconButton size="large">
                <AccountCircleIcon />
              </IconButton>
              <IconButton size="large" aria-label="Sepet">
                <Badge badgeContent={cartCount} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </Box>

      <Box
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: 56 }}>
            <Stack direction="row" spacing={2.5} alignItems="center">
              {categories.map((c) => (
                <Button
                  component={NavLink}
                  to={c.name}
                  key={c.id}
                  color="inherit"
                  sx={{ fontWeight: 300 }}
                >
                  {c.name}
                </Button>
              ))}
              <Button
                component={NavLink}
                to={"2.El Ürünler"}
                key={0}
                color="inherit"
                sx={{ fontWeight: 300 }}
              >
                2.El Ürünler
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </Box>

      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{ sx: { width: 320 } }}
      >
        <Box sx={{ p: 2 }}>
          <Box
            component="form"
            onSubmit={(e) => {
              submitSearch(e);
              setOpenDrawer(false);
            }}
          >
            <TextField
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Ara"
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
        <Divider />
        <List>
          {categories.map((c) => (
            <ListItemButton key={c.id} onClick={() => setOpenDrawer(false)}>
              <ListItemText primary={c.name} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
}
