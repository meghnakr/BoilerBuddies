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
	const currentUser = useUser()
	const navigate = useNavigate();
	const handleClick = (event) =>{
		navigate(event.target.value, {replace:true});
		event.target.focus()
	}

	const [loggedIn, setLoggedIn] = useState(false)

	useEffect(() => {
		if(currentUser.loggedIn) {
			setLoggedIn(true)
		}
	}, [currentUser.loggedIn])

return (
	<>
	<Nav>
		<img className='App-logo' style={{marginTop: '3.5vmin'}} src={logo} alt="Logo" value='/'/>
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
		{loggedIn 
		? <Dropdown title="My Account">
			<div label="Profile" route="/profile"  onClick={()=>navigate('/profile', {replace:true})}/>
			<div label="Account Settings" route="/settings" onClick={()=>navigate('/settings', {replace:true})}/>
			<div label="Sign Out" onClick={()=>{signOutUser(navigate)}}/>
			{/* Look up how to make it redirect after signout goes through */}
			
		</Dropdown>

		: <div className='dropdown'>
			<button className='default-btn-white' style={{ marginTop: "3vmin", paddingLeft: "2vmin", paddingRight: "2vmin" }}
			onClick={() => {navigate('/signin', {replace:true})}}>SIGN IN</button>
		</div>
		}

	</Nav>
	</>
);
};

export default Navbar;
