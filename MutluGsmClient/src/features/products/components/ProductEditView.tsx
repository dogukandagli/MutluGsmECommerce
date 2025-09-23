// ProductEditView.tsx
import {
  Box,
  Container,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  Divider,
  Stack,
  Button,
  Switch,
  FormControlLabel,
  Chip,
  Avatar,
  IconButton,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Save from "@mui/icons-material/Save";
import Grid from "@mui/material/Grid";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { useParams } from "react-router";
import { z } from "zod";
import { selectProductById } from "../store/productSlice";
import type { ICategorySelect } from "../types/ICategorySelect";
import type { IBrandSelect } from "../types/IBrandSelect";
import { useEffect, useState } from "react";
import Category from "../../category/api/categoryApi";
import Brand from "../../brands/api/brandApi";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";

export interface IProduct {
  id: string;
  name: string;
  quantity: number;
  originalPrice: number | null;
  condition: number;
  categoryId: string;
  categoryName: string;
  brandId: string | null;
  brandName: string | null;
  description: string | null;
  featured: boolean;
  mainImageUrl: string;
  imageUrl: string[];
  createdDate: string;
  updatedDate: string | null;
  isDeleted: boolean;
  deletedDate: string | null;
  isActive: boolean;
}

const Schema = z.object({
  name: z.string().min(1, "Ürün adı zorunlu"),
  category: z.string().uuid("Geçerli kategori seçin"),
  description: z.string().optional(),
  brand: z.string().optional(),
  price: z
    .string()
    .trim()
    .transform((v) => Number(v))
    .refine((v) => !Number.isNaN(v), {
      message: "Geçerli bir sayı giriniz",
    })
    .refine((v) => v >= 1, {
      message: "Fiyat en az 1 olmalı",
    })
    .refine((v) => v <= 999999, {
      message: "Fiyat çok yüksek",
    }),
  originalPrice: z
    .string()
    .trim()
    .optional() // opsiyonel alan
    .transform((v) => (v === "" || v === undefined ? undefined : Number(v)))
    .refine((v) => v === undefined || !Number.isNaN(v), {
      message: "Geçerli bir sayı giriniz",
    })
    .refine((v) => v === undefined || v >= 1, {
      message: "Fiyat en az 1 olmalı",
    })
    .refine((v) => v === undefined || v <= 999999, {
      message: "Fiyat çok yüksek",
    }),
  featured: z.boolean(),
  condition: z.int({ message: "Lütfen Seçiniz" }),
  quantity: z
    .string()
    .trim()
    .transform((v) => (v === "" ? undefined : Number(v)))
    .refine((v) => v === undefined || !Number.isNaN(v), {
      message: "Geçerli bir sayı giriniz",
    })
    .refine((v) => v === undefined || v >= 1, {
      message: "Stok en az 1 olmalı",
    })
    .refine((v) => v === undefined || v <= 999999, {
      message: "Stok cok yuksek",
    }),
  active: z.boolean(),
});
type FromValues = z.infer<typeof Schema>;

export default function ProductEditView() {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const product = useAppSelector((state) => selectProductById(state, id!));

  const [categories, setCategories] = useState<ICategorySelect[]>([]);
  const [brands, setBrands] = useState<IBrandSelect[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    Category.get("id,name").then((data) => {
      setCategories(data.value as ICategorySelect[]);
    });
    Brand.get("id,name").then((data) => {
      setBrands(data.value as IBrandSelect[]);
    });
  }, []);
  const isNew = !product?.id;

  const onSaveClick = () => {
    console.log("islendi");
  };

  const { methods, control } = useForm<FromValues>({
    resolver: zodResolver(Schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      category: "",
      featured: false,
    },
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: true,
    onDrop: (acceptedFiles) => {
      setFiles((prev) => [...prev, ...acceptedFiles]);
    },
  });

  return (
    <Box sx={{ bgcolor: (t) => t.palette.grey[50], minHeight: "100vh", py: 3 }}>
      <Container maxWidth="lg">
        {/* Sayfa başlığı + Save */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 3 }}
        >
          <Box>
            <Typography variant="h5" fontWeight={700}>
              {isNew ? "Yeni Ürün" : "Make the changes below"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ürün bilgilerini düzenleyin ve kaydedin.
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={onSaveClick}
            sx={{
              borderRadius: 2,
              px: 3,
              background: "linear-gradient(180deg, #2c2c2c 0%, #1e1e1e 100%)",
              ":hover": {
                background: "linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 100%)",
              },
            }}
          >
            Save
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {/* Sol sütun – Ana Görsel */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    bgcolor: (t) => t.palette.grey[100],
                    aspectRatio: "1 / 1",
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {product.mainImageUrl ? (
                    <Box
                      component="img"
                      src={`https://localhost:7261/images/${product.mainImageUrl}`}
                      alt={product.name}
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Ana görsel yok
                    </Typography>
                  )}
                </Box>

                <Box>
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
                </Box>

                <Typography
                  variant="subtitle1"
                  sx={{ mt: 3, fontWeight: 700, textAlign: "center" }}
                >
                  Product Image
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: "center", mt: 0.5 }}
                >
                  Ürünün ana görselini ve ek görsellerini yönetin.
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Diğer Görseller
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {product.imageUrl?.length ? (
                    product.imageUrl.map((url) => (
                      <Avatar
                        key={url}
                        src={`https://localhost:7261/images/${url}`}
                        variant="rounded"
                        sx={{
                          width: 56,
                          height: 56,
                          boxShadow: 1,
                          borderRadius: 1,
                        }}
                      />
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Görsel yok
                    </Typography>
                  )}
                </Stack>
                <Button size="small" sx={{ mt: 1 }} startIcon={<PhotoCamera />}>
                  Görsel Ekle
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Sağ sütun – Form alanları */}
          <Grid size={{ xs: 12, md: 8 }}>
            {/* Product Information */}
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                mb: 3,
              }}
            >
              <CardHeader title="Product Information" sx={{ pb: 0 }} />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Controller
                      control={control}
                      name="name"
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          type="string"
                          label="Ürün adı"
                          fullWidth
                          required
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Controller
                      control={control}
                      name="quantity"
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          type="number"
                          label="Stok Bilgisi"
                          fullWidth
                          required
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Controller
                      control={control}
                      name="description"
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
                        name="brand"
                        control={control}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            select
                            label="Marka"
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

                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel id="condition-label">Condition</InputLabel>
                      <Select
                        labelId="condition-label"
                        label="Condition"
                        defaultValue={product.condition}
                      >
                        <MenuItem value={1}>Yeni</MenuItem>
                        <MenuItem value={2}>İkinci El</MenuItem>
                        <MenuItem value={0}>Belirtilmemiş</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={{ xs: 12, md: 3 }}>
                    <Stack spacing={2}>
                      <Controller
                        name="featured"
                        control={control}
                        render={({ field }) => (
                          <FormControlLabel
                            control={
                              <Switch
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
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Stack spacing={2}>
                      <Controller
                        name="active"
                        control={control}
                        render={({ field }) => (
                          <FormControlLabel
                            control={
                              <Switch
                                checked={field.value}
                                onChange={(e) =>
                                  field.onChange(e.target.checked)
                                }
                              />
                            }
                            label="Aktif"
                          />
                        )}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Pricing & Tags */}
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <CardHeader title="Pricing" sx={{ pb: 0 }} />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Controller
                      control={control}
                      name="price"
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          type="number"
                          label="Fiyat"
                          fullWidth
                          required
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Controller
                      control={control}
                      name="originalPrice"
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          type="number"
                          label="İndirimli Fiyat"
                          fullWidth
                          required
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </CardContent>

              <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={onSaveClick}
                >
                  Save
                </Button>
              </CardActions>
            </Card>

            {/* Alt bilgi */}
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mt: 2 }}
            >
              <Typography variant="caption" color="text.secondary">
                Created: {new Date(product.createdDate).toLocaleString("tr-TR")}
              </Typography>
              {product.updatedDate && (
                <Typography variant="caption" color="text.secondary">
                  Updated:{" "}
                  {new Date(product.updatedDate).toLocaleString("tr-TR")}
                </Typography>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
