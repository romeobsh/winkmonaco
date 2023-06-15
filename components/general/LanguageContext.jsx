// LanguageContext.js
import React, { createContext, useState } from "react";

// Crée le contexte de langue
export const LanguageContext = createContext();

// Crée un composant fournisseur pour envelopper votre application avec le contexte
export const LanguageProvider = ({ children }) => {
  // Définit l'état de la langue avec une valeur initiale
  const [language, setLanguage] = useState("fr");

  // Fonction pour mettre à jour la langue
  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  // Valeur fournie par le contexte
  const contextValue = {
    language,
    changeLanguage,
  };

  // Rendu des composants enfants avec le contexte fourni
  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
};
