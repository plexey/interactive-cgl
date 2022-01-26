import type { Component } from "solid-js";
import { onMount } from "solid-js";
import { draw, initializeCanvas, preDraw } from "../../canvas";
import {
  matrix,
  placePattern,
  raiseCell,
  state,
  updateHistory,
  updateLastMouseCoordinates,
} from "../../stores";
import { Mode } from "../../types";
import { canvasStyle } from "./style.css";

export const getMousePosition = (
  event: MouseEvent,
  canvas: HTMLCanvasElement
) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const worldGridHeight = matrix.length;
  const worldGridWidth = matrix[0].length;
  const adjustedX = Math.floor(x / (rect.width / worldGridWidth));
  const adjustedY = Math.floor(y / (rect.height / worldGridHeight));
  return { x: adjustedX, y: adjustedY };
};

function animate(
  ctx: CanvasRenderingContext2D,
  cellHeight: number,
  cellWidth: number
) {
  // clear the canvas
  preDraw(ctx, 1000, 1000);

  // draw the current matrix to canvas
  draw(ctx, matrix, 1000, 1000, cellHeight, cellWidth);

  requestAnimationFrame(() => animate(ctx, cellHeight, cellWidth));
}

const MainCanvas: Component = () => {
  let canvas;
  let ctx;
  let mouseActive: boolean = false;

  onMount(() => {
    initializeCanvas(canvas, 1000, 1000);
    ctx = canvas.getContext("2d");
    const cellHeight = 1000 / 100;
    draw(ctx, matrix, 1000, 1000, cellHeight, cellHeight);
    animate(ctx, cellHeight, cellHeight);
  });

  const handleClick = (event: MouseEvent) => {
    if (state.mode !== Mode.PATTERN_PLACE) return;
    const pos = getMousePosition(event, canvas);
    placePattern(pos.y, pos.x);
  };

  const handleMouseDown = () => {
    // update undo history
    updateHistory();
    mouseActive = true;
  };

  const handleMouseUp = () => {
    mouseActive = false;
  };

  const handleMouseMove = (event: MouseEvent) => {
    const pos = getMousePosition(event, canvas);
    updateLastMouseCoordinates({ y: pos.y, x: pos.x });
    if (mouseActive && state.mode === Mode.FREE_DRAW) {
      raiseCell(pos.y, pos.x);
    }
  };

  const handleMouseOut = () => {
    mouseActive = false;
    updateLastMouseCoordinates(null);
  };

  return (
    <canvas
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onmouseout={handleMouseOut}
      ref={canvas}
      class={canvasStyle}
      id="mainCanvas"
    ></canvas>
  );
};

export default MainCanvas;
