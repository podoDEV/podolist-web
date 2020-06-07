import { PriorityType } from "./Priority";

export enum Color {
  GRAY_300 = "#A6A7B4",
  GRAY_500 = "#d1d1d1",

  PRIMARY = "#9e30fe",
  BLACK = "#000",
  RED = "#d0021b",
  ORANGE = "#f5a623",
  GREEN = "#7ed321",
  CYAN = "#50e3c2",
  BLUE = "#4a90e2",
  WHITE = "#fff"
}

export const PriorityColor = {
  [PriorityType.URGENT]: Color.RED,
  [PriorityType.HIGH]: Color.ORANGE,
  [PriorityType.MEDIUM]: Color.GREEN,
  [PriorityType.LOW]: Color.CYAN,
  [PriorityType.NONE]: Color.BLUE
};

export type ColorKey = keyof Color;
