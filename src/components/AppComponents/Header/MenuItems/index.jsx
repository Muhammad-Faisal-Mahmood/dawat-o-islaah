import { useLanguage } from "../../../../context/LanguageContext";
import Item from "./Item";

const MenuItems = ({ isMobile, isUser }) => {
  const { language } = useLanguage();

  // Base items always visible to everyone
  const baseItems = [
    { name: "home" },
    { name: "quran" },
    { name: "hadith" },
    { name: "islamicBooks" },
    { name: "masail" },
  ];

  // Items that depend on authentication status
  let authDependentItems = [];

  if (isUser) {
    authDependentItems = [{ name: "questionAnswer" }];
  } else if (!isUser && isMobile) {
    authDependentItems = [{ name: "login" }];
  }

  // Combine the base items with authentication-dependent items
  const items = [...baseItems, ...authDependentItems];

  // Handle Arabic/Urdu right-to-left ordering if needed
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
