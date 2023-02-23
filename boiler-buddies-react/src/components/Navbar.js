import React from 'react';
import {
Nav,
NavLink,
NavMenu,
} from './NavbarElements';
import logo from '../assets/logo_text_w.png';
import Dropdown from './Dropdown';
import {Link, useNavigate } from "react-router-dom";

const Navbar = () => {
	const navigate = useNavigate();
	const handleClick = () =>{
		navigate('/');
	}
return (
	<>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
	<Nav>
		<img className='App-logo' style={{marginTop: '3.5vmin', cursor: 'pointer'}} src={logo} alt="Logo"
		onClick={handleClick} />
		<NavMenu>
			
		<NavLink to='/feed' activeStyle>
			Feed
		</NavLink>

        <NavLink to='/friends' activeStyle>
			Friends
		</NavLink>

		<NavLink to='/forums' activeStyle>
			Forums
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
			<div label="Profile" route="/profile"/>
			<div label="Account Settings" route="/settings"/>
			<div label="Sign Out" route="/signout"/>
		</Dropdown>

	</Nav>
	</>
);
};

export default Navbar;
