import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const patternPanelContainer = style({
  display: "grid",
  gridTemplateColumns: "8rem auto",
  gridTemplateRows: "auto",
  gridArea: "pattern-palette",
  gap: "0.25rem",
});

export const patternTypeListStyle = style({
  display: "flex",
  flexDirection: "column",
});

export const patternTypeListOption = style({
  background: vars.panelButton.background,
  color: vars.panelButton.text,
  border: "none",
  flexGrow: 1,
  cursor: "pointer",
  ":hover": {
    background: vars.panelButton.active,
  },
});

export const patternTypeListOptionActive = style({
  background: vars.panelButton.active,
});

export const patternPaletteStyle = style({
  display: "grid",
  gridAutoColumns: "minmax(min-content, max-content)",
  gridAutoFlow: "column",
  justifyItems: "start",
  alignItems: "center",
  gap: "0.25rem",
  maxWidth: "100%",
  overflowX: "auto",
});
