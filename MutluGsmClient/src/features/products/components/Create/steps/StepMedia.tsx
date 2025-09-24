import { Chip, IconButton, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useDropzone } from "react-dropzone";
import Grid from "@mui/material/Grid";

type StepMediaProps = {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  mainIndex: number;
  setMainIndex: React.Dispatch<React.SetStateAction<number>>;
};

export default function StepMedia({
  files,
  setFiles,
  mainIndex,
  setMainIndex,
}: StepMediaProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: true,
    onDrop: (acceptedFiles) => {
      setFiles((prev) => [...prev, ...acceptedFiles]);
    },
  });

  const handleSetMain = (index: number) => setMainIndex(index);

  const handleRemove = (index: number) => {
    setFiles((prev) => {
      const next = prev.filter((_, i) => i !== index);

      if (next.length === 0) {
        setMainIndex(-1);
      } else if (index === mainIndex) {
        setMainIndex(0);
      } else if (index < mainIndex) {
        setMainIndex((prevMain) => prevMain - 1);
      }
      return next;
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Media
      </Typography>

      <Typography variant="subtitle2" gutterBottom>
        Product Image
      </Typography>

      <Box
        {...getRootProps()}
        sx={{
          border: "1px solid",
          borderColor: "grey.400",
          borderRadius: 1,
          p: 2,
          textAlign: "center",
          cursor: "pointer",
          bgcolor: isDragActive ? "grey.100" : "transparent",
        }}
      >
        <input {...getInputProps()} />
        <Typography color="textSecondary">
          {isDragActive
            ? "Bırak dosyayı yüklemek için"
            : "Dosya yüklemek için tıkla"}
        </Typography>
      </Box>

      {files.length > 0 && (
        <Grid container mt={2}>
          {files.map((file, index) => (
            <Grid size={{ xs: 6, md: 2 }} key={index}>
              <Box
                sx={{
                  position: "relative",
                  width: 120,
                  height: 120,
                  borderRadius: 2,
                  overflow: "hidden",
                  "&:hover .action-btn": { opacity: 1 },
                }}
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                {/* Ana rozet */}
                {index === mainIndex && (
                  <Chip
                    label="Ana"
                    size="small"
                    color="primary"
                    sx={{ position: "absolute", left: 6, top: 6 }}
                  />
                )}

                {/* Ana yap butonu */}
                <Tooltip
                  title={index === mainIndex ? "Ana fotoğraf" : "Ana yap"}
                >
                  <IconButton
                    size="small"
                    onClick={() => handleSetMain(index)}
                    className="action-btn"
                    sx={{
                      position: "absolute",
                      top: 4,
                      left: 4,
                      bgcolor: "rgba(0,0,0,0.6)",
                      color: "white",
                      opacity: 0,
                      transition: "opacity 0.3s",
                      "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
                    }}
                  >
                    {index === mainIndex ? (
                      <StarIcon fontSize="small" />
                    ) : (
                      <StarBorderIcon fontSize="small" />
                    )}
                  </IconButton>
                </Tooltip>

                {/* Sil butonu */}
                <Tooltip title="Sil">
                  <IconButton
                    size="small"
                    onClick={() => handleRemove(index)}
                    className="action-btn"
                    sx={{
                      position: "absolute",
                      top: 4,
                      right: 4,
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
    </Box>
  );
}
