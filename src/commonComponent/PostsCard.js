import React from 'react';
import { Card, CardContent, Container, Typography } from '@mui/material';

function PostsCard({ posts }) {
  return (
    <Container
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 5,
        marginTop: 5,
      }}
    >
      {posts.map((post) => (
        <Card
          key={post.id}
          sx={{
            width: '20rem',
            height: '25rem',
            boxShadow: '0 20px 20px rgba(0, 0, 0, 0.1)',
            backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/020/609/817/non_2x/business-design-card-frame-border-post-banner-or-cover-empty-space-vector.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CardContent
            sx={{
              padding: 4,
              fontSize: 20,
              fontFamily: ' caveat, cursive',
            }}
          >
            <Typography variant='h6' sx={{ fontWeight: 600, margin: 1 }}>
              {post.title.toUpperCase()}
            </Typography>
            {post.body}
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default PostsCard;
