import { MenuItem, TextField, Typography } from "@mui/material";
import { Box, Grid, Stack } from "@mui/system";
import { Controller, useFormContext } from "react-hook-form";
import SunEditor from "suneditor-react";
import "../../../../../../node_modules/suneditor/dist/css/suneditor.min.css";
import { useAppSelector } from "../../../../../app/store/hooks";

export default function StepInformation() {
  const { control } = useFormContext();

  const { categories } = useAppSelector((state) => state.category);
  const { brands } = useAppSelector((state) => state.brand);

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
                rules={{ required: "Ürün ismi girmelisiniz." }}
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
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2}>
              <Controller
                name="category"
                control={control}
                rules={{ required: "Kategori seçmelisiniz" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    select
                    label="Kategori"
                    variant="standard"
                    fullWidth
                    required
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  >
                    {categories &&
                      categories.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                  </TextField>
                )}
              />
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2}>
              <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({ field: { value, onChange }, fieldState }) => (
                  <>
                    <SunEditor
                      setContents={value || ""}
                      onChange={onChange}
                      setOptions={{
                        height: "300px",
                        buttonList: [
                          ["bold", "italic", "underline", "strike"],
                          ["subscript", "superscript"],
                          ["paragraphStyle", "formatBlock", "font", "fontSize"],
                          ["align", "outdent", "indent", "list"],
                          ["blockquote", "link", "image"],
                          ["undo", "redo", "removeFormat", "fullScreen"],
                        ],
                      }}
                    />
                    {fieldState.error && (
                      <div style={{ color: "#d32f2f" }}>
                        {fieldState.error.message}
                      </div>
                    )}
                  </>
                )}
              />
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2}>
              <Controller
                name="brand"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    select
                    label="Marka"
                    variant="standard"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  >
                    {brands &&
                      brands.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                  </TextField>
                )}
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
