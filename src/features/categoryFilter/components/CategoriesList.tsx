import React, { useState, useEffect } from "react";
import categoriesList from "../../../data/categories.json";
import ListItem from "../../../components/ui/ListItem";
import List from "../../../components/ui/List";

const makeCategoryItemsArray = async () => {
  // Map over the categories and dynamically import each SVG icon
  const listItemsPromises = categoriesList.map(async (category, index) => {
    try {
      // Dynamically import the SVG icon
      const icon = await import(`../../../assets/svg/${category.iconName}.svg`);
      // Return the ListItem component once the icon is loaded
      return (
        <ListItem
          key={category._id || index}
          className="flex justify-start gap-5 items-center  border-gray-200 py-5 px-2 hover:bg-gray-100 hover:text-blue-300 transition-colors duration-200 ease-in-out cursor-pointer rounded-sm"
        >
          <span className="w-5">
            <img src={icon.default} alt={category.name} />
          </span>
          <span>{category.name}</span>
        </ListItem>
      );
    } catch (error) {
      console.error(
        `Error loading SVG icon for category ${category.name}:`,
        error
      );
      return (
        <ListItem key={category._id || index}>
          <span>{category.name}</span>
        </ListItem>
      );
    }
  });

  // Wait for all promises to resolve and return the array of list items
  return await Promise.all(listItemsPromises);
};

function CategoriesList() {
  const [items, setItems] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const itemsArray = await makeCategoryItemsArray();
      console.log(itemsArray);
      setItems(itemsArray);
    };

    fetchData();
  }, []);

  return (
    <List
      items={items}
      className="md:grid md:grid-cols-2 md:gap-0 md:gap-x-7 px-2"
    />
  );
}

export default CategoriesList;
