import { Container } from "@mui/system";
import ProductCreateStepper from "../../../features/products/components/Create/ProductCreateStepper";

export default function ProductCreatePage() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <ProductCreateStepper />
    </Container>
  );
}
