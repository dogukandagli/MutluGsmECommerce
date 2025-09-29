import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import type { IProduct } from "../../../features/products/types/IProduct";
import { apiUrl } from "../../../shared/lib/apiClient";

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
        sx={{
          borderRadius: 3,
          p: 2,
          width: "100%",
          boxShadow: "0 0 16px rgba(26, 27, 27, 0.15)",
        }}
      >
        {/* Ürün görseli */}
        <CardMedia
          component="img"
          height="192"
          image={`${apiUrl}images/${product.mainImageUrl}`}
          alt="iPhone 17 Pro"
          sx={{ borderRadius: 2, objectFit: "contain" }}
        />

        <CardContent>
          {/* Badge */}
          <Chip label="Öne Çıkan" color="success" size="small" sx={{ mb: 2 }} />

          {/* Başlık */}
          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            {product.name}
          </Typography>

          {/* Açıklama */}

          {/* Fiyat */}
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", color: "text.primary" }}
          >
            {product.price}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
