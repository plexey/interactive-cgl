import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import { IState, Mode } from "./types";
import { createContext, Accessor } from "solid-js";

export const initialState: IState = {
  pause: false,
  mode: Mode.PATTERN_PLACE,
  matrix: null,
  generations: 0,
  msInterval: 50,
  zoom: 0,
  worldGridHeight: 100,
  worldGridWidth: 100,
  canvasHeight: 1000,
  canvasWidth: 1000,
  cellHeight: 0,
  cellWidth: 0,
  mouseActive: false,
  lastMouseCoordinate: null,
  // selectedPattern: spaceShips.find((item) => item.name === "LWSS")!.matrix,
  selectedPattern: [],
  undoHistory: [],
  canvas: null,
  canvasContext: null,
};

export const ModeContext =
  createContext<[Accessor<Mode>, (v: Mode | ((prev: Mode) => Mode)) => Mode]>();

export const PauseContext =
  createContext<
    [Accessor<boolean>, (v: boolean | ((prev: boolean) => boolean)) => boolean]
  >();

export const ModeProvider: Component = (props) => {
  const modeSignal = createSignal<Mode>(Mode.PATTERN_PLACE);
  return (
    <ModeContext.Provider value={modeSignal}>
      {props.children}
    </ModeContext.Provider>
  );
};

export const PauseProvider: Component = (props) => {
  const [pause, setPause] = createSignal<boolean>(true);
  return (
    <PauseContext.Provider value={[pause, setPause]}>
      {props.children}
    </PauseContext.Provider>
  );
};
