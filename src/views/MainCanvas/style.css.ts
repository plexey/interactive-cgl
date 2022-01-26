import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const canvasStyle = style({
  background: vars.background,
  height: "100%",
  gridArea: "main-canvas",
});

export const frameStyle = style({
  display: "flex",
  flexDirection: "row",
  padding: "1rem",
});
