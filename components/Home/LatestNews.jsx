import { translate } from "@/lib/translations/translate";
import { Grid, Typography } from "@mui/material";
import React from "react";
import { ArticleCard } from "../articles/ArticleCard";
import { useRouter } from "next/router";
import Link from "next/link";
import { Newspaper } from "@mui/icons-material";

const LatestNews = ({ articles, language }) => {
  const router = useRouter();

  const handleClick = (id) => {
    router.push(`/articles/${id}`);
  };

  return (
    <Grid container sx={{ maxWidth: "1050px", width: "100%", margin: "1.2rem auto", justifyContent: "center", textAlign: "center" }}>
      <Grid item xs={12}>
        <Typography variant='h4' mt={4} mb={2}>
          {translate({ tKey: "home.latestNews", lang: language })}
        </Typography>
      </Grid>
      {articles.map((article, i) => (
        <ArticleCard key={article._id} language={language} article={article} handleClick={handleClick} />
      ))}
      <Grid item xs={12} md={6} mt={2} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Newspaper sx={{ fontSize: "3rem", color: "primary.main", marginBottom: "1rem", display: { xs: "none", md: articles.length > 1 ? "none" : "flex" } }} />
        <Typography sx={{ padding: { xs: "0", md: "0 5rem" } }}>
          {translate({ tKey: "home.latestNewsText", lang: language })}
          <Link style={{ textDecoration: "none", color: "#22c6fe", fontWeight: 600 }} href='/articles'>
            {translate({ tKey: "nav.articles", lang: language })}
          </Link>{" "}
          !
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LatestNews;
