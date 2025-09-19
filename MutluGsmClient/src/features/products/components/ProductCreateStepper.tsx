// src/components/ProductCreateStepper.tsx
import * as React from "react";
import {
  Box,
  Paper,
  Stack,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from "@mui/material";
import { useFormContext, type FieldValues } from "react-hook-form";
import Product from "../api/productApi";
import { useState } from "react";
import { DarkBarConnector } from "./Stepper/DarkBarConnector";
import { DotStepIcon } from "./Stepper/DotStepIcon";

export interface ProductCreateStepperProps {
  steps?: string[];
  /** Adım içeriğini dışarıdan çizmek için render fonksiyonu */
  renderStep?: (stepIndex: number) => React.ReactNode;
  /** Üst başlık & alt açıklama */
  title?: string;
  subtitle?: string;
  /** Buton yazıları */
  nextLabel?: string;
  backLabel?: string;
  files?: File[];
  mainIndex: number;
}

const ProductCreateStepper: React.FC<ProductCreateStepperProps> = ({
  steps = ["1.Ürün Bilgisi", "2.Medya", "3.Fıyat"],
  renderStep,
  title = "Yeni bir ürün ekle",
  subtitle = "This information will describe more about the product.",
  files,
  mainIndex,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const { trigger, handleSubmit } = useFormContext();
  const isFirst = activeStep === 0;
  const isLast = activeStep === steps.length - 1;

  const stepFields: string[][] = [
    ["name", "category"],
    ["social", "seo"],
    ["price", "discount"],
  ];

  const handleNext = async (e: React.MouseEvent) => {
    e.preventDefault();
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

  async function submitForm(data: FieldValues) {
    const formData = new FormData();
    formData.append("Name", data.name);
    formData.append("Quantity", String(data.quantity));
    formData.append("Price", String(data.price).replace(",", "."));
    if (data.originalPrice !== "" && data.originalPrice !== undefined)
      formData.append(
        "OriginalPrice",
        String(data.originalPrice).replace(",", ".")
      );
    formData.append("Condition", String(data.condition));
    formData.append("CategoryId", String(data.category));
    formData.append("BrandId", String(data.brand));
    if (data.description) formData.append("Description", data.description);
    formData.append("Featured", String(data.featured));
    if (files) {
      files.forEach((f) => formData.append("file", f));
    }
    formData.append("MainIndex", String(mainIndex));
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    Product.post(formData);
  }

  return (
    <form onSubmit={handleSubmit(submitForm)} noValidate>
      <Stack spacing={3}>
        {/* Header */}
        <Typography align="center" variant="h4">
          {title}
        </Typography>
        {subtitle && (
          <Typography align="center" color="text.secondary">
            {subtitle}
          </Typography>
        )}

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
            {renderStep && renderStep(activeStep)}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="outlined" disabled={isFirst} onClick={handleBack}>
              {"Geri"}
            </Button>
            <Button
              variant="contained"
              type="button"
              onClick={handleNext}
              sx={{
                borderRadius: 2,
                px: 3,
                background: "linear-gradient(180deg, #2c2c2c 0%, #1e1e1e 100%)",
                color: "#fff",
                boxShadow: "0 3px 10px rgba(0,0,0,.25)",
                "&:hover": {
                  background:
                    "linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 100%)",
                },
              }}
            >
              {isLast ? "Kaydet" : "İleri"}
            </Button>
          </Box>
        </Paper>
      </Stack>
    </form>
  );
};

export default ProductCreateStepper;
