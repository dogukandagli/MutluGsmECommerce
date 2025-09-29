import { Box, Container } from "@mui/system";
import Slider from "../components/Slider";
import { Typography } from "@mui/material";
import NewestOrFeatured from "../components/NewestOrFeatured";

export default function HomePage() {
  return (
    <>
      <Slider />
      <Box
        sx={{
          borderTop: "1px solid rgba(0,0,0,0.12)",
          borderBottom: "1px solid rgba(0,0,0,0.12)",
          my: 3,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h5" sx={{ fontSize: { xs: 20, md: 30 }, my: 2 }}>
            Öne Çıkan Ürünleri Keşfet.
          </Typography>
          <NewestOrFeatured query={"$filter=featured eq true"} />
        </Container>
      </Box>
      <Box
        sx={{
          borderBottom: "1px solid rgba(0,0,0,0.12)",
          my: 3,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h5" sx={{ fontSize: { xs: 20, md: 35 }, my: 2 }}>
            En Yenileri Keşfet.
          </Typography>
          <NewestOrFeatured query={"$top=15"} />
        </Container>
      </Box>
    </>
  );
}
