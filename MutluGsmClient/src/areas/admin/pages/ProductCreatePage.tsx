import { Container } from "@mui/material";
import ProductCreateStepper from "../../../features/products/components/ProductCreateStepper";

export default function ProductCreatePage() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <ProductCreateStepper
        onStepChange={(i) => console.log("step ->", i)}
        renderStep={(i) => {
          switch (i) {
            case 0:
              return <>/* Product Info form alanların buraya */</>;
            case 1:
              return <>/* Media upload alanların buraya */</>;
            case 2:
              return <>/* Social/SEO alanların buraya */</>;
            case 3:
              return <>/* Pricing alanların buraya */</>;
            default:
              return null;
          }
        }}
      />
    </Container>
  );
}
