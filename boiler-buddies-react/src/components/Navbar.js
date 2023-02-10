import React from 'react';
import {
Nav,
NavLink,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';

const Navbar = () => {
return (
	<>
	<Nav>

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
		<NavBtnLink to='/Signin'>Sign In </NavBtnLink>

		</NavBtn>
	</Nav>
	</>
);
};

export default Navbar;
