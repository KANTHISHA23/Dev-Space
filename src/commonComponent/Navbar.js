import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  ButtonGroup,
} from '@mui/material';
// import { makeStyles } from '@mui/styles';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// const theme = createTheme({
//   secondary: purple,
// });

// const useStyles = makeStyles({
//   navbar: {
//     color: 'white',
//   },
// });

function Navbar() {
  // const classes = useStyles();
  return (
    <AppBar position='fixed' sx={{ height: '5rem' }}>
      <Toolbar sx={{ display: 'flex', gap: 70, alignItems: 'center' }}>
        <Link to='/' sx={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography
            variant='h4'
            sx={{
              marginLeft: 25,
              textDecoration: 'none',
              fontFamily: 'pacifico',
            }}
          >
            DevSpace
          </Typography>
        </Link>
        <ButtonGroup sx={{ display: 'flex', gap: 5 }}>
          <Button
            variant='primary'
            component={Link}
            to='/users'
            color='inherit'
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                transform: 'scale(1.1)',
              },
            }}
          >
            USERS
          </Button>
          <Button
            variant='primary'
            component={Link}
            to='/posts'
            color='inherit'
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                transform: 'scale(1.1)',
              },
            }}
          >
            POSTS
          </Button>
          <Button
            variant='primary'
            component={Link}
            to='/albums'
            color='inherit'
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                transform: 'scale(1.1)',
              },
            }}
          >
            ALBUMS
          </Button>
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
