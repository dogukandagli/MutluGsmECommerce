import { Container } from "@mui/system";
import ProductCreateStepper from "../../../features/products/components/Create/ProductCreateStepper";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { NavLink } from "react-router";

export default function ProductCreatePage() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Breadcrumb üst kısımda */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 10 }}>
        <Link component={NavLink} to="/" underline="hover" color="inherit">
          Anasayfa
        </Link>
        <Link
          component={NavLink}
          to="/admin/products"
          underline="hover"
          color="inherit"
        >
          Ürünler
        </Link>
        <Typography color="text.primary">Yeni Ürün</Typography>
      </Breadcrumbs>

      <ProductCreateStepper />
    </Container>
  );
}
