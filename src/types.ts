export type Point = {
  x: number;
  y: number;
};

export enum Mode {
  FREE_DRAW,
  PATTERN_PLACE,
}

export enum PaternType {
  STILL_LIFE,
  OSCILATOR,
  SPACE_SHIP,
  OTHER,
}

export type Matrix = number[][];

export interface IState {
  pause: boolean;
  matrix: null | number[][];
  generations: number;
  msInterval: number;
  worldGridHeight: number;
  worldGridWidth: number;
  canvasHeight: number;
  canvasWidth: number;
  cellHeight: number;
  cellWidth: number;
  mouseActive: boolean;
  lastMouseCoordinate: Point | null;
  zoom: number;
  mode: Mode;
  selectedPattern: number[][];
  // selectedPatternType: PaternType;
  undoHistory: Matrix[];
  canvas: HTMLCanvasElement | null;
  canvasContext: CanvasRenderingContext2D | null;
}
