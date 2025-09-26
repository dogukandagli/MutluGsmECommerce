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
import { NavLink } from "react-router";
import EditIcon from "@mui/icons-material/Edit";

export const ActionsCellRenderer = (params: CustomCellRendererProps) => {
  const { api, node } = params;
  const id = params.node.data?.id;

  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.product);

  const onRemoveClick = () => {
    const row = node.data;

    dispatch(deleteProduct(row.id));
    api.refreshInfiniteCache();
    handleClose();
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (status === "idle") {
      setOpen(false);
    }
  };

  return (
    <>
      <Tooltip title="Ürünü sil">
        <IconButton
          size="small"
          color="error"
          onClick={handleClickOpen}
          aria-label="remove"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Ürünü düzenle">
        <IconButton
          size="small"
          color="error"
          component={NavLink}
          to={`/admin/products/edit/${id}`}
          aria-label="edit"
        >
          <EditIcon fontSize="small" />
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
