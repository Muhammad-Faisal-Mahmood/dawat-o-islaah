import { useLanguage } from "../../../../context/LanguageContext";
import Item from "./Item";

const MenuItems = () => {
  const { language } = useLanguage();

  // Updated list of menu items (no options)
  const items = [
    { name: "home" },
    { name: "alQuran" },
    { name: "alHadith" },
    { name: "islamicBooks" },
    { name: "islamicTools" },
    { name: "masnoonDuas" },
    { name: "masail" },
    { name: "questionAnswer" },
  ];

  // Reverse items array if language is 'ur'
  const renderedItems = language === "ur" ? [...items].reverse() : items;

  return (
    <div className="flex items-center space-x-8">
      {renderedItems.map((item) => (
        <Item key={item.name} item={item.name} />
      ))}
    </div>
  );
};

export default MenuItems;
