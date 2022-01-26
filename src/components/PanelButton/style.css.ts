import { style } from "@vanilla-extract/css";
import { globalStyle } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const panelButtonStyle = style({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  margin: 0,
  padding: "0 1rem",
  border: "none",
  cursor: "pointer",
  fontSize: ".8rem",
  fontWeight: "bold",
  transition: "200ms ease all",
  color: vars.panelButton.text,
  background: vars.panelButton.background,
  ":hover": {
    background: vars.panelButton.active,
  },
});

export const activePanelButtonStyle = style({
  background: vars.panelButton.active,
});

globalStyle(`${panelButtonStyle} svg`, {
  height: "1.2rem",
  strokeWidth: ".15rem",
});
