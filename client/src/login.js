import React, { useState } from "react";
import {Link,useNavigate} from "react-router-dom"
import { useAlert } from "react-alert";
function Login() {
    const [email, setEmaillog] = useState(" ");
    const [password, setPasswordlog] = useState(" ");
  

    const navigate=useNavigate();
    const alert = useAlert(); 
    
  
    async function handleLogin(e) {
      e.preventDefault();

  
      let data={email,password}
      try{
        let result=await fetch('http://127.0.0.1:5000/login/',{
          method:'POST',
          headers:{
            'Accept':'application/json',
            'Content-type':'application/json'
          },
          body:JSON.stringify(data)  
         
        });
       result =await result.json();

      if((await result).status ===400)
        {
          alert.show(result.message, { type: "error" });
          
        }
        else{
          alert.show("Logged-In Success", { type: "success" });
          navigate("/")
          localStorage.setItem("user",JSON.stringify(result.user))  
          window.location.reload(true);
        } 
      }
  
        
      catch(e){
        console.log(e)
      }
  }
  return (
   <>
    <div className="login-page">
        <form className="form" onSubmit={handleLogin}>

        <div className="login">
          <div className="login-header">
            <h3>LOGIN</h3>
          </div>
        </div>
          <div className="login-form">
            <input
              type="email"
              placeholder="Enter email"
              required
              onChange={(event) => setEmaillog(event.target.value)}
            />
          </div>

          <div className="login-form">
            <input
              type="password"
              placeholder="Enter password"
              required
              onChange={(event) => setPasswordlog(event.target.value)}
            />
          </div>

          <button>
            Login
          </button>
          <Link to="/register">Don't Have an account?</Link>
          
      </form>
      
    </div>
    </>
  );
}


export default Login;