import { useLanguage } from "../../../context/LanguageContext";

const ToggleLanguage = () => {
  const { language, toggleLanguage } = useLanguage();
  return (
    <button
      onClick={toggleLanguage}
      className="p-2 bg-blue-500 text-white rounded"
    >
      {language === "en" ? "Switch to Urdu" : "انگریزی میں تبدیل کریں"}
    </button>
  );
};

export default ToggleLanguage;
