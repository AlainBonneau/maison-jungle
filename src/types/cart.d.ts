import type { Plant } from "./plant";

export type CartItem = Plant & {
  amount: number;
};
