import React from 'react';
import logo from '../../assets/logo_text.png';
import { Link, useLocation } from 'react-router-dom';


export default function CheckYourEmail(props) {
    props.funcNav(false);
    const location = useLocation();
    const email = location.state.email;
    console.log(email);

    return (
        <div className='forgotPW-container'>
            <img className='logo-container' src={logo} alt="Logo" />
            <h1 style={{ fontWeight : 'bold'}}> Check your email</h1>
            <p style={{ fontWeight: 'lighter'}}> We sent you a password reset link to <b>{email}</b></p>
            <div style= {{ height: '3vmin'}}> </div>
            <p style={{ fontWeight: 'lighter'}}> Don't receuive the email? Click to resend</p>
            <Link to="/signin"  style={{ textDecoration: 'none' }}>
            <p className="link-text">
                Back to login
            </p>
          </Link>
        </div>
    );
}