import type { CustomCellRendererProps } from "ag-grid-react";
import { type FunctionComponent } from "react";
import Chip from "@mui/material/Chip";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReplayIcon from "@mui/icons-material/Replay";

export const StatusCellRenderer: FunctionComponent<CustomCellRendererProps> = ({
  value,
}) => {
  const isNew = value === 0;
  const label = isNew ? "Yeni" : "2. El";
  const icon = isNew ? <CheckCircleIcon /> : <ReplayIcon />;

  return (
    <Chip
      icon={icon}
      label={label}
      color={isNew ? "success" : "warning"}
      variant={"filled"}
      sx={{
        fontWeight: 500,
        fontSize: "0.85rem",
        borderRadius: "8px",
        px: 0.5,
        "& .MuiChip-icon": {
          fontSize: "1rem",
        },
      }}
    />
  );
};
