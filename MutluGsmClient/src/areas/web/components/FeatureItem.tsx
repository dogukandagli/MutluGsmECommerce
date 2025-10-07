import * as React from "react";
import { Box, Typography, Link as MuiLink } from "@mui/material";

export interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  linkLabel: string;
  whatsappNumber: string;
  whatsappMessage?: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  icon,
  title,
  desc,
  linkLabel,
  whatsappNumber,
  whatsappMessage,
}) => {
  const handleClick = () => {
    const message =
      whatsappMessage || `Merhaba, "${title}" hakkında bilgi almak istiyorum.`;
    const link = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(link, "_blank");
  };

  return (
    <Box sx={{ textAlign: "center", px: { xs: 2, md: 4 } }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Box sx={{ "& svg": { fontSize: 44 } }}>{icon}</Box>
      </Box>

      <Typography
        variant="h6"
        component="h3"
        sx={{ fontWeight: 700, lineHeight: 1.25, mb: 1 }}
      >
        {title}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ maxWidth: 360, mx: "auto", mb: 1 }}
      >
        {desc}
      </Typography>

      <MuiLink
        component="button"
        onClick={handleClick}
        underline="hover"
        sx={{ fontSize: 14, fontWeight: 600 }}
      >
        {linkLabel} &#8250;
      </MuiLink>
    </Box>
  );
};

export default FeatureItem;
