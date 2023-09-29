import React, { useContext, useEffect, useState } from "react";
import { fetchData } from "@/lib/handlers/fetchData";
import { Box, Typography, useMediaQuery } from "@mui/material";
import ArticleLoading from "./ArticleLoading";
import { LanguageContext } from "@/contexts/LanguageContext";
import Image from "next/image";
import { renderTextWithLineBreaks } from "@/lib/renderTextWithLineBreaks";

const Article = ({ id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState({});
  const { language } = useContext(LanguageContext);

  const isMobile = useMediaQuery("(max-width:600px)"); // Check if the screen width is less than or equal to 600px

  useEffect(() => {
    fetchData("articles", setIsLoading, setArticle, id);
  }, [id]);

  return (
    <Box sx={{ maxWidth: { xs: "600px", md: "1200px" }, width: "100%", margin: "1.2rem auto", justifyContent: "center", textAlign: "center" }}>
      {isLoading && <ArticleLoading />}
      {!isLoading && (
        <React.Fragment>
          <Typography variant='h2' mb={1} sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
            {language === "en" ? article.enTitle : article.title}
          </Typography>
          <Typography variant='body2' sx={{ textAlign: "right" }} mb={2}>
            Publié le {new Date(article.createdAt).toLocaleDateString()}
          </Typography>
          <Typography mb={3}>{renderTextWithLineBreaks(language === "fr" ? article?.content?.trim() || "" : article?.enContent?.trim() || "")}</Typography>
          <Image
            src={article.imageUrl}
            style={{ objectFit: "cover", width: "100%", maxWidth: "800px", height: isMobile ? "10rem" : "18rem", borderRadius: "10px" }}
            alt='Image article'
            width={0}
            height={0}
            sizes='100vw'
            priority
          />
        </React.Fragment>
      )}
    </Box>
  );
};

export default Article;
