
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
		const loggedIn = localStorage.getItem('user')
		if (loggedIn) setnavbarUserIsLogged(true);
	}, [navbarUserIsLogged]);
	
	const handleLogout = () => {
		var res=localStorage.getItem("user")
		const log=JSON.parse(res)
		var cart1=localStorage.getItem("cart")
		const cart=JSON.parse(cart1)
		var confirm=localStorage.getItem("confirm")
		
		if(confirm){
			for (var i = 0; i < cart.length; i++) {
				const available= cart[i].id;
				const occupied=!cart[i].occupied;
				const user=log.id;
				const data={available,occupied,user}
				fetch(`http://127.0.0.1:5000/delete`,{
				method:"POST",
				headers:{
				'Content-Type':'application/json'
						},
				body:JSON.stringify(data)
			}).then(response => response.json())
			.catch(error => console.log(error))
		  }
		  localStorage.clear()

	setnavbarUserIsLogged(false);
		}else{
			localStorage.clear();
			setnavbarUserIsLogged(false);
		}
		
	  };

	  const handleLogin=()=>{
		const loggedIn = localStorage.getItem('user')
		if(loggedIn) setnavbarUserIsLogged(true)
		
	  }
	  const home=()=>{
		var res=localStorage.getItem("user")
		const log=JSON.parse(res)
		var cart1=localStorage.getItem("cart")
		const cart=JSON.parse(cart1)
		var confirm=localStorage.getItem("confirm")
		if(!confirm && !cart){
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
	else{
		for (var i = 0; i < cart.length; i++) {
			const available= cart[i].id;
			const occupied=!cart[i].occupied;
			const user=log.id;
			const data={available,occupied,user}
			fetch(`http://127.0.0.1:5000/delete`,{
			method:"POST",
			headers:{
			'Content-Type':'application/json'
					},
			body:JSON.stringify(data)
		}).then(response => response.json())
		.catch(error => console.log(error))
	  }
	  localStorage.removeItem("cart")
localStorage.removeItem("movie_name")
localStorage.removeItem("movie_id")
localStorage.removeItem("show_time")
localStorage.removeItem("show_id")
localStorage.removeItem("confirm")
localStorage.removeItem("theatre_name")
localStorage.removeItem("theatre_id")
localStorage.removeItem("seats_wanted")
localStorage.removeItem("price")
localStorage.removeItem("seatsSelected")
	}
}
	
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
		<NavLink onClick={home} to='/contact' activeStyle>
			Contact
		</NavLink>
		<NavLink onClick={home} to='/main' activeStyle>
			Book
		</NavLink>
		{navbarUserIsLogged===true?
        <>
			<NavLink onClick={home} to='/history' activeStyle>
			Purchase History
		</NavLink>
        <NavLink onClick={handleLogout} to='/login' activeStyle>
			Logout
		</NavLink>

        </>:<>
        <NavLink to='/register'onClick={handleLogin} activeStyle>
			Sign Up
		</NavLink>
        <NavBtn>
		<NavBtnLink to='/login' onClick={handleLogin}>Sign In</NavBtnLink>
		</NavBtn>
        </>
        }
		</NavMenu>

		
	</Nav>
	</>
);
};

export default Header;
