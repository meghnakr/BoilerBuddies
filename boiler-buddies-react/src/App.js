import { React, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/main";
import Feed from "./pages/feed.js";
import Forum from "./pages/forums.js";
import Searches from "./pages/search.js";
import Messages from "./pages/messages.js";
import Signin from "./pages/Signin.js";
import ForgotPW from "./pages/forgotPassword/forgotPW";
import CheckYourEmail from "./pages/forgotPassword/checkEmail";
import Account from "./pages/account";
import Profile from "./pages/profile";
import Settings from "./pages/settings";
import Signup from "./pages/signup";
import { UserProvider } from "./context/userContext";
import Notifications from "./pages/notifications";
import Friends from "./pages/friends.js";
import ForumPage from "./pages/forumPage.js"
import ChatPage from "./pages/chatPage.js"

import PostWithComments from "./pages/postWithComments";
import "bootstrap/dist/css/bootstrap.min.css";
import SetNewPassword from "./pages/forgotPassword/setNewPassword";
import EditProfile from "./pages/editProfile";
//import CreateProfile from "./pages/createProfile";
import CreateForum from "./pages/createForum";
import UserProfile from "./pages/userProfile";


function App(location) {
  const [showNav, setShowNav] = useState(true);
  return (
    <UserProvider>
      <Router>
        <div className="App">
          {showNav && <Navbar />}
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route path="/feed" element={<Feed funcNav={setShowNav} />} />
            <Route path="/post/:postId" element={<PostWithComments funcNav={setShowNav} />}/>
            <Route path="/forums" element={<Forum funcNav={setShowNav} />} />
            <Route path="/friends" element={<Friends funcNav={setShowNav} />} />
            <Route path="/user/:userId" element={<UserProfile />} />
            <Route path="/search" element={<Searches funcNav={setShowNav} />} />
            <Route
              path="/messages"
              element={<Messages funcNav={setShowNav} />}
            />
            <Route path="/account" element={<Account funcNav={setShowNav} />} />
            <Route path="/signin" element={<Signin funcNav={setShowNav} />} />
            <Route
              path="/forgot-password"
              element={<ForgotPW funcNav={setShowNav} />}
            />
            <Route
              path="/check-email"
              element={<CheckYourEmail funcNav={setShowNav} />}
            />
            <Route
              path="/set-new-password"
              element={<SetNewPassword funcNav={setShowNav} />}
            />
            <Route path="/profile" element={<Profile funcNav={setShowNav} />} />
            <Route
              path="/edit-profile"
              element={<EditProfile funcNav={setShowNav} />}
            />
            <Route
              path="/settings"
              element={<Settings funcNav={setShowNav} />}
            />
            <Route path="/signup" element={<Signup funcNav={setShowNav} />} />
            <Route
              path="/notifications"
              element={<Notifications funcNav={setShowNav} />}
            />
            <Route path="/create-forum" element={<CreateForum funcNav={setShowNav} />} />
            <Route path="/forum/:forumId" element={<ForumPage funcNav={setShowNav} />} />
            <Route path="/chat/:otherId" element={<ChatPage funcNav={setShowNav} />} />
            {/*<Route path="/group-chat/:groupId" element={<GroupChatPage funcNav={setShowNav} />} />*/}
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
