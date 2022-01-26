import { createStore } from "solid-js/store";
import { MAX_UNDO_HISTORY_LENGTH } from "./constants";
import {
  copyMatrix,
  generateEmptyMatrix,
  generateRandomMatrix,
  updateMatrix,
} from "./matrix";
import { Pattern } from "./patterns";
import { Mode, Point } from "./types";

interface IState {
  pause: boolean;
  mode: Mode;
  selectedPattern: Pattern | null;
}

export const [state, setState] = createStore<IState>({
  pause: true,
  mode: Mode.PATTERN_PLACE,
  selectedPattern: null,
});

export let lastMouseCoordinates: null | Point = null;

export const updateLastMouseCoordinates = (val: Point | null) =>
  (lastMouseCoordinates = val);

export const togglePause = () => setState({ pause: !state.pause });

export const setMode = (mode: Mode) => setState({ mode: mode });

export const setSelectedPattern = (pattern: Pattern) =>
  setState({ selectedPattern: pattern });

/* MATRIX */

export let matrix = generateEmptyMatrix(100, 100);

export const undoHistory: number[][][] = [];

export const updateHistory = () => {
  if (undoHistory.length === MAX_UNDO_HISTORY_LENGTH) {
    undoHistory.shift();
  }
  // TO DO - diff current state and last history item
  // and skip update if identical
  const copiedMatrix = copyMatrix(matrix!);
  undoHistory.push(copiedMatrix);
};

export const undo = () => {
  setState({ pause: true });
  if (undoHistory.length === 0) return;
  const lastState = undoHistory[undoHistory.length - 1];
  const lastStateCopy = copyMatrix(lastState);
  matrix = lastStateCopy;
  undoHistory.pop();
};

export const transposeMatrix = () => {
  if (!state?.selectedPattern?.matrix) return;
  const copy = copyMatrix(state.selectedPattern.matrix);
  const rotated = copy[0].map((val, index) =>
    copy.map((row) => row[index]).reverse()
  );
  setState({
    selectedPattern: {
      ...state.selectedPattern,
      matrix: rotated,
    },
  });
};

export const placePattern = (mouseY: number, mouseX: number) => {
  if (!state.selectedPattern) return;

  const patternMatrix = state.selectedPattern.matrix;

  const yOffset = patternMatrix.length - 1;
  const xOffset = patternMatrix[0].length - 1;

  let y = 0;
  while (y < patternMatrix.length) {
    let x = 0;
    while (x < patternMatrix[y].length) {
      const cell = patternMatrix[y][x];
      if (cell === 1) {
        const yTarget = mouseY - yOffset + y;
        const xTarget = mouseX - xOffset + x;
        matrix[yTarget][xTarget] = cell;
      }
      x++;
    }
    y++;
  }
};

export const raiseCell = (y: number, x: number) => {
  matrix[y][x] = 1;
};

export const clearMatrix = () => {
  setState({ pause: true });
  updateHistory();
  matrix = generateEmptyMatrix(100, 100);
};

export const randomizeMatrix = () => {
  setState({ pause: true });
  updateHistory();
  matrix = generateRandomMatrix(100, 100);
};

export const tick = () => {
  matrix = updateMatrix(matrix);
};

export const step = () => {
  setState({ pause: true });
  tick();
};

const ticker = () => {
  if (state.pause === false) {
    tick();
  }
  setTimeout(ticker, 50);
};

ticker();
