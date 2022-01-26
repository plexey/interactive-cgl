import type { Component } from "solid-js";
import { controlPanelStyle } from "./style.css";
import {
  FreeDrawIcon,
  ClearIcon,
  PatternPlaceIcon,
  PauseIcon,
  PlayIcon,
  RandomizeIcon,
  StepIcon,
  UndoIcon,
} from "../../components/icons";

import { Mode } from "../../types";
import PanelButton from "../../components/PanelButton";
import {
  setMode,
  togglePause,
  state,
  randomizeMatrix,
  clearMatrix,
  step,
  undo,
} from "../../stores";

const PlayButton = () => (
  <PanelButton action={togglePause}>
    <PlayIcon />
    <div>PLAY</div>
  </PanelButton>
);

const PauseButton = () => (
  <PanelButton action={togglePause}>
    <PauseIcon />
    <div>PAUSE</div>
  </PanelButton>
);

const FreeDrawButton = () => (
  <PanelButton
    active={state.mode === Mode.FREE_DRAW}
    action={() => setMode(Mode.FREE_DRAW)}
  >
    <FreeDrawIcon />
    <div>FREE DRAW</div>
  </PanelButton>
);

const PatternPlaceButton = () => (
  <PanelButton
    active={state.mode === Mode.PATTERN_PLACE}
    action={() => setMode(Mode.PATTERN_PLACE)}
  >
    <PatternPlaceIcon />
    <div>PATTERN PLACE</div>
  </PanelButton>
);

const ControlPanel: Component = () => {
  return (
    <div class={controlPanelStyle}>
      <PanelButton action={randomizeMatrix}>
        <RandomizeIcon />
        <div>RANDOMIZE</div>
      </PanelButton>
      <PanelButton action={clearMatrix}>
        <ClearIcon />
        <div>CLEAR</div>
      </PanelButton>
      <PanelButton action={undo}>
        <UndoIcon />
        <div>UNDO</div>
      </PanelButton>
      {state.pause ? <PlayButton /> : <PauseButton />}
      <PanelButton action={step}>
        <StepIcon />
        <div>STEP</div>
      </PanelButton>
      <FreeDrawButton />
      <PatternPlaceButton />
    </div>
  );
};

export default ControlPanel;
