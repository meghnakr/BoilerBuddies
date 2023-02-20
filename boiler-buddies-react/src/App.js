import { React, useState } from 'react';
import logo from './assets/logo_text.png';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Feed from './pages/feed.js';
import Forum from './pages/forums.js';
import Friends from './pages/friends.js';
import Messages from './pages/messages.js';
import Signin from './pages/Signin.js';
import ForgotPW from './pages/forgotPW';
import CheckYourEmail from './pages/checkEmail';
import Account from './pages/account';
import Profile from './pages/profile';
import Settings from './pages/settings';
import Signup from './pages/signup';

import "bootstrap/dist/css/bootstrap.min.css"


function App(location) {
  const [showNav, setShowNav] = useState(true);
  return (

      <Router>
        <div className="App">
        { showNav && <Navbar />
        }
        <Routes>
        <Route exact path='/' element={<Feed funcNav={setShowNav}/>} />
        <Route path='/feed' element={<Feed funcNav={setShowNav}/>} />
        <Route path='/forums' component={<Forum funcNav={setShowNav}/> } />
        <Route path='/friends' component={<Friends funcNav={setShowNav}/>} />
        <Route path='/messages' component={<Messages funcNav={setShowNav}/>} />
        <Route path='/account' element={<Account funcNav={setShowNav} />} />
        <Route path="/signin" element={<Signin funcNav={setShowNav}/>} />
        <Route path='/forgot-password' element={<ForgotPW funcNav={setShowNav} />} />
        <Route path='/check-email' element={<CheckYourEmail funcNav={setShowNav} />} />
        <Route path='/profile' element={<Profile funcNav={setShowNav} />} />
        <Route path="/settings" element={<Settings funcNav={setShowNav}/>} />
        <Route path="/signup" element={<Signup funcNav={setShowNav}/>} />


      </Routes>
      </div>
    </Router>
    


  );
}

export default App;
