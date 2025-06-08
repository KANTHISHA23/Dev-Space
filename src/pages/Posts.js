import React, { useState, useEffect } from 'react';
import PostsCard from '../commonComponent/PostsCard';
import Navbar from '../commonComponent/Navbar';
import { Container, Typography, Box, CircularProgress } from '@mui/material';

function Posts() {
  let POSTS_API = 'https://jsonplaceholder.typicode.com/posts';
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchPosts() {
    try {
      const res = await fetch(POSTS_API);
      const fetchPosts = await res.json();
      console.log('POSTS', fetchPosts);
      setPosts(fetchPosts);
    } catch (error) {
      console.log('Error in fetching posts');
    }
  }

  useEffect(() => {
    try {
      fetchPosts();
    } finally {
      setLoading(false);
    }
  }, [fetchPosts]);

  if (loading) {
    return (
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
          transform: 'translate(-50%, -50%)',
          p: 5,
        }}
      >
        <Typography variant='h1'>Loading...</Typography>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Container sx={{ marginTop: '6rem', marginBottom: 10 }}>
        <Typography
          variant='h4'
          sx={{
            // color: 'black',
            fontFamily: 'lobster',
            textAlign: 'center',
            padding: 3,
            color: '#31698C',
          }}
        >
          POSTS
        </Typography>
        <PostsCard posts={posts} />
      </Container>
    </>
  );
}

export default Posts;
