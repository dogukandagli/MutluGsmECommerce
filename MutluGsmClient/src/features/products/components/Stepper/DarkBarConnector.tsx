import { styled, StepConnector, stepConnectorClasses } from "@mui/material";

export const DarkBarConnector = styled(StepConnector)(({}) => ({
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
