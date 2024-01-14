import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import Navbar from '../commonComponent/Navbar';
import AlbumCard from '../commonComponent/AlbumCard';

function Albums() {
  let ALBUMS_API = 'https://jsonplaceholder.typicode.com/albums';
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchAlbums() {
    try {
      const res = await fetch(ALBUMS_API);
      const fetchAlbums = await res.json();
      console.log('ALBUMS', fetchAlbums);
      setAlbums(fetchAlbums);
    } catch (error) {
      console.log('Error in fetching posts');
    }
  }

  useEffect(() => {
    try {
      fetchAlbums();
    } finally {
      setLoading(false);
    }
  }, []);

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
            color: 'black',
            fontFamily: 'lobster',
            textAlign: 'center',
            padding: 3,
            color: '#1565c0',
          }}
        >
          ALBUMS
        </Typography>
        <AlbumCard albums={albums} />
      </Container>
    </>
  );
}

export default Albums;
