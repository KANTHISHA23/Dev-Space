import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Posts from '../pages/Posts';
import Albums from '../pages/Albums';
import UserProfile from '../commonComponent/UserProfile';
import Comments from '../pages/Comments';
import Photos from '../pages/Photos';

function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/users' element={<Home />}></Route>
        <Route path='/posts' element={<Posts />}></Route>
        <Route path='/albums' element={<Albums />}></Route>
        <Route path='/user/:userId' element={<UserProfile />}></Route>
        <Route path='/user/posts/:postId' element={<Comments />}></Route>
        <Route path='/user/albums/:albumId' element={<Photos />}></Route>
      </Routes>
    </div>
  );
}

export default AppRoutes;
