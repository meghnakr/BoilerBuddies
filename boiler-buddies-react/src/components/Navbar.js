import React, { useState, useEffect } from 'react';
import {
Nav,
NavLink,
NavMenu,
NavBtn,
NavBtnLink
} from './NavbarElements';
import logo from '../assets/logo_text_w.png';
import Dropdown from './Dropdown';
import { UserContext } from '../context/userContext';
import { signOut } from '@firebase/auth';
import { signOutUser } from '../utils/auth';

//export const auth = getAuth(app);
import {Link, useNavigate } from "react-router-dom";
import useUser from '../hooks/useUser';

const Navbar = () => {
	const navigate = useNavigate();
	const handleClick = (event) =>{
		navigate(event.target.value, {replace:true});
		event.target.focus()
	}


return (
	<>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
	<Nav>
		<img className='App-logo' style={{marginTop: '3.5vmin', cursor: 'pointer'}} src={logo} alt="Logo" value='/'
		onClick={handleClick} />
		<NavMenu>
			
		<button className='Navbar-btn' value='/feed' onClick={handleClick}>
			Feed
		</button>

        <button className='Navbar-btn' value='/search' onClick={handleClick}>
			Search
		</button>

		<NavLink to='/forums' activeStyle>
			Forums
		</NavLink>

		<NavLink to='/friends' activeStyle>
			Friends
		</NavLink>

        <NavLink to='/messages' activeStyle>
			Messages
		</NavLink>

		<NavLink to='/notifications' activeStyle>
			Notifications
		</NavLink>
		
		{/* Second Nav */}
		{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
		</NavMenu>
		<Dropdown title="My Account">
			<div label="Profile" route="/profile"  onClick={()=>navigate('/profile', {replace:true})}/>
			<div label="Account Settings" route="/settings" onClick={()=>navigate('/settings', {replace:true})}/>
			<div label="Sign Out" onClick={()=>{signOutUser(navigate)}}/>
			{/* Look up how to make it redirect after signout goes through */}
			
		</Dropdown>
		

	</Nav>
	</>
);
};

export default Navbar;
