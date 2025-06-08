import { React, useState, useEffect, useCallback } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

function AlbumModal({
  selectedCard,
  setSelectedCard,
  isAlbumModalOpen,
  setIsAlbumModalOpen,
  modalTitle,
  saveButtonLabel,
  albums,
  setAlbums,
}) {
  const [modalAlbums, setModalAlbums] = useState({
    title: '',
  });

  const handleOpenModal = useCallback(() => {
    setModalAlbums({
      title: selectedCard?.title || '',
    });
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setModalAlbums((prevmodalAlbums) => ({
      ...prevmodalAlbums,
      [name]: value,
    }));
  };

  const handleCloseModal = () => {
    setIsAlbumModalOpen(false);
    if (selectedCard) {
      setSelectedCard(null);
    }
  };

  const handleSaveClick = () => {
    //Updating album
    if (selectedCard && selectedCard.id) {
      fetch(`https://jsonplaceholder.typicode.com/albums/${selectedCard.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...modalAlbums,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((updatedAlbum) => {
          // data returned from the server after successfull updation
          return updatedAlbum.json();
        })
        .then((res) => {
          //removing the previous card which is updated now
          const oldData = albums.filter((album) => album.id !== res.id);
          const newData = {
            ...res,
          };
          setAlbums([newData, ...oldData]);
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
          ...modalAlbums,
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
          setAlbums((prevalbums) => [newData, ...prevalbums]);
          handleCloseModal();
        });
    }
  };

  // to show the data initially in the modal
  useEffect(() => {
    handleOpenModal();
  }, [isAlbumModalOpen, selectedCard, handleOpenModal]);

  return (
    <Modal open={isAlbumModalOpen} onClose={handleCloseModal}>
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
          border: '2px solid #000',
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
            value={modalAlbums.title}
            onChange={handleInputChange}
            fullWidth
            margin='normal'
            sx={{ width: '100%', m: 1 }}
          />
          <Box sx={{ display: 'flex' }}>
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

export default AlbumModal;
