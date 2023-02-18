import React from 'react';
import {
Nav,
NavLink,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';
import logo from '../assets/logo_text_w.png';

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
		<NavBtn>
		<NavBtnLink to='/signin'>Sign in </NavBtnLink>

		</NavBtn>
	</Nav>
	</>
);
};

export default Navbar;
