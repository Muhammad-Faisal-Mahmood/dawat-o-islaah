import { useLanguage } from "../../../../context/LanguageContext";
import Item from "./Item";

const MenuItems = ({ isMobile }) => {
  const { language } = useLanguage();

  const items = [
    { name: "home" },
    { name: "alQuran" },
    { name: "alHadith" },
    { name: "islamicBooks" },
    { name: "masnoonDuas" },
    { name: "masail" },
    { name: "questionAnswer" },
  ];

  const renderedItems = language === "ur" ? [...items].reverse() : items;

  return (
    <div
      className={`flex ${
        isMobile ? "flex-col items-center" : "items-center space-x-8"
      }`}
    >
      {renderedItems.map((item, index) => (
        <div key={item.name} className="w-full">
          <Item item={item.name} />
          {/* Show dividers only in mobile view */}
          {isMobile && index !== renderedItems.length - 1 && (
            <div className="border-b border-neutral-300 w-full"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuItems;
