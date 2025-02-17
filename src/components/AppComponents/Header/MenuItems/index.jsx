import { useLanguage } from "../../../../context/LanguageContext";
import Item from "./Item";

const MenuItems = () => {
  const { language } = useLanguage();

  // List of items with corresponding options
  const items = [
    { name: "home", options: [] },
    { name: "quran", options: [] },
    { name: "books", options: ["islamicBooks"] },
    {
      name: "islamicCalculator",
      options: [
        "namazTimings",
        "zakatCalculator",
        "qiblaDirection",
        "inheritanceCalculator",
        "nearestMosque",
      ],
    },
    { name: "masnoonDuas", options: ["masail"] },
    { name: "questionsAndAnswers", options: [] },
  ];

  // Reverse items array if language is 'ur'
  const renderedItems = language === "ur" ? [...items].reverse() : items;

  return (
    <div className="flex items-center space-x-8">
      {renderedItems.map((item) => (
        <Item key={item.name} item={item.name} options={item.options} />
      ))}
    </div>
  );
};

export default MenuItems;
