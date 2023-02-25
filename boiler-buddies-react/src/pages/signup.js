import React from "react";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo_text.png';
import { useState } from "react";
import { addNewUser } from "../utils/auth";
//import { useAlert } from 'react-alert'


export default function Signup (props) {
  props.funcNav(false);
  // UseState to keep track of email and password pairs
  const navigate = useNavigate();
  //const alert = useAlert();
  const [formState, setFormState] = useState({ email: "", password: "" });
  //console.log(formState)

  function handleSignUpButton () {
    if (formState.email.endsWith("@purdue.edu")) {
    addNewUser(formState.email, formState.password);
    navigate('/', {replace: true})
    } else {
      // Alert that the user needs a valid email
    //alert.show("Error: not a valid Purdue email");
    alert("Error: not a valid Purdue email");
    }
  }

  return (
    <div className="Signin-form-container">
      <form className="Signup-form">
        <div className="Signin-form-content">
          <img style={{ width: 350, height: 60, display: 'block' }} className="Signin-form-logo" src={logo} alt="Logo" />
          <div className="form3">
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Purdue Email"
              value={formState.email}
              onChange={(e) => {        // e stands for event, it calls anonymous function
                setFormState({
                  ...formState, email: e.target.value   // when the onchange occurs on this input, this is the function that is run
                })
              }}  // anonymous function, takes in event object e
            />
          </div>
          


          { /* 
          
          <div className="form3">
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Username"
            />
          </div>
          */}




          <div className="form3">
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={formState.password}
              onChange={(e) => {        // e stands for event, it calls anonymous function
                setFormState({
                  ...formState, password: e.target.value   // when the onchange occurs on this input, this is the function that is run
                })
              }}  // anonymous function, takes in event object e
            />
          </div>




          <div className="d-grid gap-2 mt-3">
            <button type="button" className="default-btn-white" onClick={handleSignUpButton}> 
              Sign Up
            </button>
            <button type="button" className="default-btn" 
            style={{marginTop:'1vmin'}}
            onClick={handleSignUpButton}>
              Sign In
            </button>
          </div>
          


        </div>
      </form>
    </div>
  )
}

