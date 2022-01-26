import {
  BACKGROUND_COLOR,
  GRID_LINE_COLOR,
  HOVER_CELL_COLOR,
  HOVER_PATTERN_BACKGROUND,
  HOVER_PATTERN_FOREGROUND,
  LIVE_CELL_COLOR,
} from "./constants";
import { palette } from "./styles/palette";
import { lastMouseCoordinates, state } from "./stores";
import { Mode } from "./types";

type CTX = CanvasRenderingContext2D;

export const preDraw = (
  ctx: CTX,
  canvasHeight: number,
  canvasWidth: number
) => {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
};

// export const getCanvasById = (id: string): HTMLCanvasElement | null => {
//   return document.getElementById(id) as HTMLCanvasElement | null;
// };

// export const getMainCanvas = () => getCanvasById("mainCanvas");

type Point = {
  y: number;
  x: number;
};

const drawLine = (ctx: CTX, start: Point, end: Point) => {
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.strokeStyle = GRID_LINE_COLOR;
  ctx.stroke();
};

const drawColumns = (
  ctx: CTX,
  matrix: number[][],
  canvasHeight: number,
  canvasWidth: number
) => {
  const gridWidth = matrix[0].length;

  let i = 0;
  const columnWidth = Math.floor(canvasWidth / gridWidth);

  while (i < gridWidth) {
    const x = columnWidth * i;
    const start = { y: 0, x };
    const end = { y: canvasHeight, x };
    drawLine(ctx, start, end);
    i++;
  }
};

const drawRows = (
  ctx: CTX,
  matrix: number[][],
  canvasHeight: number,
  canvasWidth: number
) => {
  const gridHieght = matrix.length;

  let i = 0;
  const rowWidth = Math.floor(canvasHeight / gridHieght);

  while (i < gridHieght) {
    const y = rowWidth * i;
    const start = { x: 0, y };
    const end = { x: canvasWidth, y };
    drawLine(ctx, start, end);
    i++;
  }
};

export const drawRedBorder = (ctx: CTX) => {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(1000, 0);
  ctx.lineTo(1000, 1000);
  ctx.lineTo(0, 1000);
  ctx.lineTo(0, 0);
  ctx.strokeStyle = palette.red600;
  ctx.lineWidth = 10;
  ctx.stroke();
};

export const drawGrid = (
  ctx: CTX,
  matrix: number[][],
  canvasHeight: number,
  canvasWidth: number
) => {
  drawRows(ctx, matrix, canvasHeight, canvasWidth);
  drawColumns(ctx, matrix, canvasHeight, canvasWidth);
};

export const drawCells = (
  ctx: CTX,
  matrix: number[][],
  cellHeight: number,
  cellWidth: number
) => {
  const gridHeight = matrix.length;
  const gridWidth = matrix[0].length;

  let y = 0;
  while (y < gridHeight) {
    let x = 0;
    while (x < gridWidth) {
      const cell = matrix[y][x];
      if (cell === 1) {
        ctx.fillStyle = LIVE_CELL_COLOR;
        ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
      }
      x++;
    }
    y++;
  }
  return;
};

export const drawHoveredCell = (
  ctx: CTX,
  cellHeight: number,
  cellWidth: number
) => {
  if (!lastMouseCoordinates) return;
  if (state.mode !== Mode.FREE_DRAW) return;

  ctx.fillStyle = HOVER_CELL_COLOR;
  ctx.fillRect(
    lastMouseCoordinates.x * cellWidth,
    lastMouseCoordinates.y * cellHeight,
    cellWidth,
    cellHeight
  );
};

export const drawHoverPattern = (
  ctx: CTX,
  cellHeight: number,
  cellWidth: number
) => {
  const { mode, selectedPattern: pattern } = state;

  if (mode !== Mode.PATTERN_PLACE) return;
  if (!lastMouseCoordinates) return;
  if (!pattern) return;

  const yOffset = (pattern.matrix.length - 1) * cellHeight;
  const xOffset = (pattern.matrix[0].length - 1) * cellWidth;

  let y = 0;
  while (y < pattern.matrix.length) {
    let x = 0;
    while (x < pattern.matrix[y].length) {
      const cell = pattern.matrix[y][x];
      ctx.fillStyle =
        cell === 1 ? HOVER_PATTERN_FOREGROUND : HOVER_PATTERN_BACKGROUND;
      ctx.fillRect(
        lastMouseCoordinates.x * cellWidth + x * cellWidth - xOffset,
        lastMouseCoordinates.y * cellHeight + y * cellHeight - yOffset,
        cellWidth,
        cellHeight
      );
      x++;
    }
    y++;
  }
};

export const draw = (
  ctx: CTX,
  matrix: number[][],
  canvasHeight: number,
  canvasWidth: number,
  cellHeight: number,
  cellWidth: number
) => {
  drawCells(ctx, matrix, cellHeight, cellWidth);
  drawHoveredCell(ctx, cellHeight, cellWidth);
  drawHoverPattern(ctx, cellHeight, cellWidth);
  drawGrid(ctx, matrix, canvasHeight, canvasWidth);
  if (state.pause === true) {
    drawRedBorder(ctx);
  }
};

export const drawPreview = (
  ctx: CTX,
  matrix: number[][],
  canvasHeight: number,
  canvasWidth: number,
  cellHeight: number,
  cellWidth: number
) => {
  // clear canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  drawCells(ctx, matrix, cellHeight, cellWidth);
  drawGrid(ctx, matrix, canvasHeight, canvasWidth);
};

export const initializeCanvas = (
  canvas: HTMLCanvasElement,
  height: number,
  width: number
) => {
  canvas.style.backgroundColor = BACKGROUND_COLOR;
  canvas.width = width;
  canvas.height = height;
};
