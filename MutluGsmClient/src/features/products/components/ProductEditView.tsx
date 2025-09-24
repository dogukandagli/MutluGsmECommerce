// ProductEditView.tsx
import {
  Box,
  Container,
  Card,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Divider,
  Stack,
  Button,
  Switch,
  FormControlLabel,
  Avatar,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Save from "@mui/icons-material/Save";
import Grid from "@mui/material/Grid";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { useParams } from "react-router";
import { z } from "zod";
import { selectProductById, updateProduct } from "../store/productSlice";
import type { ICategorySelect } from "../types/ICategorySelect";
import type { IBrandSelect } from "../types/IBrandSelect";
import { useEffect, useState } from "react";
import Category from "../../category/api/categoryApi";
import Brand from "../../brands/api/brandApi";
import { Controller, useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";

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
  condition: z.number().int(),
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
  const [files, setFiles] = useState<(File | null)[]>([]);
  const [mainfoto, setmainfoto] = useState(true);
  const [fileloaded, setfileloaded] = useState(false);

  useEffect(() => {
    Category.get("id,name").then((data) => {
      setCategories(data.value as ICategorySelect[]);
    });
    Brand.get("id,name").then((data) => {
      setBrands(data.value as IBrandSelect[]);
    });
    (async () => {
      const urls = [product.mainImageUrl, ...(product.imageUrl ?? [])];
      const files = await Promise.all(urls.map(filenameToFile));
      setFiles(files);
      setfileloaded(true);
    })();
  }, [id]);
  const isNew = !product?.id;

  const { control, handleSubmit } = useForm<FromValues>({
    resolver: zodResolver(Schema),
    mode: "onChange",
    defaultValues: {
      name: product?.name,
      quantity: product?.quantity,
      price: product?.price,
      originalPrice: product?.originalPrice ?? undefined,
      condition: product?.condition,
      category: product?.categoryId,
      brand: product?.brandId ?? undefined,
      description: product?.description ?? undefined, // burada null olabilir
      featured: product?.featured ?? false,
      active: product?.isActive,
    },
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: true,
    onDrop: (acceptedFiles) => {
      if (!mainfoto) {
        setFiles((prev) => {
          const [first, ...rest] = acceptedFiles;
          const next = [...prev];
          next[0] = first;
          return [...next, ...rest];
        });
        setmainfoto(true);
      } else {
        setFiles((prev) => [...prev, ...acceptedFiles]);
      }
    },
  });

  async function filenameToFile(filename: string): Promise<File> {
    const url = "https://localhost:7261/images/" + filename;
    const res = await fetch(url, { cache: "no-store" });
    const blob = await res.blob();
    return new File([blob], filename, { type: blob.type });
  }

  const handleMainRemove = () => {
    setFiles((prev) => {
      const next = [...prev];
      next[0] = null;
      return next;
    });
    setmainfoto(false);
  };

  const handleDeleteImage = (index: number) => {
    setFiles((prev) => {
      const next = prev.filter((_, i) => i !== index);
      return next;
    });
  };

  let mainSrc: string | null = null;

  if (fileloaded) {
    // kullanıcı dosya seçti
    mainSrc = files[0] ? URL.createObjectURL(files[0]!) : null;
  } else {
    // backend'deki görsel
    mainSrc = product.mainImageUrl
      ? `https://localhost:7261/images/${product.mainImageUrl}`
      : null;
  }

  let extraImages: string[] = [];

  if (fileloaded) {
    if (files.length > 1) {
      extraImages = files.slice(1).map((file) => URL.createObjectURL(file!));
    } else {
      extraImages = [];
    }
  } else {
    if (product.imageUrl) {
      extraImages = product.imageUrl.map(
        (imageUrl) => `https://localhost:7261/images/${imageUrl}`
      );
    } else {
      extraImages = [];
    }
  }

  async function submitForm(data: FieldValues) {
    const formData = new FormData();
    if (data.brand) formData.append("BrandId", String(data.brand));
    formData.append("CategoryId", String(data.category));
    formData.append("Condition", String(data.condition));
    if (data.description) formData.append("Description", data.description);
    formData.append("featured", data.featured);
    if (files) {
      files.forEach((f) => formData.append("File", f!));
    }
    formData.append("Id", product.id);
    formData.append("isActive", data.active);
    formData.append("Name", data.name);
    if (data.originalPrice)
      formData.append(
        "OriginalPrice",
        String(data.originalPrice).replace(",", ".")
      );
    formData.append("Price", String(data.price).replace(",", "."));
    formData.append("Quantity", String(data.quantity));

    dispatch(updateProduct(formData));
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Box
        sx={{
          bgcolor: (t) => t.palette.grey[50],
          minHeight: "100vh",
          width: "100%",
          py: 3,
        }}
      >
        <Container>
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
              type="submit"
              sx={{
                borderRadius: 2,
                px: 3,
                background: "linear-gradient(180deg, #2c2c2c 0%, #1e1e1e 100%)",
                ":hover": {
                  background:
                    "linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 100%)",
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
                      aspectRatio: "1 / 1",
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",

                      "&:hover .img": { transform: "translateY(-40px)" },
                      "&:hover .actions": {
                        opacity: 1,
                        mt: 1,
                        transform: "translateY(-30px)",
                      },
                    }}
                  >
                    {mainSrc ? (
                      <>
                        <Box
                          className="img"
                          component="img"
                          src={mainSrc}
                          alt={product.name}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform .25s ease",
                          }}
                        />
                        <Box
                          className="actions"
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            maxHeight: 0,
                            opacity: 0,
                            transition: "all .25s ease",
                          }}
                        >
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={handleMainRemove}
                          >
                            Sil
                          </Button>
                        </Box>
                      </>
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
                  <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                    {extraImages ? (
                      extraImages.map((src, index) => (
                        <Box
                          key={index + 1}
                          sx={{
                            position: "relative",
                            width: 120,
                            height: 120,
                          }}
                        >
                          <Avatar
                            src={src}
                            variant="rounded"
                            sx={{
                              width: "100%",
                              height: "100%",
                              boxShadow: 2,
                              borderRadius: 2,
                            }}
                          />
                          <IconButton
                            size="small"
                            sx={{
                              position: "absolute",
                              top: 4,
                              left: 4,
                              backgroundColor: "rgba(255,255,255,0.7)",
                              "&:hover": {
                                backgroundColor: "rgba(255,255,255,0.9)",
                              },
                            }}
                            onClick={() => handleDeleteImage(index + 1)}
                          >
                            <DeleteIcon fontSize="small" color="error" />
                          </IconButton>
                        </Box>
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Ekstra fotograf yok
                      </Typography>
                    )}
                  </Stack>
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
                      <Stack spacing={2}>
                        <Controller
                          name="condition"
                          control={control}
                          render={({ field, fieldState }) => (
                            <TextField
                              {...field}
                              select
                              label="Durum"
                              fullWidth
                              error={!!fieldState.error}
                              helperText={fieldState.error?.message}
                            >
                              <MenuItem key={0} value={0}>
                                Yeni
                              </MenuItem>
                              <MenuItem key={1} value={1}>
                                İkinci El
                              </MenuItem>
                            </TextField>
                          )}
                        />
                      </Stack>
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
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Alt bilgi */}
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ mt: 2 }}
              >
                <Typography variant="caption" color="text.secondary">
                  Created:{" "}
                  {new Date(product.createdDate).toLocaleString("tr-TR")}
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
    </form>
  );
}
