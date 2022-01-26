export type Matrix = number[][];

const getRandomCellState = () => (Math.random() <= 0.2 ? 1 : 0);

export const generateRandomMatrix = (
  yLength: number,
  xLength: number
): Matrix => {
  const matrix = [];
  let i = 0;
  while (i < yLength) {
    const row = [];
    let j = 0;
    while (j < xLength) {
      const cell = getRandomCellState();
      row.push(cell);
      j++;
    }
    matrix.push(row);
    i++;
  }
  return matrix;
};

export const generateEmptyMatrix = (
  yLength: number,
  xLength: number
): Matrix => {
  const matrix = [];
  let i = 0;
  while (i < yLength) {
    const row = [];
    let j = 0;
    while (j < xLength) {
      const cell = 0;
      row.push(cell);
      j++;
    }
    matrix.push(row);
    i++;
  }
  return matrix;
};

function getCell(matrix: number[][], y: number, x: number): number {
  return matrix[(y + matrix.length) % matrix.length][
    (x + matrix.length) % matrix.length
  ];
}

function getCellCoords(matrix: number[][], y: number, x: number) {
  return {
    x: (x + matrix.length) % matrix.length,
    y: (y + matrix.length) % matrix.length,
  };
}

const getAdjacentCellCoords = (matrix: number[][], y: number, x: number) => {
  // Directions are clockwise
  return [
    getCellCoords(matrix, y - 1, x),
    getCellCoords(matrix, y - 1, x + 1),
    getCellCoords(matrix, y, x + 1),
    getCellCoords(matrix, y + 1, x + 1),
    getCellCoords(matrix, y + 1, x),
    getCellCoords(matrix, y + 1, x - 1),
    getCellCoords(matrix, y, x - 1),
    getCellCoords(matrix, y - 1, x - 1),
  ];
};

const liveAdjacentCellCount = (
  matrix: number[][],
  y: number,
  x: number
): number => {
  // Directions are clockwise
  return (
    getCell(matrix, y - 1, x) +
    getCell(matrix, y - 1, x + 1) +
    getCell(matrix, y, x + 1) +
    getCell(matrix, y + 1, x + 1) +
    getCell(matrix, y + 1, x) +
    getCell(matrix, y + 1, x - 1) +
    getCell(matrix, y, x - 1) +
    getCell(matrix, y - 1, x - 1)
  );
};

const getNextCellState = (
  matrix: number[][],
  y: number,
  x: number,
  liveNeighbours: number
) => {
  // survives
  if (matrix[y][x] === 1 && (liveNeighbours === 2 || liveNeighbours === 3)) {
    return 1;
  }
  // reborn
  if (matrix[y][x] === 0 && liveNeighbours === 3) {
    return 1;
  }
  // dies
  return 0;
};

export const copyMatrix = (matrix: number[][]) => [
  ...matrix.map((row) => row.slice(0)),
];

export const updateMatrix = (
  matrix: number[][],
  mouseCoords?: { x: number; y: number }
) => {
  const newMatrix = copyMatrix(matrix);

  matrix.forEach((row, y) => {
    row.forEach((_, x) => {
      newMatrix[y][x] = getNextCellState(
        matrix,
        y,
        x,
        liveAdjacentCellCount(matrix, y, x)
      );
    });
  });

  if (mouseCoords) {
    const { x, y } = mouseCoords;
    const adjacentCellCoords = getAdjacentCellCoords(matrix, y, x);

    const allCoords = [mouseCoords, ...adjacentCellCoords];

    allCoords.forEach((item) => {
      // if (newMatrix[item.y] === undefined) {
      //   console.log({ mouseCoords });
      //   console.log({ allCoords });
      // }
      newMatrix[item.y][item.x] = 1;
    });
  }

  return newMatrix;
};
