import { Box, Container } from "@mui/system";
import { Breadcrumbs, Link } from "@mui/material";
import { NavLink } from "react-router";
import { ProductsDataGrid } from "../../../features/products/components/ProductsDataGrid";
export default function ProductsPage() {
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
            to="/admin/products"
            underline="hover"
            color="text.primary"
          >
            Ürünler
          </Link>
        </Breadcrumbs>
      </Container>

      {/* Grid kısmı (tam ekran) */}
      <Box sx={{ width: "100%", px: 4, pb: 6, my: 2 }}>
        <ProductsDataGrid />
      </Box>
    </Box>
  );
}
