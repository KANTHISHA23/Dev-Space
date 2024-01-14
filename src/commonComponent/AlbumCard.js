import React from 'react';
import { Card, CardContent, Container, Typography } from '@mui/material';

function AlbumCard({ albums }) {
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
      {albums.map((album) => (
        <Card
          key={album.id}
          sx={{
            width: '10rem',
            height: '12rem',
            boxShadow: '0 20px 20px rgba(0, 0, 0, 0.1)',
            backgroundImage: `url('https://png.pngtree.com/thumb_back/fh260/back_our/20190623/ourmid/pngtree-blue-geometric-business-minimalistic-business-card-background-image_237858.jpg')`,
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
              fontFamily: 'poppins,sans-serif',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography>{album.userId}</Typography>
            <Typography sx={{ fontWeight: 600 }}>{album.title}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default AlbumCard;
