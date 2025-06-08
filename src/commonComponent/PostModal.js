import { React, useState, useEffect, useCallback } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { TextareaAutosize, Button } from '@mui/material';

function PostModal({
  selectedCard,
  setSelectedCard,
  isPostModalOpen,
  setIsPostModalOpen,
  modalTitle,
  saveButtonLabel,
  posts,
  setPosts,
}) {
  const [modalPost, setModalPost] = useState({
    title: '',
    body: '',
  });
  const handleCloseModal = () => {
    setIsPostModalOpen(false);
    if (selectedCard) {
      setSelectedCard(null);
    }
  };

  const handleOpenModal = useCallback(() => {
    setModalPost({
      title: selectedCard?.title || '',
      body: selectedCard?.body || '',
    });
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setModalPost((prevmodalPost) => ({
      ...prevmodalPost,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    //Updating user data
    if (selectedCard && selectedCard.id) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${selectedCard.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...modalPost,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((updatedPost) => {
          // data returned from the server after successfull updation
          return updatedPost.json();
        })
        .then((res) => {
          //removing the previous card which is updated now
          const oldData = posts.filter((post) => post.id !== res.id);
          const newData = {
            ...res,
          };
          setPosts([newData, ...oldData]);
          handleCloseModal();
        })
        .catch((error) => {
          console.error('Error updating user:', error);
        });
    } else {
      // New album, add data
      fetch(`https://jsonplaceholder.typicode.com/posts`, {
        method: 'POST',
        body: JSON.stringify({
          ...modalPost,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          const newData = {
            ...json,
          };
          setPosts((prevposts) => [newData, ...prevposts]);
          handleCloseModal();
        });
    }
  };

  // to show the data initially in the modal
  useEffect(() => {
    handleOpenModal();
  }, [isPostModalOpen, selectedCard, handleOpenModal]);

  return (
    <Modal open={isPostModalOpen} onClose={handleCloseModal}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '30%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          //   border: '2px solid #000',
          p: 3,
        }}
      >
        <Typography variant='h6' component='h2' sx={{ textAlign: 'center' }}>
          {modalTitle}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <TextField
            label='Title'
            name='title'
            value={modalPost.title}
            onChange={handleInputChange}
            margin='normal'
            sx={{ width: '100%', m: 1 }}
          />

          <TextareaAutosize
            name='body'
            value={modalPost.body}
            onChange={handleInputChange}
            rowsMin={4}
            placeholder='Body'
            style={{
              width: '90%',
              minHeight: 100,
              padding: '10px',
              marginTop: '8px',
            }}
          />
          <Box sx="display:'flex">
            <Button
              onClick={handleSaveClick}
              variant='contained'
              color='primary'
              sx={{ margin: 1 }}
            >
              {saveButtonLabel}
            </Button>
            <Button
              onClick={handleCloseModal}
              variant='outlined'
              sx={{ margin: 1 }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default PostModal;
