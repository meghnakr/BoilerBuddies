import React, { useState } from 'react';
import logo from '../../assets/logo_text.png';

export default function SetNewPassword(props) {
    props.funcNav(false);
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [match, setMatch] = useState(true);
    const [valid, setValid] = useState(true);
    const handleSubmit = () => {
        if (match & valid) {
            console.log('Reset password');
            //call backend here
        } else {
            setPassword('');
            setConfirm('');
        }
    }


    return (
        <div className='forgotPW-container'>
            <img className='logo-container' src={logo} alt="Logo" />
            <h1 style={{ fontWeight : 'bold'}}> Set new password</h1>
            <form className='general-form' onSubmit={handleSubmit}>
                <div className='form-content'>
                    <div className='form3'>
                        <label>Password</label>
                        <input type='password' id='password' value={password} 
                        onChange={(event) => {setPassword(event.target.value);
                            setMatch(event.target.value === confirm);
                        if(event.target.value.length < 8) {
                            setValid(false);
                        } else {
                            setValid(true);
                        }}} placeholder='Must be at least 8 characters'/>
                        { valid ? null : <p style={{color:'red'}}>Password is not long enough</p> }
                    <div className='form3'>
                        <label>Confirm Password</label>
                        <input type='password' id='confirm_password' value={confirm}
                        onChange={(event) => {setConfirm(event.target.value); 
                            setMatch(password === event.target.value);}} placeholder='Must match password'/>
                        { match ? null : <p style={{color:'red'}}>Password does not match</p> }
                    </div>
                        <button type='submit' className="default-btn">Reset password</button>
                    </div>
                </div>
            </form>
        </div>
    );
}