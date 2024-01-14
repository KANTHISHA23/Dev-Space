import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function UserModal({
  selectedUser,
  setSelectedUser,
  modalTitle,
  saveButtonLabel,
  isOpen,
  setIsOpen,
  usersData,
  setUsersData,
}) {
  const [modalUserData, setModalUserData] = useState({
    name: '',
    email: '',
    street: '',
    suite: '',
    city: '',
    zipcode: '',
    phoneNo: '',
    website: '',
    companyName: '',
    companyCatchPhrase: '',
    bs: '',
  });
  const handleOpenModal = () => {
    setModalUserData({
      name: selectedUser?.name || '',
      email: selectedUser?.email || '',
      street: selectedUser?.address?.street || '', //selectedUser.address is an object, if it is null or undefined it will not throw an error
      suite: selectedUser?.address?.suite || '',
      city: selectedUser?.address?.city || '',
      zipcode: selectedUser?.address?.zipcode || '',
      phoneNo: selectedUser?.phone || '',
      website: selectedUser?.website || '',
      companyName: selectedUser?.company?.name || '',
      companyCatchPhrase: selectedUser?.company?.catchPhrase || '',
      bs: selectedUser?.company?.bs || '',
    });
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    if (selectedUser) {
      setSelectedUser(null);
    }
  };

  const handleSaveClick = () => {
    //Updating user data
    if (selectedUser && selectedUser.id) {
      fetch(`https://jsonplaceholder.typicode.com/users/${selectedUser.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...modalUserData,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((updatedUser) => {
          // data returned from the server after successfull updation
          return updatedUser.json();
        })
        .then((res) => {
          //removing the previous card which is updated now
          const oldData = usersData.filter((item) => item.id !== res.id);
          const newData = {
            ...res,
            phone: res.phoneNo,
            address: {
              street: res.street,
              suite: res.suite,
              city: res.city,
              zipCode: res.zipCode,
            },
            company: {
              name: res.companyName,
              bs: res.bs,
              catchPhrase: res.companyCatchPhrase,
            },
          };
          setUsersData([newData, ...oldData]);
          handleCloseModal();
        })
        .catch((error) => {
          console.error('Error updating user:', error);
        });
    } else {
      // New user, add data
      fetch(`https://jsonplaceholder.typicode.com/users`, {
        method: 'POST',
        body: JSON.stringify({
          ...modalUserData,
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
            phone: json.phoneNo,
            address: {
              street: json.street,
              suite: json.suite,
              city: json.city,
              zipCode: json.zipCode,
            },
            company: {
              name: json.companyName,
              bs: json.bs,
              catchPhrase: json.companyCatchPhrase,
            },
          };
          setUsersData((prevUsersData) => [newData, ...prevUsersData]);
          handleCloseModal();
        });
      // .then((response) => response.json())
      // .then((data) => {
      //   console.log('Added new user:', data);
      //   // Handle the added data as needed
      // })
      // .catch((error) => {
      //   console.error('Error adding new user:', error);
      //   // Handle the error
      // });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setModalUserData((prevModalUserData) => ({
      ...prevModalUserData,
      [name]: value,
    }));
  };

  // Call the handleOpenModal callback whenever the modal is opened from card or home page component
  useEffect(() => {
    handleOpenModal();
  }, [isOpen, selectedUser]); //will run if either isOpen or user changes between renders

  return (
    <Modal open={isOpen} onClose={handleCloseModal}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '50%',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          p: 5,
        }}
      >
        <Typography variant='h6' component='h2' sx={{ textAlign: 'center' }}>
          {modalTitle}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            label='Name'
            name='name'
            value={modalUserData.name}
            onChange={handleInputChange}
            fullWidth
            margin='normal'
            sx={{ width: '45%', m: 1 }}
          />
          <TextField
            label='Email'
            name='email'
            value={modalUserData.email}
            onChange={handleInputChange}
            fullWidth
            margin='normal'
            sx={{ width: '45%', m: 1 }}
          />
          <TextField
            label='Street'
            name='street'
            value={modalUserData.street}
            onChange={handleInputChange}
            fullWidth
            margin='normal'
            sx={{ width: '45%', m: 1 }}
          />
          <TextField
            label='Suite'
            name='suite'
            value={modalUserData.suite}
            onChange={handleInputChange}
            fullWidth
            margin='normal'
            sx={{ width: '45%', m: 1 }}
          />
          <TextField
            label='City'
            name='city'
            value={modalUserData.city}
            onChange={handleInputChange}
            fullWidth
            margin='normal'
            sx={{ width: '45%', m: 1 }}
          />
          <TextField
            label='Zipcode'
            name='zipcode'
            value={modalUserData.zipcode}
            onChange={handleInputChange}
            fullWidth
            margin='normal'
            sx={{ width: '45%', m: 1 }}
          />
          <TextField
            label='Phone No'
            name='phoneNo'
            value={modalUserData.phoneNo}
            onChange={handleInputChange}
            fullWidth
            margin='normal'
            sx={{ width: '45%', m: 1 }}
          />
          <TextField
            label='Website'
            name='website'
            value={modalUserData.website}
            onChange={handleInputChange}
            fullWidth
            margin='normal'
            sx={{ width: '45%', m: 1 }}
          />
          <TextField
            label='Company Name'
            name='companyName'
            value={modalUserData.companyName}
            onChange={handleInputChange}
            fullWidth
            margin='normal'
            sx={{ width: '45%', m: 1 }}
          />
          <TextField
            label='Company Catch Phrase'
            name='companyCatchPhrase'
            value={modalUserData.companyCatchPhrase}
            onChange={handleInputChange}
            fullWidth
            margin='normal'
            sx={{ width: '45%', m: 1 }}
          />
          <TextField
            label='Company Bs'
            name='bs'
            value={modalUserData.bs}
            onChange={handleInputChange}
            fullWidth
            margin='normal'
            sx={{ width: '45%', m: 1 }}
          />
        </Box>

        <Button onClick={handleSaveClick} variant='contained' color='primary'>
          {saveButtonLabel}
        </Button>
        <Button onClick={handleCloseModal} variant='outlined'>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
}

export default UserModal;
