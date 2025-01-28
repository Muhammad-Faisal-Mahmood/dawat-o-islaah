// src/context/LanguageContext.js
import { createContext, useState, useContext } from "react";

// Create the context for language management
const LanguageContext = createContext();

// LanguageProvider component that will provide language state and toggle function
export function LanguageProvider({ children }) {
  // Default language is English (en)
  const [language, setLanguage] = useState("en");

  // Function to toggle language between 'en' (English) and 'ur' (Urdu)
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ur" : "en"));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to access language context
export function useLanguage() {
  return useContext(LanguageContext);
}
