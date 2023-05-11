import React from "react";
import fetch from "isomorphic-unfetch";

const Home = ({ articles, partners }) => {
  return (
    <React.Fragment>
      <h1>Welcome to the Association for the Visually Impaired</h1>
      {/* Render articles and partners */}
    </React.Fragment>
  );
};

export async function getServerSideProps() {
  const articlesRes = await fetch(process.env.API_URL + "/api/articles/view");
  const articles = await articlesRes.json();

  const partnersRes = await fetch(process.env.API_URL + "/api/partners/view");
  const partners = await partnersRes.json();

  return { props: { articles: articles.data, partners: partners.data } };
}

export default Home;
