import { Container, TextField, Typography } from "@mui/material";
import ProductCreateStepper from "../../../features/products/components/ProductCreateStepper";
import Grid from "@mui/material/Grid";
import { Box, Stack } from "@mui/system";
import { z } from "zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Schema = z.object({
  name: z.string().min(1, "Ürün adı zorunlu"),
});
type FromValues = z.infer<typeof Schema>;

export default function ProductCreatePage() {
  const methods = useForm<FromValues>({
    resolver: zodResolver(Schema),
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  const { control } = methods;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <FormProvider {...methods}>
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
                            <Controller
                              name="name"
                              control={control}
                              render={({ field, fieldState }) => (
                                <TextField
                                  {...field}
                                  label="Ürün Adı"
                                  variant="standard"
                                  fullWidth
                                  autoFocus
                                  required
                                  error={!!fieldState.error}
                                  helperText={fieldState.error?.message}
                                />
                              )}
                            />
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
      </FormProvider>
    </Container>
  );
}
