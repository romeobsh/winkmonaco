import HeroContent from "@/components/Home/HeroContent";
import HowToHelp from "@/components/Home/HowToHelp";
import LatestNews from "@/components/Home/LatestNews";
import { Box } from "@mui/material";
import React from "react";

const Home = ({ articles }) => {
  return (
    <Box
      sx={{
        maxWidth: { xs: "600px", md: "1050px" },
        width: "100%",
        margin: "1.2rem auto",
        justifyContent: "center",
        textAlign: "center",
      }}>
      <HeroContent />
      {articles.length > 0 && <LatestNews articles={articles} />}
      <HowToHelp />
    </Box>
  );
};

export default Home;

export async function getServerSideProps() {
  try {
    const { data } = await (await fetch(process.env.NEXTAUTH_URL + `/api/articles/latest`)).json();
    return {
      props: {
        articles: data || [], // Assuming data is an array and you need the first item
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        articles: [], // Fallback empty object
      },
    };
  }
}
