import type { Category } from "./categories";

export type Plant = {
  id: string;
  name: string;
  category: Category;
  light: 1 | 2 | 3;
  water: 1 | 2 | 3;
  cover: string;
  price: number;
  description: string;
};
