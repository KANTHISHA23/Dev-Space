import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Tab,
  Tabs,
  Box,
  Container,
  Typography,
  Button,
  Card,
  CircularProgress,
} from '@mui/material';
import Navbar from './Navbar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from './DeleteModal';
import PostModal from './PostModal';
import AlbumModal from './AlbumModal';

function UserProfile() {
  const [value, setValue] = useState(1);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(false);
  const [isDeletingPost, setIsDeletingPost] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const getRandomTime = () => {
    const randomDate = new Date();
    randomDate.setHours(Math.floor(Math.random() * 24));
    randomDate.setMinutes(Math.floor(Math.random() * 60));
    return randomDate.toLocaleString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handleOpenPostModal = (data) => {
    setSelectedCard(data);
    setIsPostModalOpen(true);
  };

  const handleOpenAlbumModal = (data) => {
    setSelectedCard(data);
    setIsAlbumModalOpen(true);
  };

  let USERS_DETAIL_API = `https://jsonplaceholder.typicode.com/users/${userId}`;
  async function fetchUser() {
    try {
      const res = await fetch(USERS_DETAIL_API);
      const data1 = await res.json();
      setUser(data1);
    } catch (error) {
      console.log('Error in fetching user');
    }
  }

  let USERS_POSTS_API = `https://jsonplaceholder.typicode.com/users/${userId}/posts`;

  async function fetchPosts() {
    try {
      const res = await fetch(USERS_POSTS_API);
      const data2 = await res.json();
      setPosts(data2);
    } catch (error) {
      console.log('Error in fetching posts');
    }
  }

  let USERS_ALBUMS_API = `https://jsonplaceholder.typicode.com/users/${userId}/albums`;

  async function fetchAlbums() {
    const res = await fetch(USERS_ALBUMS_API);
    const data3 = await res.json();
    setAlbums(data3);
  }

  useEffect(() => {
    try {
      setLoading(true);
      fetchAlbums();
    } catch (error) {
      console.log('Error in fetching albums');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    try {
      setLoading(true);
      fetchUser();
      fetchPosts();
    } catch (error) {
      console.log('Error in fetching albums');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const handleChange = (event, newValue) => setValue(newValue);

  const handleOpenDeleteModal = (Id) => {
    setIsDeleteModalOpen(true);
    setIdToDelete(Id);
  };

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
        flexDirection: 'column',
        // flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 5,
        marginTop: 15,
      }}
    >
      <Navbar />
      <Typography textAlign='center' variant='h4' sx={{ fontFamily: ' Lemon' }}>
        Hello {user.name}!
      </Typography>
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Card
          sx={{
            marginTop: '0px',
            width: '50rem',
            height: '26rem',
            padding: 4,
            boxShadow: '0 20px 20px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#e1f5fe',
          }}
        >
          <Typography variant='body1' sx={{ padding: 1, fontWeight: 500 }}>
            UserId : {user.id}
          </Typography>
          <Typography variant='body1' sx={{ padding: 1, fontWeight: 500 }}>
            Name : {user.name}
          </Typography>
          <Typography variant='body1' sx={{ padding: 1, fontWeight: 500 }}>
            Username : {user.username}
          </Typography>
          <Typography variant='body1' sx={{ padding: 1, fontWeight: 500 }}>
            Email : {user.email}{' '}
          </Typography>
          <Typography variant='body1' sx={{ padding: 1, fontWeight: 500 }}>
            {' '}
            Address : {user.address?.street}, {user.address?.suite},{' '}
            {user.address?.city}, {user.address?.zipcode}
          </Typography>
          <Typography variant='body1' sx={{ padding: 1, fontWeight: 500 }}>
            {' '}
            Geo : {user.address?.geo?.lat}, {user.address?.geo?.lng}
          </Typography>
          <Typography variant='body1' sx={{ padding: 1, fontWeight: 500 }}>
            Phone : {user.phone}
          </Typography>
          <Typography variant='body1' sx={{ padding: 1, fontWeight: 500 }}>
            Website : {user.website}
          </Typography>
          <Typography variant='body1' sx={{ padding: 1, fontWeight: 500 }}>
            Company Name : {user.company?.name}
          </Typography>
          <Typography variant='body1' sx={{ padding: 1, fontWeight: 500 }}>
            Catch Phrase : {user.company?.catchPhrase}
          </Typography>
          <Typography variant='body1' sx={{ padding: 1, fontWeight: 500 }}>
            B.S : {user.company?.bs}
          </Typography>
        </Card>
      </Container>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab
            label={
              <span style={{ fontWeight: 'bold', color: 'black' }}>Posts</span>
            }
            value={1}
          />
          <Tab
            label={
              <span style={{ fontWeight: 'bold', color: 'black' }}>Albums</span>
            }
            value={2}
          />
        </Tabs>
      </Box>
      {value === 1 && (
        <Box>
          <Box sx={{ float: 'right' }}>
            <Button variant='contained' onClick={handleOpenPostModal}>
              Add post
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {posts?.map((post) => (
              <Card
                sx={{ height: '12rem', width: '90%', padding: 2, margin: 2 }}
                key={post.id}
              >
                <Box
                  sx={{ float: 'right', margin: 1, display: 'flex', gap: 2 }}
                >
                  <EditIcon
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleOpenPostModal(post)}
                  />
                  <DeleteIcon
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleOpenDeleteModal(post.id)}
                  />
                </Box>
                <Link
                  to={`/user/posts/${post.id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Typography sx={{ padding: 1 }}>Id : {post.id} </Typography>
                  <Typography sx={{ padding: 1 }}>
                    Title : {post.title}
                  </Typography>
                  <Typography sx={{ padding: 1 }}>
                    Body : {post.body}
                  </Typography>
                  <Typography sx={{ padding: 1 }}>
                    Time : {getRandomTime()}
                  </Typography>
                </Link>
              </Card>
            ))}
          </Box>
        </Box>
      )}
      <PostModal
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
        isPostModalOpen={isPostModalOpen}
        setIsPostModalOpen={setIsPostModalOpen}
        modalTitle='Edit Post'
        saveButtonLabel='Save'
        posts={posts}
        setPosts={setPosts}
      />

      {value === 2 && (
        <Box>
          <Box sx={{ float: 'right' }}>
            <Button variant='contained' onClick={handleOpenAlbumModal}>
              Add Album
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 3,
            }}
          >
            {albums?.map((album) => (
              <Card
                sx={{ height: '7rem', width: '90%', padding: 2, margin: 2 }}
                key={album.id}
              >
                <Box
                  sx={{ float: 'right', margin: 1, display: 'flex', gap: 2 }}
                >
                  <EditIcon
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleOpenAlbumModal(album)}
                  />
                  <DeleteIcon
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                      setIsDeletingPost(false);
                      handleOpenDeleteModal(album.id);
                    }}
                  />
                </Box>
                <Link
                  to={`/user/albums/${album.id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Typography sx={{ padding: 1 }}>Id : {album.id} </Typography>
                  <Typography sx={{ padding: 1 }}>
                    Title : {album.title}
                  </Typography>
                  <Typography sx={{ padding: 1 }}>
                    Time : {getRandomTime()}
                  </Typography>
                </Link>
              </Card>
            ))}
          </Box>
        </Box>
      )}
      <AlbumModal
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
        isAlbumModalOpen={isAlbumModalOpen}
        setIsAlbumModalOpen={setIsAlbumModalOpen}
        modalTitle='Edit Album'
        saveButtonLabel='Save'
        albums={albums}
        setAlbums={setAlbums}
      />
      <DeleteModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        setAllPostsOrAlbumsData={isDeletingPost ? setPosts : setAlbums}
        idToDelete={idToDelete}
        setIdToDelete={setIdToDelete}
      />
    </Container>
  );
}

export default UserProfile;
