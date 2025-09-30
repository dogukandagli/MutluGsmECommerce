import * as React from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  Chip,
  Stack,
  Typography,
  Divider,
  ImageList,
  ImageListItem,
  Paper,
} from "@mui/material";
import { useParams } from "react-router";
import { useAppSelector } from "../../../app/store/hooks";
import { selectProductById } from "../../../features/products/store/productSlice";
import { apiUrl } from "../../../shared/lib/apiClient";

export default function ProductDetailPage() {
  const { productId } = useParams();

  const product = useAppSelector((state) =>
    selectProductById(state, productId!)
  );

  const [active, setActive] = React.useState(0);

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
      <Grid container spacing={3}>
        {/* Sol: Görseller */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={2}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <CardMedia
                component="img"
                image={`${apiUrl}images/${product.mainImageUrl}`}
                alt="iPhone 17 Pro Max"
                sx={{
                  height: { xs: 320, sm: 420, md: 520 },
                  objectFit: "cover",
                }}
              />
            </Card>

            <ImageList cols={4} gap={12} sx={{ m: 0 }}>
              {product.imageUrl.map((src, idx) => (
                <ImageListItem key={src} sx={{ cursor: "pointer" }}>
                  <Box
                    onClick={() => setActive(idx)}
                    sx={{
                      borderRadius: 1,
                      overflow: "hidden",
                      border: (theme) =>
                        idx === active
                          ? `2px solid ${theme.palette.primary.main}`
                          : `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    <img
                      src={`${apiUrl}images/${src}`}
                      alt={`Galeri ${idx + 1}`}
                      style={{
                        width: "100%",
                        height: 96,
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </Box>
                </ImageListItem>
              ))}
            </ImageList>
          </Stack>
        </Grid>

        {/* Sağ: Bilgiler */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Chip label="Yeni" color="warning" size="small" />
                <Chip label="%15 İndirim" color="error" size="small" />
              </Stack>

              <Typography
                variant="h3"
                sx={{ fontWeight: 700, letterSpacing: "-0.02em" }}
              >
                {product.name}
              </Typography>
            </Stack>

            <Stack spacing={0.5}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ textDecoration: "line-through" }}
                >
                  {product.originalPrice}
                </Typography>
                <Chip label="%15 İndirim" color="error" size="small" />
              </Stack>

              <Typography
                sx={{
                  fontFamily:
                    "Inter, system-ui, -apple-system, Segoe UI, Roboto",
                  fontSize: 32,
                  fontWeight: 700,
                  lineHeight: "36px",
                  letterSpacing: "-0.035em",
                }}
              >
                {product.price}
              </Typography>
            </Stack>

            <Divider />

            <Typography variant="h5" fontWeight={700}>
              Öne Çıkan Özellikler
            </Typography>

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
