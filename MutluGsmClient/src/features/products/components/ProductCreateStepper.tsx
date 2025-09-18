// src/components/ProductCreateStepper.tsx
import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Paper,
  Stack,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  Button,
  Typography,
} from "@mui/material";
import { stepConnectorClasses } from "@mui/material/StepConnector";
import type { StepIconProps } from "@mui/material/StepIcon";
import { useFormContext, type FieldValues } from "react-hook-form";
import Product from "../api/productApi";

// --------- Defaults ---------
const DEFAULT_STEPS = ["1.Ürün Bilgisi", "2.Medya", "3.Fıyat"];

// --------- Connector (dark thin bar) ---------
const DarkBarConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 18,
    left: "calc(-50% + 24px)",
    right: "calc(50% + 24px)",
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,.35)",
  },
  [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}, 
     &.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]: {
    backgroundColor: "rgba(255,255,255,.85)",
  },
}));

// --------- Step icon (dot + glow on active) ---------
const DotIconRoot = styled("div")(() => ({
  position: "relative",
  width: 14,
  height: 14,
  borderRadius: "50%",
  backgroundColor: "rgba(255,255,255,.9)",
  "&.completed": { backgroundColor: "#fff" },
  "&.active": {
    backgroundColor: "#fff",
    boxShadow: "0 0 0 4px rgba(255,255,255,.16)",
  },
}));

const DotStepIcon: React.FC<StepIconProps> = ({
  active,
  completed,
  className,
}) => (
  <DotIconRoot
    className={[
      className ?? "",
      active ? "active" : "",
      completed ? "completed" : "",
    ].join(" ")}
  />
);

// --------- Props ---------
export interface ProductCreateStepperProps {
  /** Adım etiketleri; vermezsen varsayılan 4 adım gelir */
  steps?: string[];
  /** Başlangıç adımı (0 tabanlı) */
  initialStep?: number;
  /** Adım değişince bilgilendirme callback'i */
  onStepChange?: (stepIndex: number) => void;
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

// --------- Component ---------
const ProductCreateStepper: React.FC<ProductCreateStepperProps> = ({
  steps = DEFAULT_STEPS,
  initialStep = 0,
  onStepChange,
  renderStep,
  title = "Yeni bir ürün ekle",
  subtitle = "This information will describe more about the product.",
  nextLabel,
  backLabel,
  files,
  mainIndex,
}) => {
  const [activeStep, setActiveStep] = React.useState<number>(
    Math.min(Math.max(initialStep, 0), Math.max(steps.length - 1, 0))
  );

  const goTo = React.useCallback(
    (next: number) => {
      const clamped = Math.min(
        Math.max(next, 0),
        Math.max(steps.length - 1, 0)
      );
      setActiveStep(clamped);
      onStepChange?.(clamped);
    },
    [steps.length, onStepChange]
  );

  // Map each step to its relevant form fields (update field names as needed)
  const stepFields: string[][] = [
    ["name", "category"],
    ["social", "seo"],
    ["price", "discount"],
  ];

  const handlePrimaryClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    // 1) Bu adımın alanlarını doğrula
    const fields = stepFields[activeStep] ?? [];
    if (fields.length > 0) {
      const ok = await trigger(fields as any, { shouldFocus: true });
      if (!ok) return; // hatalıysa ilerleme / submit etme
    }

    // 2) Son adım mı?
    if (!isLast) {
      goTo(activeStep + 1); // sonraki adıma geç
    } else {
      // 3) Programatik submit (useMemo yok; direkt çağırıyoruz)
      await handleSubmit(submitForm)();
    }
  };
  const handleBack = () => goTo(activeStep - 1);

  const isFirst = activeStep === 0;
  const isLast = activeStep === steps.length - 1;

  const { trigger, handleSubmit } = useFormContext();

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

        {/* Card */}
        <Paper
          elevation={1}
          sx={{
            p: 3,
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          {/* Dark strip + Stepper */}
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

          {/* Step body */}
          <Box sx={{ minHeight: 220 }}>
            {renderStep ? (
              renderStep(activeStep)
            ) : (
              <Typography variant="h6" sx={{ mb: 2 }}>
                {activeStep === 0 && "Product Information"}
                {activeStep === 1 && "Media"}
                {activeStep === 2 && "Social / SEO"}
                {activeStep === 3 && "Pricing"}
              </Typography>
            )}
          </Box>

          {/* Actions */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="outlined" disabled={isFirst} onClick={handleBack}>
              {backLabel ?? "Back"}
            </Button>
            <Button
              variant="contained"
              type="button" // 🔒 her zaman button: otomatik submit yok
              onClick={handlePrimaryClick} // ✅ tek handler: validate -> next/submit
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
              {nextLabel ?? (isLast ? "Finish" : "Next")}
            </Button>
          </Box>
        </Paper>
      </Stack>
    </form>
  );
};

export default ProductCreateStepper;
