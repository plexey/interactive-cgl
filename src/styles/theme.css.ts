import { createGlobalTheme } from "@vanilla-extract/css";
import { palette } from "./palette";

export const vars = createGlobalTheme(":root", {
  background: palette.gray600,
  panelBackground: palette.gray700,
  canvasBackground: palette.gray900,
  previewCanvasBackground: palette.gray900,
  panelButton: {
    text: palette.yellow300,
    background: palette.gray700,
    active: palette.gray800,
  },
  patternPreview: {
    text: palette.yellow300,
    background: palette.gray700,
    hover: palette.gray800,
  },
  font: {
    body: "arial",
  },
});
