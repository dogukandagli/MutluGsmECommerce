import * as React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  TextField,
  Stack,
  Button,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { createBrand } from "../store/brandSlice";

type Props = {
  open: boolean;
  onClose: () => void;
  initialName?: string;
};

export default function BrandDrawer({
  open,
  onClose,
  initialName = "",
}: Props) {
  const [name, setName] = React.useState(initialName);
  const [error, setError] = React.useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.brand);

  const loading = status === "pendingCreateBrand";

  React.useEffect(() => {
    if (open) {
      setName(initialName);
      setError(null);
    }
  }, [open, initialName]);

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    dispatch(createBrand(name));
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "90vw", sm: 380 }, // 👈 daralt
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
        },
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        // 👇 tüm yüksekliği kaplamasın
        sx={{ display: "flex", flexDirection: "column", gap: 0 }}
      >
        {/* Header */}
        <Box sx={{ p: 2.5, position: "relative" }}>
          <Typography variant="h6">Marka Ekle</Typography>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{ position: "absolute", right: 8, top: 8 }}
            aria-label="Kapat"
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />

        {/* Content */}
        <Box sx={{ p: 2.5, display: "grid", gap: 2, justifyItems: "start" }}>
          <Typography>Marka</Typography>
          <TextField
            label="Marka Adı"
            placeholder="Örn. Apple"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!error}
            helperText={error || " "}
            // 👇 genişliği sabitle / dar tut
            sx={{ minWidth: 260 }}
          />
        </Box>

        {/* 👇 boşluk dolduran spacer’ı kaldırdık */}
        {/* <Box sx={{ flexGrow: 1 }} /> */}

        <Divider />
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ p: 2.5, justifyContent: "flex-start" }}
        >
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              minWidth: 96,
              fontWeight: 600,
              textTransform: "none",
              boxShadow: 2,
            }}
          >
            {loading ? "Ekleniyor..." : "Ekle"}
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={onClose}
            disabled={loading}
            sx={{ minWidth: 96, textTransform: "none", fontWeight: 600 }}
          >
            Vazgeç
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
}
