const { Typography, Box, Fade, Grid, Card, CardActionArea, CardMedia, CardContent } = require("@mui/material");
const { default: Translation } = require("../general/Translation");

export const ArticlesPage = ({ data, loading, language }) => {
  console.log(data);
  return (
    <Fade in={true} timeout={1000}>
      <Box sx={{ maxWidth: { xs: "600px", md: "1000px" }, width: "100%", margin: "1.2rem auto", justifyContent: "center", textAlign: "center" }}>
        <Typography variant='h2' mb={4}>
          <Translation tKey='articles.title' lang={language} />
        </Typography>
        <Grid container>
          {data.map((article) => (
            <Grid key={article.title} item xs={12} md={6} sx={{ padding: { xs: 0, md: "1rem" } }}>
              <Card>
                <CardActionArea>
                  <CardMedia component='img' height='140' image={article.imageUrl} alt='green iguana' />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                      {article.title}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {article.content}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Fade>
  );
};
