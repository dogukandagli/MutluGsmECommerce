import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import type { IProduct } from "../../../features/products/types/IProduct";
import { apiUrl } from "../../../shared/lib/apiClient";
import { NavLink } from "react-router";

type ProductProps = {
  product: IProduct;
};

export default function HomeProductCard({ product }: ProductProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        height: "390px",
        width: "288px",
        mx: 1.5,
        bgcolor: "background.default",
      }}
    >
      <Card
        component={NavLink}
        to={product.id}
        sx={{
          borderRadius: 3,
          p: 2,
          width: "100%",
          boxShadow: "0 0 10px rgba(26, 27, 27, 0.15)",
          textDecoration: "none",
        }}
      >
        <CardMedia
          component="img"
          height="192"
          image={`${apiUrl}images/${product.mainImageUrl}`}
          alt="iPhone 17 Pro"
          sx={{ borderRadius: 2, objectFit: "contain" }}
        />

        <CardContent>
          <Typography color="primary" fontSize="17px">
            {product.featured == true ? "Öne Çıkan" : "Yeni"}
          </Typography>
          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: "bold", mb: 1 }}
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
                sx={{ fontWeight: "bold", color: "error.main" }}
              >
                {product.price.toLocaleString("tr-TR")} ₺
              </Typography>
            </Box>
          ) : (
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", color: "warning.main" }}
            >
              {product.price.toLocaleString("tr-TR")} ₺
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
