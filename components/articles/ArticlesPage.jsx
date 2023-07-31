import React, { useState, useEffect } from "react";
import { Typography, Box, Fade, Grid, Pagination } from "@mui/material";
import Translation from "../general/Translation";
import ArticlesLoading from "./ArticlesLoading";
import { useRouter } from "next/router";
import { DateFilter } from "./DateFilter";
import { ArticleCard } from "./ArticleCard";
import { filterByDate } from "@/lib/handlers/filterByDate";
import NoResults from "./NoResults";
import dayjs from "dayjs";

export const ArticlesPage = ({ data, loading, language }) => {
  // Pagination state
  const [page, setPage] = useState(1);
  const articlesPerPage = 8;

  const [selectedStartDate, setSelectedStartDate] = useState(dayjs(new Date(2023, 0)));
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const router = useRouter();

  // Calculate the index of the first and last articles on the current page
  const indexOfLastArticle = page * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;

  const handleClick = (id) => {
    router.push(`/articles/${id}`);
  };

  useEffect(() => {
    const sortedArticles = filterByDate(data, selectedStartDate, selectedEndDate);
    setFilteredData(sortedArticles);
    setPage(1);
  }, [data, selectedStartDate, selectedEndDate]);

  // Update the list of articles based on the current page
  const currentArticles = !loading ? filteredData.slice(indexOfFirstArticle, indexOfLastArticle) : [];

  return (
    <Fade in={true} timeout={1000}>
      <Box sx={{ maxWidth: { xs: "600px", md: "1200px" }, width: "100%", margin: "1.2rem auto", justifyContent: "center", textAlign: "center" }}>
        <Typography variant='h2' mb={3}>
          <Translation tKey='articles.title' lang={language} />
        </Typography>
        <Grid container>
          {loading ? (
            <ArticlesLoading />
          ) : !loading && data.length === 0 ? (
            <NoResults language={language} />
          ) : (
            <React.Fragment>
              <DateFilter
                selectedStartDate={selectedStartDate}
                selectedEndDate={selectedEndDate}
                handleStartDateChange={setSelectedStartDate}
                handleEndDateChange={setSelectedEndDate}
                language={language}
              />
              {currentArticles.length === 0 && <NoResults filter language={language} />}
              {currentArticles.map((article) => (
                <ArticleCard key={article.title} article={article} handleClick={handleClick} language={language} />
              ))}
              {/* Pagination */}
              <Grid item xs={12} sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                <Pagination
                  count={Math.ceil(data.length / articlesPerPage)}
                  page={page}
                  onChange={(e, val) => setPage(val)}
                  size='large'
                  color='primary'
                  showFirstButton
                  showLastButton
                  siblingCount={1}
                  boundaryCount={1}
                />
              </Grid>
            </React.Fragment>
          )}
        </Grid>
      </Box>
    </Fade>
  );
};
