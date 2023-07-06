// Translation.js
import { translations } from "@/lib/translations/translations.js";
import { useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";

const Translation = ({ tKey }) => {
  const { language } = useContext(LanguageContext);

  // Split the tKey string into nested keys
  const keys = tKey.split(".");

  // Get the translation object for the current language
  const translationObject = translations[language];

  // Traverse the translation object to access the final translation
  const translation = keys.reduce((obj, key) => obj?.[key], translationObject);

  return <span>{translation}</span>;
};

export default Translation;
