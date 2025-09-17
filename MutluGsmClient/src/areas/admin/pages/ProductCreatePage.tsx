import { Container, TextField, Typography } from "@mui/material";
import ProductCreateStepper from "../../../features/products/components/ProductCreateStepper";
import Grid from "@mui/material/Grid";
import { Box, Stack } from "@mui/system";
import { useForm } from "react-hook-form";

export default function ProductCreatePage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: {
      name,
    },
  });
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <ProductCreateStepper
        onStepChange={(i) => console.log("step ->", i)}
        renderStep={(i) => {
          switch (i) {
            case 0:
              return (
                <>
                  <Box>
                    <Typography variant="h6" fontWeight={700} mb={2}>
                      Ürün Bilgisi
                    </Typography>

                    <Grid container spacing={3}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Stack spacing={2}>
                          <TextField
                            {...register("name")}
                            label="name"
                            variant="standard"
                            fullWidth
                            autoFocus
                            required
                          ></TextField>
                        </Stack>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}></Grid>
                    </Grid>
                  </Box>
                </>
              );
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
