import shortUUID from "short-uuid";
import { Matrix } from "./matrix";

// still lifes

export type Pattern = {
  id: string;
  period: number;
  name: string;
  matrix: number[][];
};

const a = ([s]: TemplateStringsArray) =>
  s
    .replaceAll(" ", "")
    .split("\n")
    .filter(Boolean)
    .map((l) => l.split("").map(Number));

export const stillLifes: Pattern[] = [
  {
    id: shortUUID.generate(),
    name: "Block",
    period: 1,
    matrix: a`
      0000
      0110
      0110
      0000
    `,
  },
  {
    id: shortUUID.generate(),
    name: "Bee Hive",
    period: 1,
    matrix: a`
      000000
      001100
      010010
      001100
      000000
    `,
  },
  {
    id: shortUUID.generate(),
    name: "Tub",
    period: 1,
    matrix: a`
      00000
      00100
      01010
      00100
      00000
    `,
  },
  {
    id: shortUUID.generate(),
    name: "Boat",
    period: 1,
    matrix: a`
      00000
      00100
      01010
      00110
      00000
    `,
  },
  {
    id: shortUUID.generate(),
    name: "Snake",
    period: 1,
    matrix: a`
      000000
      010110
      011010
      000000
    `,
  },
  {
    id: shortUUID.generate(),
    name: "Ship",
    period: 1,
    matrix: a`
      00000
      01100
      01010
      00110
      00000
    `,
  },
  {
    id: shortUUID.generate(),
    name: "Aircraft Carrier",
    period: 1,
    matrix: a`
      00000000
      00000000
      00110000
      00100100
      00001100
      00000000
      00000000
    `,
  },
  {
    id: shortUUID.generate(),
    name: "Barge",
    period: 1,
    matrix: a`
      000000
      001000
      010100
      001010
      000100
      000000
    `,
  },
];

export const oscillators: Pattern[] = [
  {
    id: shortUUID.generate(),
    name: "Blinker",
    period: 2,
    matrix: a`
    00000
    00100
    00100
    00100
    00000`,
  },
  {
    id: shortUUID.generate(),
    name: "Toad",
    period: 2,
    matrix: a`
      000000
      000000
      001110
      011100
      000000
      000000
    `,
  },
  {
    id: shortUUID.generate(),
    name: "Beacon",
    period: 2,
    matrix: a`
    000000
    011000
    010000
    000010
    000110
    000000
    `,
  },
  {
    id: shortUUID.generate(),
    name: "Bipole",
    period: 2,
    matrix: a`
    0000000
    0110000
    0101000
    0000000
    0001010
    0000110
    0000000
    `,
  },
  {
    id: shortUUID.generate(),
    name: "Tttb",
    period: 2,
    matrix: a`
    000000000000
    001000000100
    010100001010
    001010010100
    000010010000
    000010010000
    000001100000
    000000000000
    `,
  },
  {
    id: shortUUID.generate(),
    name: "Clock",
    period: 2,
    matrix: a`
      000000
      000100
      010100
      001010
      001000
      000000
    `,
  },
  {
    id: shortUUID.generate(),
    name: "Pentadecathlon",
    period: 15,
    matrix: a`
      00000000000000000000
      00000000000000000000
      00000000000000000000
      00000000000000000000
      00000000000000000000
      00000000000000000000
      00000000000000000000
      00000001000010000000
      00000110111101100000
      00000001000010000000
      00000000000000000000
      00000000000000000000
      00000000000000000000
      00000000000000000000
      00000000000000000000
      00000000000000000000
      00000000000000000000
    `,
  },
  {
    id: shortUUID.generate(),
    name: "Pulsar",
    period: 3,
    matrix: a`
      00000000000000000
      00000100000100000
      00000100000100000
      00000110001100000
      00000000000000000
      01110011011001110
      00010101010101000
      00000110001100000
      00000000000000000
      00000110001100000
      00010101010101000
      01110011011001110
      00000000000000000
      00000110001100000
      00000100000100000
      00000100000100000
      00000000000000000
    `,
  },
  {
    id: shortUUID.generate(),
    name: "Tumbler",
    period: 14,
    matrix: a`
      00000000000
      00000000000
      00000000000
      00100000100
      01010001010
      01001010010
      00010001000
      00011011000
      00000000000
      00000000000
      00000000000
    `,
  },
  {
    id: shortUUID.generate(),
    name: "Queen Bee Shuttle",
    period: 14,
    matrix: a`
      0000000000000000000000000000
      0000000000000000000000000000
      0000000000000000000000000000
      0000000000000000000000000000
      0000000000000000000000000000
      0000000000001000000000000000
      0000000000101000000000000000
      0000000001010000000000000000
      0001100010010000000000011000
      0001100001010000000000011000
      0000000000101000000000000000
      0000000000001000000000000000
      0000000000000000000000000000
      0000000000000000000000000000
      0000000000000000000000000000
      0000000000000000000000000000
      0000000000000000000000000000
    `,
  },
];

export const spaceShips: Pattern[] = [
  {
    id: shortUUID.generate(),
    name: "Glider",
    period: 3,
    matrix: a`
      0000000
      0000000
      0001000
      0000100
      0011100
      0000000
      0000000
    `,
  },
  {
    id: shortUUID.generate(),
    name: "LWSS",
    period: 3,
    matrix: a`
      00000000
      00100100
      00000010
      00100010
      00011110
      00000000
      00000000
    `,
  },
];

export const patterns = [...stillLifes, ...oscillators, ...spaceShips];
