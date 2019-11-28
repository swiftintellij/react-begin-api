import React from 'react';
import './App.css';
import { UserProvider } from "./UserContext";
import Users from './Users';
import Posts from './Posts';
import { PostProvider } from './PostContext';

function App() {
  return (
    <>
      <UserProvider>
        <Users/>
      </UserProvider>
      <hr/>
      <PostProvider>
        <Posts/>
      </PostProvider>

    </>
  );
};

export default App;
