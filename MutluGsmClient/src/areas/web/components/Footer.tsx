import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  IconButton,
} from "@mui/material";
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  LocationOn as LocationOnIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
} from "@mui/icons-material";
import { useAppSelector } from "../../../app/store/hooks";
import { selectAllCategory } from "../../../features/category/store/categorySlice";
import { NavLink } from "react-router";

export default function Footer() {
  const categories = useAppSelector((state) => selectAllCategory(state));

  return (
    <Box component="footer" sx={{ bgcolor: "white", py: 6 }}>
      <Divider />
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        {/* Üst Kısım */}
        <Grid container spacing={4}>
          {/* Ürün Kategorileri */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="h6" gutterBottom>
              Ürün Kategorileri
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              {categories &&
                categories.map((c) => (
                  <Link
                    variant="body2"
                    component={NavLink}
                    to={`category/${c.name}`}
                    color="text.primary"
                    sx={{
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {c.name}
                  </Link>
                ))}
            </Box>
          </Grid>

          {/* Kurumsal */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="h6" gutterBottom>
              Kurumsal
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Link
                href="#"
                variant="body2"
                underline="hover"
                color="text.primary"
              >
                Hakkımızda
              </Link>
              <Link
                href="#"
                variant="body2"
                underline="hover"
                color="text.primary"
              >
                Kariyer
              </Link>
              <Link
                href="#"
                variant="body2"
                underline="hover"
                color="text.primary"
              >
                Basın
              </Link>
              <Link
                href="#"
                variant="body2"
                underline="hover"
                color="text.primary"
              >
                Mağazalarımız
              </Link>
              <Link
                href="#"
                variant="body2"
                underline="hover"
                color="text.primary"
              >
                Sürdürülebilirlik
              </Link>
              <Link
                href="#"
                variant="body2"
                underline="hover"
                color="text.primary"
              >
                Blog
              </Link>
            </Box>
          </Grid>

          {/* İletişim */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="h6" gutterBottom>
              İletişim
            </Typography>
            <Box display="flex" alignItems="flex-start" gap={1}>
              <LocationOnIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                Maslak Mahallesi, Büyükdere Caddesi No:123, Sarıyer, İstanbul
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <PhoneIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                0850 123 45 67
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <EmailIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                destek@alisveris.com
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Sosyal Medya */}
        <Divider sx={{ my: 4 }} />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={2}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body2" color="text.secondary">
              Bizi Takip Edin
            </Typography>
            <Box>
              <IconButton color="primary">
                <FacebookIcon />
              </IconButton>
              <IconButton color="error">
                <InstagramIcon />
              </IconButton>
              <IconButton color="secondary">
                <TwitterIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />
        <Box
          display="flex"
          justifyContent="space-between"
          flexWrap="wrap"
          alignItems="center"
          gap={2}
        >
          <Typography variant="caption" color="text.secondary">
            © 2025 Alışveriş Sitesi. Tüm hakları saklıdır.
          </Typography>
          <Box display="flex" gap={3}>
            <Link href="#" underline="hover" color="text.secondary">
              Gizlilik Politikası
            </Link>
            <Link href="#" underline="hover" color="text.secondary">
              Kullanım Koşulları
            </Link>
            <Link href="#" underline="hover" color="text.secondary">
              Çerez Politikası
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
