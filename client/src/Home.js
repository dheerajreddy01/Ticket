import React from 'react';
import "./Home.css";
import img6 from "./assets/img6.jpeg";
import { Link,useNavigate } from 'react-router-dom';





const Home = () => {
  return (
    <div className='main-cont'>

  
    <div className="bg-text">
    <img src={img6}/>
    <div className='centered'> 
  
    <p>Book  ticket of a movie<br/> and enjoy!  <br/> <br/> <Link className='book-btn' to="/main">Book now </Link> </p>
    {/* <Link className='book-btn' to="/main">Book now</Link> */}
    </div>
    
  
    </div>
   
    </div>
    
  );
};

export default Home;