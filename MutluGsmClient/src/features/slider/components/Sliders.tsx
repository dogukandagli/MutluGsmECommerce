import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Tooltip,
  Grid,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { apiUrl } from "../../../shared/lib/apiClient";
import { deleteSlider, fetchOdataSliders } from "../store/sliderSlice";

export default function Sliders() {
  const dispatch = useAppDispatch();
  const { sliders, status } = useAppSelector((state) => state.slider);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [toDeleteId, setToDeleteId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchOdataSliders(""));
  }, [dispatch]);

  const handleAskDelete = (id: string) => {
    setToDeleteId(id);
    setOpenConfirm(true);
  };

  const handleCloseDialog = () => {
    setOpenConfirm(false);
    setToDeleteId(null);
  };

  const handleConfirmDelete = async () => {
    if (!toDeleteId) return;
    try {
      await dispatch(deleteSlider(toDeleteId)).unwrap();
    } catch (e) {
      console.error(e);
    } finally {
      handleCloseDialog();
      dispatch(fetchOdataSliders(""));
    }
  };

  const loading =
    status === "pendingFetchSliders" || status === "pendingDeleteSlider";

  return (
    <Box p={2}>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <Typography variant="h5" sx={{ flex: 1 }}>
          Sliders
        </Typography>
        <Tooltip title="Yenile">
          <span>
            <IconButton
              onClick={() => dispatch(fetchOdataSliders(""))}
              disabled={loading}
            >
              <RefreshIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Box>

      {loading && (
        <Box display="flex" justifyContent="center" my={6}>
          <CircularProgress />
        </Box>
      )}

      {!loading && sliders?.length === 0 && (
        <Typography color="text.secondary">Hiç slider bulunamadı.</Typography>
      )}

      <Grid container spacing={2}>
        {sliders?.map((s) => (
          <Grid key={s.id} size={{ xs: 12, md: 4, sm: 6, lg: 3 }}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                height="180"
                image={`${apiUrl}images/${s.imageUrl}`}
                alt="slider"
                sx={{ objectFit: "contain", bgcolor: "background.default" }}
              />
              <CardContent sx={{ flex: 1 }}>
                <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                  <Chip
                    size="small"
                    color={s.isActive ? "success" : "default"}
                    label={s.isActive ? "Aktif" : "Pasif"}
                  />
                </Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Oluşturma: {new Date(s.createdDate).toLocaleString()}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Tooltip title="Sil">
                  <span>
                    <IconButton
                      color="error"
                      onClick={() => handleAskDelete(s.id)}
                      disabled={loading}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Delete Confirm Dialog */}
      <Dialog open={openConfirm} onClose={handleCloseDialog}>
        <DialogTitle>Slider’ı sil</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bu sliderı silmek istediğinizden emin misiniz? Bu işlem geri
            alınamaz.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Vazgeç</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Sil
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
