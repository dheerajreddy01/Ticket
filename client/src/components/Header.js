
import React, { useEffect,useState } from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';
// import { NavDropdown } from './NavbarElements';




 
const Header = () => {
	

	const [navbarUserIsLogged, setnavbarUserIsLogged] = useState(false);
	useEffect(() => {
	  (async () => {
		const loggedIn = localStorage.getItem('user')
		if (loggedIn) setnavbarUserIsLogged(true);
	  })();
	}, [navbarUserIsLogged]);
	const handleLogout = () => {
		// setUser({});
		// setUsername("");
		// setPassword("");
		localStorage.clear();
		window.location.reload(true);
	  };
	  const home=()=>{
		localStorage.removeItem("cart")
		localStorage.removeItem("movie_name")
		localStorage.removeItem("movie_id")
		localStorage.removeItem("show_time")
		localStorage.removeItem("show_id")
		localStorage.removeItem("theatre_name")
		localStorage.removeItem("theatre_id")
		localStorage.removeItem("seats_wanted")
		localStorage.removeItem("price")
		localStorage.removeItem("seatsSelected")
	  }

	// const username=()=>{
	// 	const user=localStorage.getItem('user.name')
	// }
return (
	<>
	<Nav>
		<NavLink to='/main'>
     <h1 className='logo'>TICKET BOOKING</h1>
	 </NavLink>
	 <Bars/>

		<NavMenu>
		<NavLink onClick={home} to='/' activeStyle>
			Home
		</NavLink>
		<NavLink onclick={home} to='/contact' activeStyle>
			Contact
		</NavLink>
		<NavLink to='/main' activeStyle>
			Book
		</NavLink>
		{navbarUserIsLogged?
        <>
		{/* <NavDropdown title='Dropdown'>
			<NavDropdown.Item onSelect={username} to="/login">Welcome $user</NavDropdown.Item>
			<NavDropdown.Item onSelect={handleLogout}>Logout</NavDropdown.Item>
			
			</NavDropdown> */}
			<NavLink  to='/history' activeStyle>
			Purchase History
		</NavLink>
        <NavLink onClick={handleLogout} to='/login' activeStyle>
			Logout
		</NavLink>

        </>:<>
        <NavLink to='/register' activeStyle>
			Sign Up
		</NavLink>
        <NavBtn>
		<NavBtnLink to='/login'>Sign In</NavBtnLink>
		</NavBtn>
        </>
        }
		</NavMenu>

		
	</Nav>
	</>
);
};

export default Header;
