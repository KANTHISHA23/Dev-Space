import React, { useEffect, useState } from 'react';
import UserCard from '../commonComponent/UserCard';
import Navbar from '../commonComponent/Navbar';
import UserModal from '../commonComponent/UserModal';
import {
  Container,
  Box,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';

function Home() {
  const [usersData, setUsersData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  let USERS_API = 'https://jsonplaceholder.typicode.com/users';
  async function fetchUsersData() {
    try {
      const res = await fetch(USERS_API);
      const fetchData = await res.json();
      console.log('USERS', fetchData);
      setUsersData(fetchData);
    } catch (error) {
      console.log('Error in fetching data');
    }
  }

  useEffect(() => {
    try {
      fetchUsersData();
    } finally {
      setLoading(false);
    }
  }, [fetchUsersData]);

  function handleOpenModal() {
    console.log('Modal opened from HomePage component');
    setIsOpen(true);
  }

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
      <Container
        sx={{ width: '100vw', position: 'relative', marginBottom: 10 }}
      >
        <Button
          className='add-user-btn'
          onClick={handleOpenModal}
          variant='contained'
          sx={{
            float: 'right',
            position: 'relative',
            top: '0.2px',
            right: 1,
            margin: 3,
            marginTop: '0.2px',
            marginRight: '1px',
          }}
          startIcon={<PersonAddRoundedIcon />}
        >
          Add User
        </Button>
        <UserModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          user={null}
          modalTitle='Add User'
          saveButtonLabel='Add'
          usersData={usersData}
          setUsersData={setUsersData}
        />
        <Box sx={{ marginTop: 15 }}>
          <UserCard usersData={usersData} setUsersData={setUsersData} />
        </Box>
      </Container>
    </>
  );
}

export default Home;
