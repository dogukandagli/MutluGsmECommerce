import { Breadcrumbs, Link, Paper } from "@mui/material";
import { Box, Container } from "@mui/system";
import { NavLink } from "react-router";
import Sliders from "../../../features/slider/components/Sliders";

export default function SlidersPage() {
  return (
    <Box
      sx={{
        width: "100%",
        flexGrow: 1,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Breadcrumb kısmı */}
      <Container sx={{ py: 6 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
          <Link
            component={NavLink}
            to="/admin"
            underline="hover"
            color="inherit"
          >
            Anasayfa
          </Link>
          <Link
            component={NavLink}
            to="/admin/sliders"
            underline="hover"
            color="text.primary"
          >
            Sliderlar
          </Link>
        </Breadcrumbs>
        <Paper>
          <Sliders />
        </Paper>
      </Container>
    </Box>
  );
}
