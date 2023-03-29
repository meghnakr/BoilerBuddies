import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo_text.png";
import { useState, useEffect } from "react";
import { auth, signInUser } from "../utils/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../utils/firebase";
import { redirect } from "react-router-dom";
import useUser from "../hooks/useUser";


export default function Signin (props) {
  props.funcNav(false);
  // Usestate for signin
  //const auth = getAuth(app);
  const [formState, setFormState] = useState({ email: "", password: "" }); // keep track of all states here
  const currentUser = useUser();
  /* Use useUser anywhere in the UserProvider to complete tasks */

  console.log(currentUser);


  /*
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (user) return redirect("/");
  }, [user]);
  */

  const navigate = useNavigate();

  //console.log(formState);

  function handleSignInButton() {
    signInUser(formState.email, formState.password);
    console.log("CURRENTUSER:", currentUser.loggedIn); 
    
  }

  function handleSignUpButton() {
    navigate('/signup');
  }
  useEffect(() => {
    console.log("USER IS SIGNED IN");
    if (currentUser.loggedIn) {
      navigate("/feed");
    }
    
  },[currentUser.loggedIn]);


  return (
    <div className="Signin-form-container">
      <form className="Signin-form">
        <div className="Signin-form-content">
          <img
            style={{ width: 350, height: 60, display: "block" }}
            className="Signin-form-logo"
            src={logo}
            alt="Logo"
  />
          <div className="form3">
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Purdue Email or Username"
              value={formState.email}
              onChange={(e) => {
                // e stands for event, it calls anonymous function
                setFormState({
                  ...formState,
                  email: e.target.value, // when the onchange occurs on this input, this is the function that is run
                });
              }} // anonymous function, takes in event object e
            />
          </div>
          <div className="form3">
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={formState.password}
              onChange={(e) => {
                // e stands for event, it calls anonymous function
                setFormState({
                  ...formState,
                  password: e.target.value, // when the onchange occurs on this input, this is the function that is run
                });
              }} // anonymous function, takes in event object e
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="button"
              className="default-btn"
              onClick={handleSignInButton}
            >
              Sign In
            </button>
            <button type="button" className="default-btn-white" 
            style={{marginTop:'1vmin', fontWeight: 'normal', textTransform: 'none', border: 'none'}}
            onClick={handleSignUpButton}>Don't have an account? <b>Sign Up</b> </button>
          </div>
          <Link to="/forgot-password" style={{ color: "grey", textDecoration: 'none'}}>
            <p className="link-text">Forgot password?</p>
          </Link>
        </div>
      </form>
    </div>
  );
}
