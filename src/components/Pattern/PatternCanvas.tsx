import { onMount } from "solid-js";

import { drawPreview, initializeCanvas } from "../../canvas";
import { copyMatrix, updateMatrix } from "../../matrix";
import { patternCanvasStyle } from "./style.css";

let previewSetTimeout: any;
let msInterval = 200;

const previewTicker = (
  ctx: CanvasRenderingContext2D,
  matrix: number[][],
  canvasHeight: number,
  canvasWidth: number,
  cellHeight: number,
  cellWidth: number
) => {
  let newMatrix = copyMatrix(matrix);
  const updatedMatrix = updateMatrix(newMatrix);
  drawPreview(ctx, matrix, canvasHeight, canvasWidth, cellHeight, cellWidth);
  previewSetTimeout = setTimeout(
    () =>
      previewTicker(
        ctx,
        updatedMatrix,
        canvasHeight,
        canvasWidth,
        cellHeight,
        cellWidth
      ),
    msInterval
  );
};

const PatternCanvas = (props: {
  patternPeriod: number;
  matrix: number[][];
}) => {
  let canvas;
  let ctx;

  const matrix = props.matrix;
  const matrixHeight = matrix.length;
  const matrixWidth = matrix[0].length;

  // define canvas dimensions
  const canvasHeight = matrixHeight * 16;
  const canvasWidth = matrixWidth * 16;

  // define cell dimensions
  const cellHeight = Math.floor(canvasHeight / matrixHeight);
  const cellWidth = Math.floor(canvasWidth / matrixWidth);

  onMount(() => {
    ctx = canvas.getContext("2d");
    initializeCanvas(canvas, canvasHeight, canvasWidth);
    drawPreview(ctx, matrix, canvasHeight, canvasWidth, cellHeight, cellWidth);
  });

  const handleMouseEnter = () => {
    if (props.patternPeriod <= 1) return;
    previewTicker(
      ctx,
      matrix,
      canvasHeight,
      canvasWidth,
      cellHeight,
      cellWidth
    );
  };

  const handleMouseLeave = () => {
    if (props.patternPeriod <= 1) return;
    clearTimeout(previewSetTimeout);
    drawPreview(ctx, matrix, canvasHeight, canvasWidth, cellHeight, cellWidth);
  };

  return (
    <canvas
      ref={canvas}
      class={patternCanvasStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    ></canvas>
  );
};

export default PatternCanvas;
