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
  Avatar,
  IconButton,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Save from "@mui/icons-material/Save";
import Grid from "@mui/material/Grid";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { useNavigate, useParams } from "react-router";
import { selectProductById, updateProduct } from "../store/productSlice";
import type { IBrandSelect } from "../types/IBrandSelect";
import { useEffect, useState } from "react";
import Brand from "../../brands/api/brandApi";
import { Controller, useForm, type FieldValues } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { LoadingButton } from "@mui/lab";
import { selectAllCategory } from "../../category/store/categorySlice";

export default function ProductEditView() {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = useAppSelector((state) => selectProductById(state, id!));
  const { status } = useAppSelector((state) => state.product);

  const [brands, setBrands] = useState<IBrandSelect[]>([]);
  const [files, setFiles] = useState<(File | null)[]>([]);
  const [mainfoto, setmainfoto] = useState(true);
  const [fileloaded, setfileloaded] = useState(false);

  const categories = useAppSelector((state) => selectAllCategory(state));

  useEffect(() => {
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

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: product?.name,
      quantity: product?.quantity,
      price: product?.price,
      originalPrice: product?.originalPrice ?? undefined,

      category: product?.categoryId,

      brand: String(product?.brandId ?? ""),

      condition: String(product?.condition),
      featured: String(product?.featured),
      active: String(product?.isActive),

      description: product?.description ?? undefined,
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
      files.forEach((f) => formData.append("Files", f!));
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

    dispatch(updateProduct(formData)).then((action) => {
      if (updateProduct.fulfilled.match(action)) {
        navigate("/admin/products");
      }
    });
    navigate("/admin/products");
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
                {isNew ? "Yeni Ürün" : "Aşağıdaki değişiklikleri yapın"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ürün bilgilerini düzenleyin ve kaydedin.
              </Typography>
            </Box>
            <LoadingButton
              loading={status === "pendingUpdateProduct"}
              loadingPosition="start"
              loadingIndicator={
                <CircularProgress size={16} thickness={5} sx={{ mr: 1 }} />
              }
              startIcon={<Save />}
              variant="contained"
              disableElevation
              type="submit"
              sx={{
                borderRadius: 2,
                px: 3,
                minWidth: 140,
                height: 40,
                textTransform: "none",
                background: "linear-gradient(180deg, #2c2c2c 0%, #1e1e1e 100%)",
                color: "#fff",
                boxShadow: "0 3px 10px rgba(0,0,0,.25)",
                "&:hover": {
                  background:
                    "linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 100%)",
                },
                "&.Mui-disabled": {
                  opacity: 0.9,
                  color: "#fff",
                },
              }}
            >
              {status === "pendingUpdateProduct" ? "Kaydediliyor…" : "Kaydet"}
            </LoadingButton>
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
                    Ürün Fotoğrafı
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
                <CardHeader title="Ürün Bilgisi" sx={{ pb: 0 }} />
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        {...register("name", {
                          required: "Ürün ismi girmelisiniz.",
                          minLength: {
                            value: 1,
                            message: "Ürün ismi girmelisiniz.",
                          },
                        })}
                        fullWidth
                        label="Ürün İsmi"
                        type="text"
                        required
                        error={!!errors.name}
                        helperText={errors.name?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        {...register("quantity", {
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
                        helperText={errors.quantity?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <TextField
                        {...register("description")}
                        fullWidth
                        label="Açıklama"
                        type="text"
                        error={!!errors.description}
                        helperText={errors.description?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <Stack spacing={2}>
                        <Controller
                          name="category"
                          control={control}
                          rules={{ required: "Kategori seçmelisiniz" }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              label="Kategori"
                              select
                              required
                              error={!!errors.category}
                              helperText={errors.category?.message}
                            >
                              {categories.map((c) => (
                                <MenuItem key={c.id} value={String(c.id)}>
                                  {c.name}
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
                          render={({ field }) => (
                            <TextField
                              {...field}
                              fullWidth
                              label="Marka"
                              select
                            >
                              <MenuItem value="">{/* boş */}</MenuItem>
                              {brands.map((b) => (
                                <MenuItem key={b.id} value={String(b.id)}>
                                  {b.name}
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
                              <MenuItem value="0">Yeni</MenuItem>
                              <MenuItem value="1">İkinci El</MenuItem>
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
                          rules={{ required: "Öne çıkan bilgisi gerekli." }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Öne Çıkan"
                              select
                              required
                              fullWidth
                            >
                              <MenuItem value="true">Evet</MenuItem>
                              <MenuItem value="false">Hayır</MenuItem>
                            </TextField>
                          )}
                        />
                      </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                      <Stack spacing={2}>
                        <Controller
                          name="active"
                          control={control}
                          rules={{ required: "Aktiflik gerekli." }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              label="Aktif"
                              select
                              required
                              fullWidth
                            >
                              <MenuItem value="true">Evet</MenuItem>
                              <MenuItem value="false">Hayır</MenuItem>
                            </TextField>
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
                <CardHeader title="Fiyatlama" sx={{ pb: 0 }} />
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        {...register("price", {
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
                        helperText={errors.price?.message}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        {...register("originalPrice", {
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
                        helperText={errors.originalPrice?.message}
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
                  Oluşturuldu:{" "}
                  {new Date(product.createdDate).toLocaleString("tr-TR")}
                </Typography>
                {product.updatedDate && (
                  <Typography variant="caption" color="text.secondary">
                    Değiştirildi:{" "}
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
