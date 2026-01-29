import { useState } from "react";
import { plantList } from "../datas/plantList";
import PlantItem from "./ui/PlantItem";
import Categories from "./Categories";
import type { CartItem } from "../types/cart";
import type { ActiveCategory, Category } from "../types/categories";
import type { Plant } from "../types/plant";
import "../styles/ShoppingList.css";

function ShoppingList({
  // cart,
  addToCart,
}: {
  cart: CartItem[];
  addToCart: (plant: Plant) => void;
}) {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>("");
  const categories = plantList.reduce(
    (acc, plant) =>
      acc.includes(plant.category) ? acc : acc.concat(plant.category),
    [] as Category[],
  );

  const handleAddToCart = (plant: Plant) => {
    addToCart(plant);
  };

  return (
    <div className="lmj-shopping-list">
      <Categories
        categories={categories}
        setActiveCategory={setActiveCategory}
        activeCategory={activeCategory}
      />

      <ul className="lmj-plant-list">
        {plantList.map((plant) =>
          !activeCategory || activeCategory === plant.category ? (
            <li key={plant.id}>
              <PlantItem
                id={plant.id}
                cover={plant.cover}
                name={plant.name}
                water={plant.water}
                light={plant.light}
                price={plant.price}
                onAddToCart={() => handleAddToCart(plant)}
              />
            </li>
          ) : null,
        )}
      </ul>
    </div>
  );
}

export default ShoppingList;
