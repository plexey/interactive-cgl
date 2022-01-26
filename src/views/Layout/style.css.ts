import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const layoutStyle = style({
  display: "grid",
  gridTemplateColumns: "auto",
  gridTemplateRows: "3rem auto 6rem",
  height: "100vh",
  gridTemplateAreas: `"control-panel" "main-canvas" "pattern-palette"`,
  background: vars.background,
});
