import React from 'react'
import { Navigate,Outlet } from "react-router-dom";
import {useNavigate} from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';



// import { useEffect } from 'react';


const SubProtectedRoutes = () => {
    // <ToastContainer />
      const seat_wanted = localStorage.getItem("seats_wanted");
      const user=localStorage.getItem("user");
      const show_id=localStorage.getItem("show_id");
      const theatre_id=localStorage.getItem("theatre_id");

      const navigate=useNavigate();
    
      if(!user)
      {
          return <Navigate to="/login"/>
      }
      else if (user && !seat_wanted) {
            
        
          alert("Please fill all the details");
          
    
           return <Navigate to="/main"/>
            
 
      }
      else if (user && !theatre_id) {
            
        
        alert("Please fill all the details");
        
  
         return <Navigate to="/main"/>
          

    }
    else if (user && !show_id) {
            
        
      alert("Please fill all the details");
      

       return <Navigate to="/main"/>
        

  }

      else if(seat_wanted &&  user ){

        return  <Outlet/>
      }
     
      
}

export default SubProtectedRoutes;