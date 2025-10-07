import { Button } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

type props = {
  phone: string;
  message: string;
  children?: string;
};

export default function WhatsAppButton({
  phone,
  message,
  children = "WhatsApp ile sipariş ver",
}: props) {
  const normalizePhone = (p: any) => p.replace(/\D/g, ""); // tüm rakam olmayanları siler
  const waPhone = normalizePhone(phone);
  const waText = encodeURIComponent(message || "");

  const url = `https://wa.me/${waPhone}?text=${waText}`;

  return (
    <Button
      component="a"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      startIcon={<WhatsAppIcon />}
      sx={{
        bgcolor: "#14be53ff",
        color: "white",
        fontWeight: 800,
        letterSpacing: 0.2,
        borderRadius: 2,
        px: 2.5,
        py: 1.25,
        width: { xs: "100%", md: "auto" }, // mobile full-width, desktop auto
        "&:hover": { bgcolor: "#15ac4fff" },
        textTransform: "none",
      }}
    >
      {/* İstersen ikon koy */}
      {/* <img src="/whatsapp.svg" alt="WhatsApp" width={18} height={18} /> */}
      {children}
    </Button>
  );
}
