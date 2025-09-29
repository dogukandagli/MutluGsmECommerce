import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import { Box, Button, Typography } from "@mui/material";

export default function EmptyProduct() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "60vh",
        textAlign: "center",
        gap: 2,
      }}
    >
      <SearchOffOutlinedIcon sx={{ fontSize: 64, color: "text.secondary" }} />
      <Typography variant="h5" fontWeight="bold">
        Ürün bulunamadı
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Farklı filtreler veya kategori deneyebilirsiniz.
      </Typography>
      <Button variant="contained" sx={{ mt: 2 }}>
        Alışverişe Dön
      </Button>
    </Box>
  );
}
