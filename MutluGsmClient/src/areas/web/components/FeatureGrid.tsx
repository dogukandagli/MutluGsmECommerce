import * as React from "react";
import { Container, Grid, Box } from "@mui/material";
import BuildCircleOutlinedIcon from "@mui/icons-material/BuildCircleOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FeatureItem from "./FeatureItem";

const FeatureStrip: React.FC = () => {
  const WHATSAPP_NUMBER = "905388726981";

  return (
    <Box
      sx={{
        borderColor: "divider",
        py: { xs: 5, md: 7 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 2 }} justifyContent="center">
          <Grid size={{ xs: 12, md: 4 }}>
            <FeatureItem
              icon={<BuildCircleOutlinedIcon color="error" />}
              title="Uzman teknik servis"
              desc="Telefon, tablet ve bilgisayar onarımlarında hızlı teşhis. Orijinal/kaliteli yedek parça seçenekleri."
              linkLabel="Detaylı bilgi al"
              whatsappNumber={WHATSAPP_NUMBER}
              whatsappMessage="Merhaba, teknik servis hakkında bilgi almak istiyorum."
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <FeatureItem
              icon={<CreditCardOutlinedIcon color="primary" />}
              title="Size uygun ödeme"
              desc="Kredi kartına taksit, havale/EFT indirimi. (Banka/pos’a göre değişebilir.)"
              linkLabel="Ödeme seçenekleri"
              whatsappNumber={WHATSAPP_NUMBER}
              whatsappMessage="Merhaba, ödeme seçenekleri hakkında bilgi almak istiyorum."
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <FeatureItem
              icon={<WhatsAppIcon color="success" />}
              title="WhatsApp’tan sipariş & destek"
              desc="Ürün sor, stok/fiyat öğren ve teknik servis için WhatsApp’tan hemen yaz."
              linkLabel="WhatsApp’tan yaz"
              whatsappNumber={WHATSAPP_NUMBER}
              whatsappMessage="Merhaba, ürün veya servis hakkında bilgi almak istiyorum."
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FeatureStrip;
