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
} from "@mui/material";
import { useParams } from "react-router";
import { useAppSelector } from "../../../app/store/hooks";
import { selectProductById } from "../../../features/products/store/productSlice";
import { apiUrl } from "../../../shared/lib/apiClient";
import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Keyboard, A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";

export default function ProductDetailMock() {
  const { productId } = useParams();

  const product = useAppSelector((state) =>
    selectProductById(state, productId!)
  );
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // Görsel kaynakları: main + gallery'den tek diziye
  const images: string[] = useMemo(() => {
    const list = [
      product?.mainImageUrl
        ? `${apiUrl}images/${product.mainImageUrl}`
        : undefined,
      ...(product?.imageUrl ?? []).map((p) => `${apiUrl}images/${p}`),
    ].filter(Boolean) as string[];
    // tekrar varsa temizle
    return Array.from(new Set(list));
  }, [product, apiUrl]);

  // Lightbox slides formatı
  const slides = images.map((src) => ({ src }));

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
          <Stack
            spacing={2}
            sx={{ display: { xs: "inline-block", md: "none" } }}
          >
            <Swiper
              modules={[Pagination, Navigation, Keyboard, A11y]}
              slidesPerView={1}
              spaceBetween={0}
              pagination={{ clickable: true }}
              navigation
              keyboard={{ enabled: true }}
              onInit={() => setIndex(0)} // ilk görünen: images[1]
              onSlideChange={(s) => setIndex(s.activeIndex)} // slice(1) nedeniyle +1
              style={{ paddingBottom: 24 }} // bullet alanı
            >
              {images.map((src, i) => {
                const originalIndex = i + 1; // orijinal dizideki index (images[originalIndex])
                return (
                  <SwiperSlide key={`mob-${originalIndex}-${src}`}>
                    <div
                      style={{
                        width: "100%",
                        aspectRatio: "1/1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#fff",
                      }}
                    >
                      <img
                        src={src}
                        alt={`Galeri ${i + 1}`}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                          display: "block",
                        }}
                        onClick={() => {
                          setOpen(true); // mobilde görsel tıklayınca lightbox aç
                        }}
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
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
                Sadece <b>{product.quantity}</b> kaldı
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

            <Typography variant="body1" color="text.secondary">
              {product.description}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}
