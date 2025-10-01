import { MenuItem, TextField, Typography } from "@mui/material";
import { Box, Grid, Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Category from "../../../../category/api/categoryApi";
import type { ICategorySelect } from "../../../types/ICategorySelect";
import Brand from "../../../../brands/api/brandApi";
import type { IBrandSelect } from "../../../types/IBrandSelect";
import SunEditor from "suneditor-react";
import "../../../../../../node_modules/suneditor/dist/css/suneditor.min.css";

export default function StepInformation() {
  const { control } = useFormContext();
  const [categories, setCategories] = useState<ICategorySelect[]>([]);
  const [brands, setBrands] = useState<IBrandSelect[]>([]);

  useEffect(() => {
    Category.get("id,name").then((data) => {
      setCategories(data.value as ICategorySelect[]);
    });
    Brand.get("id,name").then((data) => {
      setBrands(data.value as IBrandSelect[]);
    });
  }, []);

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
                    {categories.map((option) => (
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
                    {brands.map((option) => (
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
