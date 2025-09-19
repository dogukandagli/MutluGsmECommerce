import {
  Checkbox,
  FormControlLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Grid, Stack } from "@mui/system";
import { Controller, useFormContext } from "react-hook-form";

export default function StepPrice() {
  const { control } = useFormContext();

  return (
    <Box>
      <Typography variant="h6" fontWeight={700} mb={2}>
        Ürün Bilgisi
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={2}>
            <Controller
              control={control}
              name="originalPrice"
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Fiyat"
                  variant="outlined"
                  fullWidth
                  required
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={2}>
            <Controller
              control={control}
              name="price"
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  type="number"
                  label="İndirimli Fiyat"
                  variant="outlined"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
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
                      checked={field.value}
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
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  select
                  label="Durum"
                  variant="standard"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                >
                  <MenuItem key={0} value={0}>
                    Sıfır
                  </MenuItem>
                  <MenuItem key={1} value={1}>
                    İkinci El
                  </MenuItem>
                </TextField>
              )}
            />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={2}>
            <Controller
              control={control}
              name="quantity"
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Stok bilgisi"
                  variant="outlined"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
