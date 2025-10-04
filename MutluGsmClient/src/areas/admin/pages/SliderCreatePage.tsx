import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Container } from "@mui/system";
import SliderCreate from "../../../features/slider/components/SliderCreate";
import { NavLink } from "react-router";

export default function SliderCreatePage() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Breadcrumb üst kısımda */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 10 }}>
        <Link component={NavLink} to="/" underline="hover" color="inherit">
          Anasayfa
        </Link>
        <Link
          component={NavLink}
          to="/admin/sliders"
          underline="hover"
          color="inherit"
        >
          Sliders
        </Link>
        <Typography color="text.primary">Yeni Slider</Typography>
      </Breadcrumbs>

      <SliderCreate />
    </Container>
  );
}
