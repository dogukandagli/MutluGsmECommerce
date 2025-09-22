import type { CustomCellRendererProps } from "ag-grid-react";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { deleteProduct } from "../../features/products/store/productSlice";
import { LoadingButton } from "@mui/lab";

export const ActionsCellRenderer = (params: CustomCellRendererProps) => {
  const { api, node } = params;

  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.product);

  const onRemoveClick = () => {
    const row = node.data;

    dispatch(deleteProduct(row.id));
    api.refreshInfiniteCache();
    setOpen(false);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Remove row">
        <IconButton
          size="small"
          color="error"
          onClick={handleClickOpen}
          aria-label="remove"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Ürünü silmek istiyor musunuz?
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>Vazgeç</Button>
          <LoadingButton
            variant="outlined"
            loadingPosition="start"
            loading={status === "pendingDeleteProduct"}
            startIcon={<DeleteIcon />}
            onClick={onRemoveClick}
            autoFocus
          >
            Sil
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
