import type { CustomCellRendererProps } from "ag-grid-react";
import { useCallback } from "react";
import { Stack, Button, IconButton, Tooltip } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

export const ActionsCellRenderer = ({ api, node }: CustomCellRendererProps) => {
  const onRemoveClick = useCallback(() => {
    const row = node.data;
    api.applyTransaction({ remove: [row] });
  }, [api, node]);

  const onToggleSelling = useCallback(() => {
    const row = node.data;
    const isPaused = row.status === "paused";
    const isOutOfStock = row.available <= 0;

    // Orijinal mantığı birebir koruduk:
    // paused değilse → paused
    // paused ise ve stok varsa → active
    // paused ise ve stok yoksa → outOfStock
    row.status = !isPaused ? "paused" : !isOutOfStock ? "active" : "outOfStock";

    api.applyTransaction({ update: [row] });
  }, [api, node]);

  const isPaused = node?.data?.status === "paused";
  const isOutOfStock = (node?.data?.available ?? 0) <= 0;

  const ToggleIcon = isPaused ? PlayCircleOutlineIcon : PauseCircleOutlineIcon;
  const toggleLabel = isPaused
    ? isOutOfStock
      ? "Mark Out of Stock"
      : "Resume Selling"
    : "Hold Selling";

  return (
    <Stack direction="row-reverse" spacing={1} alignItems="center">
      <Tooltip title="Remove row">
        <IconButton
          size="small"
          color="error"
          onClick={onRemoveClick}
          aria-label="remove"
        >
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Button
        size="small"
        variant="outlined"
        color={isPaused ? "success" : "warning"}
        onClick={onToggleSelling}
        startIcon={<ToggleIcon fontSize="small" />}
        sx={{ minHeight: 40 }}
        // Eğer paused durumunda stok yoksa butonu pasifleştirmek istersen:
        // disabled={isPaused && isOutOfStock}
      >
        {toggleLabel}
      </Button>
    </Stack>
  );
};
