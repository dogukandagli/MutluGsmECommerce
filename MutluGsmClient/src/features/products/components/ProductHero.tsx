import { Box, Container, Grid, Stack, Typography, Button } from "@mui/material";
import type { IProduct } from "../types/IProduct";
import { apiUrl } from "../../../shared/lib/apiClient";
import { NavLink } from "react-router";

type ProductHeroProps = {
  product: IProduct;
};

export default function ProductHero({ product }: ProductHeroProps) {
  const createdDate = new Date(product.createdDate);
  const now = new Date();
  const diffMs = now.getTime() - createdDate.getTime();

  const diffDays = Math.floor(diffMs) / (1000 * 60 * 60 * 24);

  if (diffDays < 15)
    return (
      <Box
        component="section"
        sx={{
          borderTop: "1px solid rgba(0,0,0,0.12)",
          borderBottom: "1px solid rgba(0,0,0,0.12)",
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={{ xs: 3, md: 6 }}
            alignItems="center"
            direction={{
              xs: "column",
              md: false ? "row-reverse" : "row",
            }}
          >
            <Grid size={{ xs: 12, md: 5 }} sx={{ order: { xs: 1, md: 2 } }}>
              <Box
                sx={{
                  mx: { xs: "auto", md: 0 },
                  width: { xs: 220, sm: 260, md: 340 },
                  height: { xs: 220, sm: 260, md: 340 },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="img"
                  src={`${apiUrl}images/${product.mainImageUrl}`}
                  alt={product.name}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    pt: { xs: 3, md: 0 },
                  }}
                />
              </Box>
            </Grid>

            <Grid
              size={{ xs: 12, md: 7 }}
              sx={{ order: { xs: 2, md: 1 }, p: { xs: 4, md: 0 } }}
            >
              <Stack
                spacing={1}
                alignItems={{ xs: "center", md: "flex-start" }}
                textAlign={{ xs: "center", md: "left" }}
              >
                <Box display="flex" alignItems="center" gap={4}>
                  {diffDays < 10 && (
                    <Typography color="primary" fontSize="17px">
                      Yeni
                    </Typography>
                  )}
                  {product.featured && (
                    <Typography color="secondary" fontSize="17px">
                      Öne Çıkan
                    </Typography>
                  )}
                </Box>

                <Typography
                  variant="h3"
                  component="h1"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                    fontSize: { xs: 28, sm: 34, md: 40 },
                  }}
                >
                  {product.name}
                </Typography>

                {product.originalPrice ? (
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography
                      variant="body2"
                      sx={{
                        textDecoration: "line-through",
                        color: "text.secondary",
                      }}
                    >
                      {product.originalPrice.toLocaleString("tr-TR")} ₺
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "bold",
                        color: "error.main",
                      }}
                    >
                      {product.price.toLocaleString("tr-TR")} ₺
                    </Typography>
                  </Box>
                ) : (
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 800, color: "warning.main" }}
                  >
                    {product.price.toLocaleString("tr-TR")} ₺
                  </Typography>
                )}
                <Button
                  component={NavLink}
                  to={`/product/${product.id}`}
                  variant="outlined"
                  size="large"
                  sx={{
                    borderRadius: 999,
                    px: 3,
                    textTransform: "none",
                    fontWeight: 600,
                    alignSelf: { xs: "center", md: "flex-start" },
                  }}
                >
                  Ürünü görüntüleyin
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
}
