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
      }}
    >
      <Box
        sx={{
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          height: 192,
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
          loading="lazy"
          sx={{ objectFit: "contain", height: "100%", width: "100%" }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, pt: 0 }}>
        <Stack spacing={0.5} alignItems="center" textAlign="center">
          <Typography variant="h6" component="h3">
            {product.name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textDecoration: "line-through", mt: 0.5 }}
          >
            {product.price}
          </Typography>

          <Typography variant="h6" component="p"></Typography>
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
          variant="contained"
          size="medium"
          sx={{
            borderRadius: 999,
            width: "60%",
          }}
        >
          Sepete ekle
        </Button>
      </CardActions>
    </Card>
  );
}
