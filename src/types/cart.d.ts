export type CartItem = {
  name: string;
  category: Category;
  id: string;
  light: 1 | 2 | 3;
  water: 1 | 2 | 3;
  cover: string;
  price: number;
  description: string;
  amount: number;
};
