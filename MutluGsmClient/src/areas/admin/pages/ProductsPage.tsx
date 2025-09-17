import Container from "@mui/material/Container";
import ProductsDataGrid from "../../../features/products/components/ProductsDatagrid";

export default function ProductsPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <ProductsDataGrid />
    </Container>
  );
}
