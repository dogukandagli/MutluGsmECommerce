// src/components/ProductCreateStepper.tsx
import {
  Box,
  Paper,
  Stack,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { FormProvider, useForm, type FieldValues } from "react-hook-form";
import { useState } from "react";
import { DarkBarConnector } from "../../../../shared/components/Stepper/DarkBarConnector";
import { DotStepIcon } from "../../../../shared/components/Stepper/DotStepIcon";
import StepInformation from "./steps/StepInformation";
import StepPrice from "./steps/StepPrice";
import StepMedia from "./steps/StepMedia";
import { createProduct } from "../../store/productSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/store/hooks";
import { LoadingButton } from "@mui/lab";

export default function ProductCreateStepper({}) {
  const steps = ["1.Ürün Bilgisi", "2.Medya", "3.Fıyat"];

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      category: "",
      featured: false,
    },
  });

  const { handleSubmit, trigger } = methods;

  const [files, setFiles] = useState<File[]>([]);
  const [mainIndex, setMainIndex] = useState<number>(files.length ? 0 : -1);

  const [activeStep, setActiveStep] = useState(0);
  const isFirst = activeStep === 0;
  const isLast = activeStep === steps.length - 1;

  const stepFields: string[][] = [
    ["name", "category"],
    ["social", "seo"],
    ["price", "discount"],
  ];

  const stepComponents = [
    <StepInformation key="info" />,
    <StepMedia
      key="media"
      files={files}
      setFiles={setFiles}
      mainIndex={mainIndex}
      setMainIndex={setMainIndex}
    />,
    <StepPrice key="price" />,
  ];

  const handleNext = async () => {
    const fields = stepFields[activeStep] ?? [];

    if (fields.length > 0) {
      const ok = await trigger(fields as any, { shouldFocus: true });
      if (!ok) return;
    }
    if (!isLast) {
      setActiveStep(activeStep + 1);
    } else {
      await handleSubmit(submitForm)();
    }
  };

  const handleBack = () => setActiveStep(activeStep - 1);

  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.product);

  async function submitForm(data: FieldValues) {
    const formData = new FormData();
    formData.append("Name", data.name);
    formData.append("Quantity", String(data.quantity));
    formData.append("Price", String(data.price).replace(",", "."));
    if (data.originalPrice)
      formData.append(
        "OriginalPrice",
        String(data.originalPrice).replace(",", ".")
      );
    formData.append("Condition", String(data.condition));
    formData.append("CategoryId", String(data.category));

    if (data.brand) formData.append("BrandId", String(data.brand));

    if (data.description) formData.append("Description", data.description);
    formData.append("featured", String(data.featured));
    if (files) {
      files.forEach((f) => formData.append("File", f));
    }
    formData.append("MainIndex", String(mainIndex));
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    dispatch(createProduct(formData));
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submitForm)} noValidate>
        <Stack spacing={3}>
          {/* Header */}
          <Typography align="center" variant="h4">
            Yeni Bir Ürün Ekle
          </Typography>

          <Paper
            elevation={1}
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Paper
              elevation={6}
              sx={{
                borderRadius: 3,
                px: 2,
                py: 1.5,
                mb: 3,
                background: "linear-gradient(180deg, #3a3a3a 0%, #2b2b2b 100%)",
              }}
            >
              <Stepper
                alternativeLabel
                activeStep={activeStep}
                connector={<DarkBarConnector />}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel
                      StepIconComponent={DotStepIcon}
                      sx={{
                        "& .MuiStepLabel-label": {
                          color: "rgba(255,255,255,.75)",
                          fontWeight: 600,
                          letterSpacing: ".4px",
                          "&.Mui-active": { color: "#fff" },
                          "&.Mui-completed": { color: "rgba(255,255,255,.9)" },
                          whiteSpace: "nowrap",
                        },
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Paper>

            <Box sx={{ minHeight: 220 }}>
              {stepComponents.length > 0 && stepComponents[activeStep]}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button
                variant="outlined"
                disabled={isFirst}
                onClick={handleBack}
              >
                {"Geri"}
              </Button>

              <LoadingButton
                loading={status === "pendingCreateProduct"}
                loadingPosition="start"
                loadingIndicator={
                  <CircularProgress size={16} thickness={5} sx={{ mr: 1 }} />
                }
                variant="contained"
                disableElevation
                type="button"
                onClick={handleNext}
                disabled={status === "pendingCreateProduct"}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  minWidth: 140,
                  height: 40,
                  textTransform: "none",
                  background:
                    "linear-gradient(180deg, #2c2c2c 0%, #1e1e1e 100%)",
                  color: "#fff",
                  boxShadow: "0 3px 10px rgba(0,0,0,.25)",
                  "&:hover": {
                    background:
                      "linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 100%)",
                  },
                  "&.Mui-disabled": {
                    opacity: 0.9,
                    color: "#fff",
                  },
                }}
              >
                {isLast
                  ? status === "pendingCreateProduct"
                    ? "Kaydediliyor…"
                    : "Kaydet"
                  : "İleri"}
              </LoadingButton>
            </Box>
          </Paper>
        </Stack>
      </form>
    </FormProvider>
  );
}
