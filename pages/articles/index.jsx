import { LanguageContext } from "@/contexts/LanguageContext";
import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { fetchData } from "@/lib/handlers/fetchData";
import { ArticlesPage } from "@/components/articles/ArticlesPage";

const Articles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    fetchData("articles", setIsLoading, setArticles);
  }, []);

  return (
    <React.Fragment>
      <ArticlesPage loading={isLoading} data={articles} language={language} />
    </React.Fragment>
  );
};

export default Articles;
