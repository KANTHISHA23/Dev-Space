import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CircularProgress,
  Typography,
  Box,
  Container,
  CardMedia,
  CardContent,
} from '@mui/material';
import Navbar from '../commonComponent/Navbar';

function Photos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { albumId } = useParams();
  let USERS_PHOTOS_API = `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`;
  async function fetchPhotos() {
    const res = await fetch(USERS_PHOTOS_API);
    const data5 = await res.json();
    setPhotos(data5);
  }

  useEffect(() => {
    try {
      setLoading(true);
      fetchPhotos();
    } catch (error) {
      console.log('Error in fetching albums');
    } finally {
      setLoading(false);
    }
  }, [albumId, fetchPhotos]);

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
    <Container
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 15,
      }}
    >
      <Navbar />
      <Typography
        variant='h4'
        sx={{
          color: 'black',
          fontWeight: 500,
          textAlign: 'center',
          margin: 3,
        }}
      >
        PHOTOS
      </Typography>

      <Container
        sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 10 }}
      >
        {photos?.map((photo) => (
          <Card
            key={photo.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: '45%',
              height: '20rem',
              boxShadow: '0 20px 20px rgba(0, 0, 0, 0.1)',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}
          >
            <CardContent sx={{ display: 'flex', gap: 3 }}>
              <CardMedia
                component='img'
                alt={photo.title}
                image={photo.url}
                sx={{ width: '10rem', height: '10rem' }}
              />
              <CardMedia
                component='img'
                alt={`${photo.title} thumbnail`}
                height='140'
                image={photo.thumbnailUrl}
                sx={{ width: '10rem', height: '10rem' }}
              />
            </CardContent>

            <Typography sx={{ fontWeight: 500 }}>Id:{photo.id}</Typography>
            <Typography sx={{ fontWeight: 500 }}>{photo.title}</Typography>
          </Card>
        ))}
      </Container>
    </Container>
  );
}
export default Photos;
