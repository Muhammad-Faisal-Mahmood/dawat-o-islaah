import { useLanguage } from "../../../../context/LanguageContext";
import Item from "./Item";

const MenuItems = ({ isMobile, isUser, closeMenu }) => {
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
  }

  // Combine the base items with authentication-dependent items
  const items = [...baseItems, ...authDependentItems];

  // Handle Arabic/Urdu right-to-left ordering if needed
  const renderedItems = language === "ur" ? [...items].reverse() : items;

  return (
    <div
      className={`flex ${
        isMobile ? "flex-col space-y-6" : "items-center space-x-8"
      }`}
    >
      {renderedItems.map((item) => (
        <div key={item.name} className="w-full">
          <Item closeMenu={closeMenu} item={item.name} isMobile={isMobile} />
        </div>
      ))}
    </div>
  );
};

export default MenuItems;
