import { React, useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CircularProgress,
  Typography,
  Box,
  Container,
} from '@mui/material';
import Navbar from '../commonComponent/Navbar';

function Comments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { postId } = useParams();

  let USERS_COMMENTS_API = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;

  const fetchComments = useCallback(async () => {
    const res = await fetch(USERS_COMMENTS_API);
    const data4 = await res.json();
    setComments(data4);
  }, [USERS_COMMENTS_API]);

  useEffect(() => {
    try {
      fetchComments();
    } catch (error) {
      console.log('Error in fetching albums');
    } finally {
      setLoading(false, fetchComments);
    }
  }, [postId, fetchComments]);

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
      <Container>
        <Typography
          variant='h4'
          sx={{
            color: 'black',
            fontWeight: 500,
            textAlign: 'center',
            margin: 3,
          }}
        >
          COMMENTS
        </Typography>
        <Container sx={{ display: 'flex', gap: 5 }}></Container>
        {comments?.map((comment) => (
          <Card
            key={comment.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 'full',
              height: '9rem',
              padding: 5,
              margin: 5,
              boxShadow: '0 20px 20px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography>POST ID:{comment.postId}</Typography>
            <Typography>Message: {comment.body}</Typography>
            <Typography>By: {comment.name}</Typography>
            <Typography>({comment.email})</Typography>
          </Card>
        ))}
      </Container>
    </Container>
  );
}

export default Comments;
