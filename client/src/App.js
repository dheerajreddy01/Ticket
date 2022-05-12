import React from 'react'

import './App.css';
import Confirmation from './confirmation';
import Main from './main';
import Seats from './seats';
import Registration from './register';
import Login from './login';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Navbar from './components/Header';
import ProtectedRoutes from './components/ProtectedRoutes';
import Home from './Home';
import Logout from './Logout'
import Contact from './contact';
import History from './History';
import Ticket from './Ticket';
function App() {
 


 
  return (
    
   
   <Router>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/register" element={<Registration/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/logout" element={<Logout/>}/>
        
        <Route element={<ProtectedRoutes/>}>
        <Route path="/main" element={<Main/>}/>
        <Route path="/seats" element={<Seats/>}/>
        <Route path="/confirmation" element={<Confirmation/>}/>
        <Route path="/history" element={<History/>}/>
        <Route path="/ticket" element={<Ticket/>}/>
     
        </Route>
       
      </Routes>
    </Router> 


  );
}
export default App;