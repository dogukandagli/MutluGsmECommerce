import {
  Box,
  Paper,
  Stack,
  Typography,
  Divider,
  ImageList,
  ImageListItem,
  Card,
  CardMedia,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import {
  getProduct,
  selectProductById,
} from "../../../features/products/store/productSlice";
import { apiUrl } from "../../../shared/lib/apiClient";
import { useEffect, useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import ProductDescription from "../../../shared/components/ProductDescription";
import NewestOrFeatured from "../components/NewestOrFeatured";
import WhatsAppButton from "../components/WhatsAppButton";

export default function ProductDetailMock() {
  const dispatch = useAppDispatch();
  const { productId } = useParams();

  const product = useAppSelector((state) =>
    selectProductById(state, productId!)
  );
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!product && productId) {
      dispatch(getProduct(productId));
    }
  }, [dispatch, productId]);

  const images: string[] = useMemo(() => {
    const list = [
      product?.mainImageUrl
        ? `${apiUrl}images/${product.mainImageUrl}`
        : undefined,
      ...(product?.imageUrl ?? []).map((p) => `${apiUrl}images/${p}`),
    ].filter(Boolean) as string[];
    return Array.from(new Set(list));
  }, [product, apiUrl]);

  const slides = images.map((src) => ({ src }));

  const message =
    `Merhabalar, Sipariş vermek istiyorum\n\n` +
    `${product?.name}\n` +
    `Adet Fiyatı: ${product?.price} ₺\n` +
    `Bağlantı: localhost:3000/${productId} \n` +
    `Teşekkürler ( Verilen Fiyatlar adet fiyatıdır )`;

  if (!product) return <CircularProgress />;

  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: 1280,
        mx: "auto",
        p: { xs: 2, sm: 3, md: 4 },
        bgcolor: "background.default",
      }}
    >
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={2} sx={{ display: { xs: "block", md: "none" } }}>
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
              loop
              allowTouchMove={true}
              style={{
                width: "100%",
              }}
            >
              <Box>
                {images.map((src, i) => (
                  <SwiperSlide key={i}>
                    <img
                      src={src}
                      alt={`Slide ${i + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Box>
            </Swiper>
          </Stack>

          <Stack
            spacing={2}
            sx={{ display: { xs: "none", md: "inline-block" } }}
          >
            <Card
              elevation={0}
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <CardMedia
                component="img"
                image={images[0]}
                alt={product?.name ?? "Ürün görseli"}
                onClick={() => {
                  setIndex(0);
                  setOpen(true);
                }}
                sx={{
                  height: { xs: 360, sm: 480, md: 560 },
                  objectFit: "contain",
                  bgcolor: "background.paper",
                  cursor: "zoom-in",
                }}
              />
            </Card>

            {images.length > 1 && (
              <ImageList sx={{ m: 0 }}>
                {images.slice(1).map((src, i) => {
                  const originalIndex = i + 1; // orijinal dizideki index (images[originalIndex])
                  const idx1 = i + 1; // ekranda göstereceğimiz 1-based index

                  return (
                    <ImageListItem key={`${src}-${originalIndex}`}>
                      <Box
                        onClick={() => {
                          setIndex(originalIndex); // state orijinal 0-based index'e gider (1,2,3,...)
                          setOpen(true);
                        }}
                        sx={{
                          cursor: "pointer",
                          borderRadius: 1,
                          overflow: "hidden",
                          p: 0.5,
                        }}
                      >
                        <img
                          src={src}
                          alt={`Galeri ${idx1}`} // 1'den başlayan alt yazı
                          style={{
                            width: "100%",
                            objectFit: "cover",
                            display: "block",
                            background: "#fff",
                          }}
                        />
                      </Box>
                    </ImageListItem>
                  );
                })}
              </ImageList>
            )}
          </Stack>

          {/* Lightbox */}
          <Lightbox
            open={open}
            close={() => setOpen(false)}
            index={index}
            slides={slides}
            carousel={{ finite: false }} // sonsuz döngü
            controller={{ closeOnBackdropClick: true }} // dışarı tıklayınca kapanır
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={3}>
            <Stack flexDirection="column" alignItems="start" spacing={0.5}>
              <Typography variant="h4" fontWeight={800}>
                {product.name}
              </Typography>

              <Typography color="success.main" variant="body2">
                Sadece <b>{product.quantity}</b> adet kaldı
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Marka: {product.brandName}
              </Typography>
              <Typography variant="body1" color="error">
                {product.condition == 1 ? "2.El Ürün" : "0 Ürün"}
              </Typography>
            </Stack>

            {/* Fiyat görünümü */}
            <Stack spacing={0.5}>
              <Stack direction="row" spacing={1} alignItems="center">
                <>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ textDecoration: "line-through" }}
                  >
                    {product.originalPrice} TL
                  </Typography>
                  <Typography
                    variant="body1"
                    color="success.main"
                    fontWeight={600}
                  >
                    -2%
                  </Typography>
                </>
              </Stack>

              <Typography
                sx={{
                  fontSize: 36,
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                {product.price} TL
              </Typography>
            </Stack>

            <Divider />
            <Stack direction="row">
              <WhatsAppButton phone={"905388726981"} message={message} />
            </Stack>

            <Typography variant="body1" color="text.secondary">
              {product.description && (
                <ProductDescription html={product.description} />
              )}
            </Typography>
          </Stack>
        </Grid>
        <Grid size={12}>
          <Typography variant="h5" sx={{ fontSize: { xs: 20, md: 30 }, my: 2 }}>
            İlginizi Çekebilicek Diğer Ürünler.
          </Typography>
          <NewestOrFeatured
            query={`?count=true&$top=7&$filter=categoryId eq ${product.categoryId} and featured eq true`}
            bool={false}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
