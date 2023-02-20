import React from "react";
import { Link } from 'react-router-dom';
import logo from '../assets/logo_text.png';

export default function (props) {
  props.funcNav(false);
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
            />
          </div>


          <div className="form3">
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Username"
            />
          </div>



          <div className="form3">
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>


          <div className="d-grid gap-2 mt-3">
            <button type="signin" className="default-btn">
              Sign Up
            </button>
          </div>

          

        </div>
      </form>
    </div>
  )
}