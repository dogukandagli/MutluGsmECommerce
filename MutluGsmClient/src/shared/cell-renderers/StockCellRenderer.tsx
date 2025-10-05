import type { CustomCellRendererProps } from "ag-grid-react";
import { type FunctionComponent } from "react";

import { Box } from "@mui/system";
import { Chip } from "@mui/material";
export const StockCellRenderer: FunctionComponent<CustomCellRendererProps> = ({
  value,
}) => (
  <Box>
    <Chip
      label={`${value}`}
      color={"success"}
      sx={{
        fontWeight: 500,
        fontSize: "0.875rem",
        borderRadius: "6px",
      }}
    />
  </Box>
);
