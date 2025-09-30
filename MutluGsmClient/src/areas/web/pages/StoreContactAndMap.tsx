import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Stack,
  IconButton,
  Link,
} from "@mui/material";
import {
  LocationOn as LocationOnIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon,
} from "@mui/icons-material";

export default function StoreContactAndMap() {
  const address = "Maslak Mahallesi, Büyükdere Cd. No:123, Sarıyer/İstanbul";
  const phone = "0850 555 33 22";
  const email = "destek@magazam.com";
  const lat = 38.39699293548789;
  const lng = 27.11342679086468;

  const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  return (
    <Box component="section" sx={{ bgcolor: "background.default", py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="stretch">
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper
              elevation={1}
              sx={{
                height: "100%",
                p: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography variant="h5" fontWeight={700}>
                Mağazamız
              </Typography>

              <List dense>
                <ListItem disableGutters>
                  <ListItemIcon>
                    <LocationOnIcon color="action" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Adres"
                    secondary={address}
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                </ListItem>

                <ListItem disableGutters>
                  <ListItemIcon>
                    <PhoneIcon color="action" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Telefon"
                    secondary={
                      <Link
                        href={`tel:${phone.replace(/\s+/g, "")}`}
                        underline="hover"
                      >
                        {phone}
                      </Link>
                    }
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                </ListItem>

                <ListItem disableGutters>
                  <ListItemIcon>
                    <EmailIcon color="action" />
                  </ListItemIcon>
                  <ListItemText
                    primary="E-posta"
                    secondary={
                      <Link href={`mailto:${email}`} underline="hover">
                        {email}
                      </Link>
                    }
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                </ListItem>
              </List>

              <Divider sx={{ my: 1 }} />

              <Stack direction="row" spacing={1} sx={{}}>
                <IconButton aria-label="Facebook">
                  <FacebookIcon />
                </IconButton>
                <IconButton aria-label="Instagram">
                  <InstagramIcon />
                </IconButton>
                <IconButton aria-label="YouTube">
                  <YouTubeIcon />
                </IconButton>
              </Stack>
            </Paper>
          </Grid>

          {/* SAĞ: Harita */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper elevation={1} sx={{ height: "100%", overflow: "hidden" }}>
              {/* Responsive 16:9 oranlı iframe */}
              <Box sx={{ position: "relative", pt: "56.25%" }}>
                <Box
                  component="iframe"
                  src={mapSrc}
                  title="Mağaza Konumu"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{
                    border: 0,
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
