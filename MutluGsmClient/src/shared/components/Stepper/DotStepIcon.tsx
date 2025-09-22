import * as React from "react";
import { styled } from "@mui/material/styles";
import type { StepIconProps } from "@mui/material";

export const DotIconRoot = styled("div")(() => ({
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

const DotStepIconBase: React.FC<StepIconProps> = ({
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

export const DotStepIcon = React.memo(DotStepIconBase);
