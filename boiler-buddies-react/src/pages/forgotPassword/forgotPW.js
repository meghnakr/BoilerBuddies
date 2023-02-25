import { React, useState } from 'react';
import logo from '../../assets/logo_text.png';
import { Link, useNavigate } from 'react-router-dom';
import { sendPwEmail } from "../../utils/auth";

export default function ForgotPW(props) {
    props.funcNav(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        navigate('/check-email', {state: {email: `${email}`}, replace:true});
        sendPwEmail(email);
    }
    return (
        <div className='forgotPW-container'>
            <img className='logo-container' src={logo} alt="Logo" />
            <h1 style={{ fontWeight : 'bold'}}> Forgot password?</h1>
            <p style={{ fontWeight: 'lighter'}}> No worries, let's get you a new one</p>
            <form className='general-form' onSubmit={handleSubmit}>
                <div className='form-content'>
                    <div className='form3'>
                        <label>Purdue Email</label>
                        <input type='email' id='email' value={email} 
                        onChange={(event) => {setEmail(event.target.value)}} placeholder='example@purdue.edu'/>
                        <button type='submit' className="default-btn">Reset password</button>
                    </div>
                </div>
            </form>
            <div style= {{ height: '3vmin'}}> </div>
            <Link to="/signin"  style={{ textDecoration: 'none' }}>
            <p className="link-text">
                Back to login
            </p>
          </Link>
        </div>
    );
}

