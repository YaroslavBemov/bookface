import React from 'react'

import Article from '../components/Article'

import { Box, Container, Grid } from '@material-ui/core'

const Articles = () => {

  const getArticles = () => {
    let articles = []
    for (let i = 0; i < 15; i++) {
      articles.push(<Grid item md={12} xs={12}><Article/></Grid>)
    }

    return articles
  }

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Grid
          container
          spacing={3}
        >
          {getArticles().map(article => (
            <>{article}</>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}

export default Articles
