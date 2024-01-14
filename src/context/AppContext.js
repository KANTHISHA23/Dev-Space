import { createContext, useEffect } from 'react';

export const AppContext = createContext();

export default function AppProvider({ children }) {
  let USERS_API = 'https://jsonplaceholder.typicode.com/users';
  let POSTS_API = 'https://jsonplaceholder.typicode.com/posts';
  let ALBUMS_API = 'https://jsonplaceholder.typicode.com/albums';
  const values = {
    usersApi: USERS_API,
    postsApi: POSTS_API,
    albumsApi: ALBUMS_API,
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
