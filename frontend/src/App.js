import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Homepage from './components/Homepage';
import NewPost from './components/NewPost';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/new">New Post</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/new" element={<NewPost />} />
      </Routes>
    </Router>
  );
}

export default App;
