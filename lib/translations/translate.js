import { translations } from "./translations";

export const translate = ({ tKey, lang }) => {
  const language = lang || "fr";
  console.log(language);
  // Split the tKey string into nested keys
  const keys = tKey.split(".");

  // Get the translation object for the current language
  const translationObject = translations[language];

  // Traverse the translation object to access the final translation
  const translation = keys.reduce((obj, key) => obj?.[key], translationObject);

  console.log(translation);
  return translation;
};
