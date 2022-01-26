import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/theme.css";

export const controlPanelStyle = style({
  display: "flex",
  flexDirection: "row",
  gridArea: "control-panel",
  background: vars.panelBackground,
});
