import {
  Button,
  Checkbox,
  Chip,
  Container,
  FormControlLabel,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ProductCreateStepper from "../../../features/products/components/ProductCreateStepper";
import Grid from "@mui/material/Grid";
import { Box, Stack } from "@mui/system";
import { z } from "zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Category from "../../../features/category/api/categoryApi";
import { useEffect, useState } from "react";
import type { ICategorySelect } from "../../../features/products/types/ICategorySelect";
import Brand from "../../../features/brands/api/brandApi";
import type { IBrandSelect } from "../../../features/products/types/IBrandSelect";
import { useDropzone } from "react-dropzone";
import CloseIcon from "@mui/icons-material/Close";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

const Schema = z.object({
  name: z.string().min(1, "Ürün adı zorunlu"),
  category: z.string().uuid("Geçerli kategori seçin"),
  description: z.string().optional(),
  brand: z.string().optional(),
  originalPrice: z
    .string()
    .min(1, { message: "Original price 0'dan küçük olamaz" }),
  price: z.string().optional(),
  featured: z.boolean(),
  condition: z.int({ message: "Lütfen Seçiniz" }),
  quantity: z.string().min(1, { message: "Stok 0'dan küçük olamaz" }),
});
type FromValues = z.infer<typeof Schema>;

export default function ProductCreatePage() {
  const methods = useForm<FromValues>({
    resolver: zodResolver(Schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      category: "",
      originalPrice: "",
      featured: false,
    },
  });
  const [categories, setCategories] = useState<ICategorySelect[]>([]);
  const [brands, setBrands] = useState<IBrandSelect[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [mainIndex, setMainIndex] = useState<number>(files.length ? 0 : -1);

  useEffect(() => {
    Category.get("id,name").then((data) => {
      setCategories(data.value as ICategorySelect[]);
    });
    Brand.get("id,name").then((data) => {
      setBrands(data.value as IBrandSelect[]);
    });
  }, []);

  const { control } = methods;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: true,
    onDrop: (acceptedFiles) => {
      setFiles((prev) => [...prev, ...acceptedFiles]);
    },
  });

  const handleRemove = (index: number) => {
    setFiles((prev) => {
      const next = prev.filter((_, i) => i !== index);

      if (next.length === 0) {
        setMainIndex(-1);
      } else if (index === mainIndex) {
        setMainIndex(0);
      } else if (index < mainIndex) {
        setMainIndex((prevMain) => prevMain - 1);
      }
      return next;
    });
  };

  const handleSetMain = (index: number) => setMainIndex(index);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <FormProvider {...methods}>
        <ProductCreateStepper
          mainIndex={mainIndex}
          files={files}
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
                        <Grid size={{ xs: 12, md: 6 }}>
                          <Stack spacing={2}>
                            <Controller
                              name="category"
                              control={control}
                              rules={{ required: "Kategori seçmelisiniz" }} // validation örneği
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
                              render={({ field, fieldState }) => (
                                <TextField
                                  {...field}
                                  label="Açıklama"
                                  multiline
                                  rows={4}
                                  margin="normal"
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
              case 1:
                return (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Media
                    </Typography>

                    <Typography variant="subtitle2" gutterBottom>
                      Product Image
                    </Typography>

                    <Box
                      {...getRootProps()}
                      sx={{
                        border: "1px solid",
                        borderColor: "grey.400",
                        borderRadius: 1,
                        p: 2,
                        textAlign: "center",
                        cursor: "pointer",
                        bgcolor: isDragActive ? "grey.100" : "transparent",
                      }}
                    >
                      <input {...getInputProps()} />
                      <Typography color="textSecondary">
                        {isDragActive
                          ? "Bırak dosyayı yüklemek için"
                          : "Dosya yüklemek için tıkla"}
                      </Typography>
                    </Box>

                    {files.length > 0 && (
                      <Grid container spacing={2} mt={2}>
                        {files.map((file, index) => (
                          <Grid item xs={12} md={3} key={index}>
                            <Box
                              sx={{
                                position: "relative",
                                width: 120,
                                height: 120,
                                borderRadius: 2,
                                overflow: "hidden",
                                "&:hover .action-btn": { opacity: 1 },
                              }}
                            >
                              <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />

                              {/* Ana rozet */}
                              {index === mainIndex && (
                                <Chip
                                  label="Ana"
                                  size="small"
                                  color="primary"
                                  sx={{ position: "absolute", left: 6, top: 6 }}
                                />
                              )}

                              {/* Ana yap butonu */}
                              <Tooltip
                                title={
                                  index === mainIndex
                                    ? "Ana fotoğraf"
                                    : "Ana yap"
                                }
                              >
                                <IconButton
                                  size="small"
                                  onClick={() => handleSetMain(index)}
                                  className="action-btn"
                                  sx={{
                                    position: "absolute",
                                    top: 4,
                                    left: 4,
                                    bgcolor: "rgba(0,0,0,0.6)",
                                    color: "white",
                                    opacity: 0,
                                    transition: "opacity 0.3s",
                                    "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
                                  }}
                                >
                                  {index === mainIndex ? (
                                    <StarIcon fontSize="small" />
                                  ) : (
                                    <StarBorderIcon fontSize="small" />
                                  )}
                                </IconButton>
                              </Tooltip>

                              {/* Sil butonu */}
                              <Tooltip title="Sil">
                                <IconButton
                                  size="small"
                                  onClick={() => handleRemove(index)}
                                  className="action-btn"
                                  sx={{
                                    position: "absolute",
                                    top: 4,
                                    right: 4,
                                    bgcolor: "rgba(0,0,0,0.6)",
                                    color: "white",
                                    opacity: 0,
                                    transition: "opacity 0.3s",
                                    "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
                                  }}
                                >
                                  <CloseIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </Box>
                );
              case 2:
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
                                    onChange={(e) =>
                                      field.onChange(e.target.checked)
                                    }
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
              default:
                return null;
            }
          }}
        />
      </FormProvider>
    </Container>
  );
}

// {
//   "name": "",
//   "quantity": 1,
//   "price": 1,
//   "originalPrice": null,
//   "condition": 1,
//   "categoryId": "",
//   "brandId": null,
//   "description": null,
//   "featured": true
// }
