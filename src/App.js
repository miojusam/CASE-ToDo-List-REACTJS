import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Post from './pages/Post/Post'
import List from './pages/List/TaskList'
import Edit from './pages/Edit/Edit'


function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/post" element={<Post />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>

  );
}


export default App;
