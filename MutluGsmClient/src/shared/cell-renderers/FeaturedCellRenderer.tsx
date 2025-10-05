import { Chip } from "@mui/material";
import type { CustomCellRendererProps } from "ag-grid-react";
import type { FunctionComponent } from "react";

export const FeaturedCellRenderer: FunctionComponent<
  CustomCellRendererProps
> = ({ value }) => {
  const label = value ? "Öne Çıkan" : "Değil";

  return (
    <Chip
      label={label}
      color={value ? "primary" : "error"}
      variant={value ? "filled" : "outlined"}
      sx={{
        fontWeight: 500,
        borderRadius: "8px",
        fontSize: "0.85rem",
        minWidth: "90px",
        justifyContent: "center",
      }}
    />
  );
};
