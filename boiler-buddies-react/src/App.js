import React from 'react';
import logo from './assets/logo_text.png';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Feed from './pages/feed.js';
import Forum from './pages/forums.js';
import Friends from './pages/friends.js';
import Messages from './pages/messages.js';
import Signin from './pages/Signin.js'

import "bootstrap/dist/css/bootstrap.min.css"


function App() {
  return (
    
    <Router>
      <div className="App"></div>
      <Navbar />
      <Routes>
      <Route path='/feed' component={Feed} />
      <Route path='/forums' component={Forum} />
      <Route path='/friends' component={Friends} />
      <Route path='/messages' component={Messages} />
      <Route path="/Signin" element={<Signin />} />
      </Routes>
    </Router>


  );
}

export default App;
