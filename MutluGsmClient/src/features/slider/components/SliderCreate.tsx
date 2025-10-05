import { useCallback, useEffect, useMemo, useState } from "react";
import { Box } from "@mui/system";
import {
  Button,
  IconButton,
  Tooltip,
  Typography,
  Stack,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import { useDropzone } from "react-dropzone";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { createSlider } from "../store/sliderSlice";
import { useNavigate } from "react-router";
import { LoadingButton } from "@mui/lab";

export default function SliderCreate() {
  const [files, setFiles] = useState<File[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status } = useAppSelector((state) => state.slider);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: true,
    onDrop,
  });

  const previews = useMemo(
    () => files.map((f) => ({ file: f, url: URL.createObjectURL(f) })),
    [files]
  );

  useEffect(() => {
    return () => {
      previews.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [previews]);

  // Sil
  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Create (örnek)
  const handleCreate = async () => {
    try {
      const form = new FormData();
      files.forEach((f, i) =>
        form.append("files", f, f.name || `image_${i}.jpg`)
      );

      dispatch(createSlider(form)).then((action) => {
        if (createSlider.fulfilled.match(action)) {
          navigate("/admin/products");
        }
      });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Paper sx={{ p: 5 }}>
      <Typography variant="h6" gutterBottom>
        Slider Media
      </Typography>

      <Box
        {...getRootProps()}
        sx={{
          border: "1px dashed",
          borderColor: "grey.400",
          borderRadius: 1,
          p: 3,
          textAlign: "center",
          cursor: "pointer",
          bgcolor: isDragActive ? "grey.100" : "transparent",
          mb: 2,
        }}
      >
        <input {...getInputProps()} />
        <Typography color="text.secondary">
          {isDragActive
            ? "Bırak yükleyelim"
            : "Görsel(leri) yüklemek için tıkla veya sürükle-bırak"}
        </Typography>
      </Box>

      {files.length > 0 && (
        <Box mb={2}>
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}
            loop
            style={{ maxHeight: 420, width: "100%", aspectRatio: "16 / 9" }}
          >
            {previews.map((p, i) => (
              <SwiperSlide key={i}>
                <img
                  src={p.url}
                  alt={`Slide ${i + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      )}

      {files.length > 0 && (
        <Grid container spacing={2}>
          {previews.map((p, index) => (
            <Grid key={index} size={{ xs: 6, md: 2 }}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "1 / 1",
                  borderRadius: 2,
                  overflow: "hidden",
                  border: "1px solid",
                  borderColor: "divider",
                  "&:hover .action-btn": { opacity: 1 },
                }}
              >
                <img
                  src={p.url}
                  alt={`thumb-${index}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <Tooltip title="Sil">
                  <IconButton
                    size="small"
                    onClick={() => handleRemove(index)}
                    className="action-btn"
                    sx={{
                      position: "absolute",
                      top: 6,
                      right: 6,
                      bgcolor: "rgba(0,0,0,0.6)",
                      color: "white",
                      opacity: 0,
                      transition: "opacity 0.3s",
                      "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      <Stack
        direction="row"
        spacing={2}
        mt={3}
        alignItems="center"
        justifyContent={"end"}
      >
        {status === "pendingCreateSlider" ? (
          <LoadingButton sx={{ flex: 1, maxWidth: 240 }} />
        ) : (
          <Button
            variant="contained"
            disabled={status === "pendingCreateSlider"}
            onClick={handleCreate}
            sx={{
              backgroundColor: "#002984",
            }}
          >
            Create
          </Button>
        )}
      </Stack>
    </Paper>
  );
}
