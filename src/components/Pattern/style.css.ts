import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const patternButtonStyle = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",
  margin: 0,
  padding: 0,
  border: "none",
  background: vars.patternPreview.background,
  ":hover": {
    background: vars.patternPreview.hover,
  },
  transition: "150ms ease all",
  zIndex: 2,
});

export const activepatternButtonStyle = style({
  background: vars.patternPreview.hover,
  ":hover": {
    background: vars.patternPreview.hover,
  },
});

export const patternHeader = style({
  padding: "0.25rem 0",
  whiteSpace: "nowrap",
  fontWeight: "bold",
  fontSize: "0.5rem",
  cursor: "inherit",
  color: vars.patternPreview.text,
  width: "100%",
  transition: "150ms ease all",
});

export const activePatternHeader = style({
  color: "black",
  background: vars.patternPreview.text,
});

export const patternCanvasContainer = style({
  background: "hsl(0, 0%, 10%)",
  flexGrow: 1,
});

export const patternCanvasStyle = style({
  background: vars.previewCanvasBackground,
  maxHeight: "4rem",
});
