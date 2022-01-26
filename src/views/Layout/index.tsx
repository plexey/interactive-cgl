import type { Component } from "solid-js";
import { layoutStyle } from "./style.css";

import ControlPanel from "../ControlPanel";
import MainCanvas from "../MainCanvas";
import PatternPanel from "../PatternPanel";
import { state } from "../../stores";
import { Mode } from "../../types";

const Layout: Component = () => {
  return (
    <div class={layoutStyle}>
      <ControlPanel />
      <MainCanvas />
      {state.mode === Mode.PATTERN_PLACE && <PatternPanel />}
    </div>
  );
};

export default Layout;
