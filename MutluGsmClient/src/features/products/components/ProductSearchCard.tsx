import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import type { IProduct } from "../types/IProduct";
import { apiUrl } from "../../../shared/lib/apiClient";
import { NavLink } from "react-router";

type props = {
  product: IProduct;
};
export default function ProductSearchCard({ product }: props) {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        p: 2,
        width: "288px",
      }}
    >
      <Box
        sx={{
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          height: 233,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
          overflow: "hidden",
          bgcolor: "background.paper",
        }}
      >
        <CardMedia
          component="img"
          src={`${apiUrl}images/${product.mainImageUrl}`}
          alt={product.name}
          sx={{ objectFit: "contain", height: "100%", width: "100%" }}
        />
      </Box>

      <CardContent sx={{ pt: 1, height: "84px" }}>
        <Stack spacing={0.5} alignItems="center" textAlign="center">
          <Typography variant="h6" component="h3">
            {product.name}
          </Typography>
          {product.originalPrice && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: "line-through", mt: 0.5 }}
            >
              {product.originalPrice.toLocaleString("tr-TR")} ₺
            </Typography>
          )}
          <Typography variant="body1" color="text.primary" sx={{ mt: 0.5 }}>
            {product.price.toLocaleString("tr-TR")} ₺
          </Typography>
        </Stack>
      </CardContent>

      <CardActions
        sx={{
          pt: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          component={NavLink}
          to={`/${product.id}`}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          variant="contained"
          size="medium"
          sx={{
            borderRadius: 999,
            width: "60%",
            fontSize: 13,
          }}
        >
          Ürünü Görüntüle
        </Button>
      </CardActions>
    </Card>
  );
}
