import {
  Checkbox,
  FormControlLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Grid, Stack } from "@mui/system";
import { Controller, useFormContext } from "react-hook-form";

type FormValues = {
  price: number;
  originalPrice?: number;
  featured: boolean;
  condition: 0 | 1;
  quantity: number;
};

export default function StepPrice() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <Box>
      <Typography variant="h6" fontWeight={700} mb={2}>
        Ürün Bilgisi
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={2}>
            <TextField
              {...register("price", {
                valueAsNumber: true,
                required: "Fiyat girmelisiniz.",
                min: {
                  value: 0.01,
                  message: "Fiyat 0'dan büyük olmalı.",
                },
              })}
              fullWidth
              label="Fiyat"
              type="number"
              required
              placeholder="Fiyat giriniz"
              error={!!errors.price}
              helperText={
                typeof errors.price?.message === "string"
                  ? errors.price.message
                  : undefined
              }
              inputProps={{ step: "0.01" }}
            />
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={2}>
            <TextField
              {...register("originalPrice", {
                valueAsNumber: true,
                min: {
                  value: 0.01,
                  message: "Fiyat 0'dan büyük olmalı.",
                },
              })}
              fullWidth
              label="İndirimli Fiyat"
              type="number"
              placeholder="İndirimli fiyat giriniz"
              error={!!errors.originalPrice}
              helperText={
                typeof errors.originalPrice?.message === "string"
                  ? errors.originalPrice.message
                  : undefined
              }
              inputProps={{ step: "0.01" }}
            />
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={2}>
            <Controller
              name="featured"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!!field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label="Öne Çıkan"
                />
              )}
            />
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={2}>
            <Controller
              name="condition"
              control={control}
              rules={{ required: "Durum seçmelisiniz." }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Durum"
                  select
                  required
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                >
                  <MenuItem value={0}>Yeni</MenuItem>
                  <MenuItem value={1}>İkinci El</MenuItem>
                </TextField>
              )}
            />
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={2}>
            <TextField
              {...register("quantity", {
                valueAsNumber: true,
                required: "Stok bilgisi girmelisiniz.",
                min: {
                  value: 1,
                  message: "En az 1 adet stok olabilir.",
                },
              })}
              required
              fullWidth
              label="Stok bilgisi"
              type="number"
              placeholder="Stok bilgisi giriniz"
              error={!!errors.quantity}
              helperText={
                typeof errors.quantity?.message === "string"
                  ? errors.quantity.message
                  : undefined
              }
              inputProps={{ step: "1", min: 1 }}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
