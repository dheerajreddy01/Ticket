import React from 'react'
import { useNavigate } from 'react-router-dom';
import './ticket.css'
 function Ticket() {
const navigate=useNavigate();
 let seats=localStorage.getItem("seats_wanted")
 let movie=localStorage.getItem("movie_name")
 let user=localStorage.getItem("user")
 var users=JSON.parse(user)
let name=users.name
let price=localStorage.getItem("price")
const res=localStorage.getItem("cart")
let cart=JSON.parse(res)
var location=localStorage.getItem("theatre_name")
var time=localStorage.getItem("show_time")
let movies=[]
    for(var j=0;j<cart.length;j++){
      movies[j]=cart[j].name
    }
const home=()=>{
  navigate("/")
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
  return (
    <>
<div className="contenido">
  <div className="ticket">
    <div className="hqr">
      <div className="column left-one"></div>
      <div className="column center">
        <div id="qrcode"></div>
      </div>
      <div className="column right-one"></div>
    </div>
    </div>
    <div className="details">
      <div className="tinfo">
        Name
      </div>
      <div className="tdata name">
        {movie}
      </div>
      <div className="tinfo">
        ticket
      </div>
      <div className="tdata">
        <span>{seats}</span>
        </div>
        <div className="tdata">
        {movies.toString()}
      </div>  
        
      <div className="tinfo">
        Price
      </div>
      
      <div className="tdata">
        <b>Rs:{price}</b>
        
      </div>    
      <div className="tinfo">
        Date
      </div>
      <div className="tdata">
        {time   }
      </div>  
      
      <div className="masinfo">
        <div className="left">
         <div className="tinfo">
        User
      </div>
      <div className="tdata nesp">
        {name}
      </div>  
        </div>
        <div className="right">
        <div className="tinfo">
        location
      </div>
      <div className="tdata nesp">
        {location}
      </div> 
        </div>
        <div className="link">
        <button onClick={() => window.print()}>PRINT</button>
      </div>
      
      </div>
      
    </div>
    
  </div>

  <div className="link">
        <button className='route' onClick={home}>Home</button>
      </div>
  
</>
);
}

export default Ticket;