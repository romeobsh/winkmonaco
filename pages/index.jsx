import React, { useContext } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { Box } from "@mui/material";
import HeroContent from "@/components/Home/HeroContent";
import HowToHelp from "@/components/Home/HowToHelp";
import LatestNews from "@/components/Home/LatestNews";

const Home = ({ articles }) => {
  const { language } = useContext(LanguageContext);

  return (
    <Box
      sx={{
        maxWidth: { xs: "600px", md: "1050px" },
        width: "100%",
        margin: "1.2rem auto",
        justifyContent: "center",
        textAlign: "center",
      }}>
      <HeroContent language={language} />
      {articles.length > 0 && <LatestNews language={language} articles={articles} />}
      <HowToHelp language={language} />
    </Box>
  );
};

export default Home;

export async function getServerSideProps() {
  try {
    const { data } = await (await fetch(`/api/articles/latest`)).json();
    return {
      props: {
        articles: data || [],
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        articles: [], // Fallback empty array
      },
    };
  }
}
