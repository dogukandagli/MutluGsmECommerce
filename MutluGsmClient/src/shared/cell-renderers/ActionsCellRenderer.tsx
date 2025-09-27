import type { CustomCellRendererProps } from "ag-grid-react";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import {
  deleteProduct,
  selectProductById,
} from "../../features/products/store/productSlice";
import { LoadingButton } from "@mui/lab";
import { NavLink } from "react-router";
import EditIcon from "@mui/icons-material/Edit";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

export const ActionsCellRenderer = (params: CustomCellRendererProps) => {
  const { api, node } = params;
  const id = params.node.data?.id;

  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.product);

  const product = useAppSelector((state) => selectProductById(state, id!));

  const loading = status === "pendingDeleteProduct";

  const onRemoveClick = () => {
    const row = node.data;

    dispatch(deleteProduct(row.id))
      .unwrap()
      .then(() => {
        api.refreshInfiniteCache(); // tabloyu yenile
        handleClose(); // dialog kapat
      })
      .catch((err) => {
        console.error("Silme hatası:", err);
      });
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
        onClose={loading ? undefined : handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <WarningAmberRoundedIcon color="error" />
          {product?.name} isimli ürünü silmek istiyor musunuz?
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bu işlem geri alınamaz. Ürün kalıcı olarak silinecektir.
          </DialogContentText>
          <Divider sx={{ mt: 2 }} />
          <Stack
            spacing={0.5}
            sx={{ mt: 2, fontSize: 13, color: "text.secondary" }}
          >
            <span>• İlgili varyantlar ve stok bilgileri de kaldırılır.</span>
            <span>• Yayında ise vitrinlerden düşer.</span>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} disabled={loading}>
            Vazgeç
          </Button>
          <LoadingButton
            variant="contained"
            color="error"
            loadingPosition="start"
            loading={loading}
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
