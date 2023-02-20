import React from 'react';
import {
Nav,
NavLink,
NavMenu,
} from './NavbarElements';
import logo from '../assets/logo_text_w.png';
import Dropdown from './Dropdown';

const Navbar = () => {
return (
	<>
	<Nav>
		<img className='App-logo' src={logo} alt="Logo" />
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
