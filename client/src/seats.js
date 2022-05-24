import React,{StrictMode, useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useAlert } from "react-alert";

import './App.css';
import icon from "./assets/icon.png"
import icon2 from "./assets/icon2.png"


export default function Seats(){
    const [data, setData] = useState([]);
   const alert=useAlert()
    const navigate=useNavigate();
 
    const getDatafromLS=()=>{                                             
      const data=localStorage.getItem('cart');                            //state ,setState   date=[], setDate(data.se)
     
      if(data){
        return JSON.parse(data)
      }else{
        return[]
      }
    }
    const getPricefromLs=()=>{
      const localData=localStorage.getItem('price');
      if(localData){
        return JSON.parse(localData)
      }else{
        return[]
      }
    }
    const getseatsSelected=()=>{
      const localData=localStorage.getItem('seatsSelected');
      if(localData){
        return JSON.parse(localData)
      }else{
        return 0
      }
    }
   
    const[seat_selected,setSeatselected]=useState(getseatsSelected());
    const [cart, setCart] = useState(getDatafromLS());
    const [price,setPrice]=useState(getPricefromLs());
    localStorage.setItem("cart",JSON.stringify(cart))
       localStorage.setItem('price',JSON.stringify(price))
       localStorage.setItem('seatsSelected',JSON.stringify(seat_selected))
  
    const getData = async () => {
      try{
        const movie=localStorage.getItem('movie_id')
        // const theatre=localStorage.getItem("theatre_id")
        const show=localStorage.getItem("show_id")
        const res = await fetch("http://127.0.0.1:5000/seats/movieId/"+movie+"/showId/"+show)
        const data = await res.json();
        setData(data.seats);
      }catch(error){
        console.log(error) 
      }
    };
  useEffect(() => {
      getData();
      
    }, [  ]);

    let seats_wanted=localStorage.getItem("seats_wanted")
    const addDevice=(e,data)=>{
      
      const checkTicket=cart.filter((item)=>item.id===data.id);
      if(checkTicket.length>0){
        e.target.style.background="#444451"
       
        setSeatselected(seat_selected-1)
        setCart(cart.filter((item) => item.id !== data.id))
        setPrice(price-(data.price))
      }else{
        if(seat_selected<seats_wanted){
          e.target.style.background="red"
          localStorage.getItem("cart")
          
          // data.selected_users=name
          setCart([...cart, data]);
          setSeatselected(seat_selected+1)
         
       setPrice(parseInt(data.price+price))
        
        }
        else{

          alert.show("exceeded number of seats", { type: "error" });
        
        }
      }
    }
    
    //Blocking the seats
    async function blockSeats(){
      
      if(seat_selected<seats_wanted){
        //giving a warning to the user that the seats are less in number
        alert.show("user has selected less number of seats",{type:"error"});   
          
      }
      else{
        let check=0
      const user1=localStorage.getItem('user')
      var users=JSON.parse(user1)
      try{
      for (var i = 0; i < cart.length; i++) {
      const available= cart[i].id;
      console.log(available)
      const user=users.id;
      const occupied=true
      const data={available,user,occupied}
    let result=fetch(`http://127.0.0.1:5000/block`,{
      method:'POST',
         headers:{
           'Accept':'application/json',
           'Content-type':'application/json',
         },
         body:JSON.stringify(data)  
       })
       
        if((await result).status ===200){
            console.log("success")
        }
        else if((await result).status ===400){ 
          check+=1
          
        }
}
}
catch(err){
  console.error(err)
}
if(check===0){
navigate('/confirmation')
    }
    else{
      alert.show("Seats already booked",{type:"error"});
      localStorage.removeItem("cart");
      localStorage.removeItem("price");
      localStorage.removeItem("seatsSelected")
      setTimeout(function(){
        navigate("/main")
    }, 1000)  
    }
  }
}
let com=localStorage.getItem("movie_name")
let sam=localStorage.getItem("theatre_name")

const main=()=>{
  navigate('/main')
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
    localStorage.removeItem("dateselected")
  localStorage.removeItem("datetimeselected")
  localStorage.removeItem("showlist")
}

  return(
     <StrictMode>
      <div className='App'>
      <div className='eventname'>
  
       <img src={icon} /> {com}<br/>  
        <img src={icon2} /> {sam}  
 
</div>
<br/>
      <h1>Available seats</h1>
     
     <div className='screen'>All eyes this way please!</div>

             <br/>
             <br/>
             <div className='box'>
             <div className='row'>
              
             {
                 data.map((item)=>
                  <>
                    
                         
{!item.occupied ?(
    
        <button className='seat' key={item.id} onClick={e=>addDevice(e, item)} >{item.name}</button>
       
):<button className='occupied' key={item.id} >{item.name}</button>}
                        </>
                             
                 )
}
                 
            </div>
            </div>
            {cart.length> 0 ?
            <>
            <div className="selecteds">
            <p>Selected seats:
                  
                    </p>
                    {cart && cart.map((item)=><p className='selected on' key={item.id}  >{item.name}
                    </p>)}
                    </div>
            <div className='rowi'><p>Total price of tickets: &#x20b9;  {price}/- </p></div>
            </>:<><br></br>
            <br></br></>
            }
            <div>
            <button className='route-conf' onClick={main}>Back</button>
            {/* {seat_selected===seats_wanted ?
            <> */}
         <button className='route-conf' onClick={blockSeats}>Confirm</button>
          {/* </>:<></>
            } */}
            
            </div>
           
      </div>
      </StrictMode>
  )
}







