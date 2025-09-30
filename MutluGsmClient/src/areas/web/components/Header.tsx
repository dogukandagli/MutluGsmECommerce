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
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useAppSelector } from "../../../app/store/hooks";
import { selectAllCategory } from "../../../features/category/store/categorySlice";
import { NavLink, useNavigate } from "react-router";

export default function Header() {
  const [q, setQ] = React.useState("");
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const navigate = useNavigate();

  const submitSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    navigate(`/search/${q}`);
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
      <Box>
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              justifyContent: "space-between",
              minHeight: 72,
              gap: 1.5,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* Mobil: hamburger */}
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton size="large" onClick={() => setOpenDrawer(true)}>
                  <MenuIcon />
                </IconButton>
              </Box>

              {/* Logo */}
              <Box sx={{ display: "inline=block" }}>
                <Typography
                  component={NavLink}
                  to="/"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    fontSize: { xs: 22, md: 26 },
                    color: "text.error",
                    textDecoration: "none", // çizgi yok
                  }}
                >
                  Mutlu Gsm
                </Typography>
              </Box>
            </Box>

            {/* Arama */}
            <Box
              component="form"
              onSubmit={submitSearch}
              sx={{
                flex: 1,
                display: { xs: "none", md: "inline-block" },
                mx: { xs: 1, md: 3 },
                maxWidth: 400,
              }}
            >
              <TextField
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Aranan kelimeyi buraya yazınız…"
                size="small"
                fullWidth
                // (İstersen adornment'ı kaldırabilirsin; burada örnek olsun diye bıraktım)
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  // dış kutuyu (OutlinedInput) hedefliyoruz
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px", // köşeler
                    bgcolor: "grey.200",
                    // kenarlığın durumlara göre rengi
                    "& fieldset": { borderColor: "grey.400" },
                    "&:hover fieldset": { borderColor: "grey.500" },
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                      borderWidth: 1,
                    },
                  },
                  // yazı alanının iç pad'i
                  "& .MuiInputBase-input": {
                    paddingY: 1.1,
                  },
                }}
              />
            </Box>

            {/* Sağ aksiyonlar */}
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyItems="end"
            >
              <Button
                startIcon={<StorefrontIcon />}
                color="inherit"
                sx={{ display: { sm: "inline-flex" } }}
              >
                Mağazamız
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </Box>

      <Box
        sx={{
          display: { xs: "none", md: "block" },
          ml: { xs: "auto", md: 0 },
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyItems: "flex-end" }}>
            <Stack direction="row" spacing={2.5} alignItems="center" mx="start">
              {categories.map((c) => (
                <Button
                  component={NavLink}
                  to={`category/${c.name}`}
                  key={c.id}
                  color="inherit"
                  sx={{ fontWeight: 400 }}
                >
                  {c.name}
                </Button>
              ))}
              <Button
                component={NavLink}
                to={"category/2.El Ürünler"}
                key={0}
                color="inherit"
                sx={{ fontWeight: 400 }}
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
        slotProps={{
          paper: {
            sx: {
              width: 320,
              top: { xs: 75, md: 128 },
              height: { xs: "calc(100% - 72px)" },
            },
          },
          backdrop: {
            sx: {
              top: { xs: 75, md: 128 },
              height: { xs: "calc(100% - 72px)" },
            },
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box
            component="form"
            onSubmit={submitSearch}
            sx={{
              flex: 1,
              mx: { xs: 1, md: 3 },
              maxWidth: 550,
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
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  bgcolor: "grey.200",
                  "& fieldset": { borderColor: "grey.400" },
                  "&:hover fieldset": { borderColor: "grey.500" },
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
                    borderWidth: 1,
                  },
                },
                "& .MuiInputBase-input": {
                  paddingY: 1.1,
                },
              }}
            />
          </Box>
        </Box>
        <Divider />
        <List>
          {categories.map((c) => (
            <ListItemButton
              key={c.id}
              component={NavLink}
              to={`category/${c.name}`}
              onClick={() => setOpenDrawer(false)}
              sx={{ borderBottom: "1px solid rgba(0,0,0,0.12)" }}
            >
              <ListItemText primary={c.name} />
            </ListItemButton>
          ))}
          <ListItemButton
            key={0}
            component={NavLink}
            to={`category/2.El Ürünler`}
            onClick={() => setOpenDrawer(false)}
            sx={{ borderBottom: "1px solid rgba(0,0,0,0.12)" }}
          >
            <ListItemText primary={"2.El Ürünler"} />
          </ListItemButton>
        </List>
      </Drawer>
    </AppBar>
  );
}
