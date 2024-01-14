import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Modal,
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Container,
  ButtonGroup,
} from '@mui/material';
import UserModal from './UserModal';
import { blue } from '@mui/material/colors';

function UserCard({ usersData, setUsersData }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  console.log(usersData);

  const handleOpenDeleteModal = (userId) => {
    setIsDeleteModalOpen(true);
    setIdToDelete(userId);
  };

  const handleCloseDeleteModal = () => {
    setIdToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleDelete = () => {
    setUsersData((prevUsersData) =>
      prevUsersData.filter((user) => user.id !== idToDelete)
    );

    handleCloseDeleteModal();
  };

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  // const handleSave = () => {

  //   // if (selectedUser.id && modalUserData.id) {
  //   //   setUsersData((prevUsersData) => {
  //   //     return prevUsersData.map((user) =>
  //   //       user.id === selectedUser.id ? modalUserData : user
  //   //     );
  //   //   });
  //     // setUsersData(usersData);
  //     // setModalUserData(null);

  //     console.log('Save action performed');
  //     console.log('New user data:', modalUserData);
  //     //  setSelectedUser(updatedUsersData2);
  //     console.log('Save action performed');
  //     console.log('New user data:', modalUserData);
  //   }
  // };
  console.log(usersData);
  return (
    <Container
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 15,
        marginTop: 15,
      }}
    >
      {usersData?.map((user) => (
        <Card
          key={user.id}
          sx={{
            width: '25rem',
            height: '37rem',
            boxShadow: '0 20px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <CardHeader
            sx={{
              height: '10rem',
              backgroundImage: `url('https://www.bates.edu/wordpress/files/2016/07/pattern1.jpg')`,
              backgroundSize: 'cover',
            }}
          />
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: 5,
              position: 'relative',
            }}
          >
            <Avatar
              sx={{
                bgcolor: blue[900],
                margin: '-4.5rem 0rem 0 7.5rem',
                width: 65,
                height: 65,
                fontSize: '2rem',
              }}
            >
              {user.name.charAt(0)}
            </Avatar>
            <ButtonGroup
              sx={{
                marginRight: 2,
                position: 'absolute',
                top: 10,
                right: '0.5px',
                display: 'block',
                margin: 3,
              }}
            >
              <Button
                className='edit'
                onClick={() => handleOpenModal(user)}
                variant='contained'
                color='primary'
                sx={{ m: 2 }}
              >
                Edit
              </Button>

              <Button
                onClick={() => handleOpenDeleteModal(user.id)}
                variant='contained'
                color='error'
                className='delete'
                sx={{ m: 2 }}
              >
                Delete
              </Button>
            </ButtonGroup>

            <Link
              to={`/user/${user.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Typography
                variant='h5'
                sx={{
                  textAlign: 'center',
                  fontWeight: 500,
                  marginTop: 8,
                }}
              >
                {user.name}
              </Typography>

              <Box sx={{}}>
                <Typography sx={{ margin: 1 }}>
                  EMAIL:<span>{user.email}</span>
                </Typography>
                <Typography sx={{ margin: 1 }}>
                  ADDRESS:
                  <span>{`${user.address.street},${user.address.suite},${user.address.city},${user.address.zipcode}`}</span>
                </Typography>
                <Typography sx={{ margin: 1 }}>
                  PHONE NO:<span>{user.phone}</span>
                </Typography>
                <Typography sx={{ margin: 1 }}>
                  WEBSITE:<span>{user.website}</span>
                </Typography>
                <Typography sx={{ margin: 1 }}>
                  COMPANY NAME:
                  <span>{`${user.company.name},${user.company.catchPhrase},${user.company.bs}`}</span>
                </Typography>
              </Box>
            </Link>
          </CardContent>
        </Card>
      ))}
      <UserModal
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalTitle='Edit User'
        saveButtonLabel='Save'
        usersData={usersData}
        setUsersData={setUsersData}
      />

      <Modal open={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Typography variant='h6' component='h2'>
            Confirm Delete
          </Typography>
          <Typography>Are you sure you want to delete this user?</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button onClick={handleCloseDeleteModal} variant='outlined'>
              Cancel
            </Button>
            <Button onClick={handleDelete} variant='contained' color='error'>
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}

export default UserCard;
