import { Container } from "@mui/system";
import ProductEditView from "../../../features/products/components/ProductEditView";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { NavLink, useParams } from "react-router";
import { useAppSelector } from "../../../app/store/hooks";
import { selectProductById } from "../../../features/products/store/productSlice";

export default function ProductEditPage() {
  const { id } = useParams<{ id: string }>();
  const product = useAppSelector((state) => selectProductById(state, id!));

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 6 }}>
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
            color="inherit"
          >
            Ürünler
          </Link>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>
        <ProductEditView />
      </Container>
    </>
  );
}
