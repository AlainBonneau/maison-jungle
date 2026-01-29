import { useState } from "react";
import { plantList } from "../datas/plantList";
import PlantItem from "./ui/PlantItem";
import Categories from "./Categories";
import type { CartItem } from "../types/cart";
import type { ActiveCategory, Category } from "../types/categories";
import "../styles/ShoppingList.css";

function ShoppingList({
  // cart,
  addToCart,
}: {
  cart: CartItem[];
  addToCart: (item: { name: string; price: number }) => void;
}) {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>("");
  const categories = plantList.reduce(
    (acc, plant) =>
      acc.includes(plant.category) ? acc : acc.concat(plant.category),
    [] as Category[],
  );

  const handleAddToCart = (name: string, price: number) => {
    addToCart({ name, price });
  };

  return (
    <div className="lmj-shopping-list">
      <Categories
        categories={categories}
        setActiveCategory={setActiveCategory}
        activeCategory={activeCategory}
      />

      <ul className="lmj-plant-list">
        {plantList.map(({ id, cover, name, water, light, price, category }) =>
          !activeCategory || activeCategory === category ? (
            <li key={id}>
              <PlantItem
                id={id}
                cover={cover}
                name={name}
                water={water}
                light={light}
                price={price}
                onAddToCart={() => handleAddToCart(name, price)}
              />
            </li>
          ) : null,
        )}
      </ul>
    </div>
  );
}

export default ShoppingList;
