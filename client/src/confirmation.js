import React,{useState,useRef,useEffect} from 'react'
import './confirmation.css'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert';

export default function Confirmation(){


const alert=useAlert();
const Ref = useRef(null);
const [timer, setTimer] = useState('00:00:00');
var confirm="ok"
localStorage.setItem("confirm",JSON.stringify(confirm))

const getTimeRemaining = (e) => {
  const total = Date.parse(e) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / 1000 * 60 * 60) % 24);
  return {
      total, hours, minutes, seconds
  };
}

const startTimer = (e) => {
  let { total, hours, minutes, seconds } 
              = getTimeRemaining(e);
              
  if (total >= 0) {
      setTimer(
          (hours > 9 ? hours : '0' + hours) + ':' +
          (minutes > 9 ? minutes : '0' + minutes) + ':'
          + (seconds > 9 ? seconds : '0' + seconds)
      )

  }
  else{
    clearInterval(Ref.current);
    confirm=localStorage.getItem("confirm")
    if(confirm){
      for (var i = 0; i < cart.length; i++) {
        const available= cart[i].id;
        const occupied=!true;
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
    }
    localStorage.removeItem("cart")
    localStorage.removeItem("confirm")
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
    localStorage.removeItem("datetimeselected");
    localStorage.removeItem("showllist");
    navigate("/main") 
}
}

const clearTimer = (e) => {
  setTimer('00:05:00');
  if (Ref.current) clearInterval(Ref.current);
  const id = setInterval(() => {
      startTimer(e);
  }, 1000)
  Ref.current = id;
}

const getDeadTime = () => {
  let deadline = new Date();
  deadline.setSeconds(deadline.getSeconds() + 1000000000);
  return deadline;
}

useEffect(() => {
    clearTimer(getDeadTime());
},[]);

const navigate=useNavigate();
    const getDatafromLS=()=>{
        const data=localStorage.getItem("cart")
        if(data){
          return (JSON.parse(data))
        }else{
          return []
        }
      }
      const [cart] = useState(getDatafromLS())
      var  price=localStorage.getItem("price")

      var res=localStorage.getItem("user")
      const log=JSON.parse(res)
      
      var movie  =localStorage.getItem('movie_name')
      var time1=localStorage.getItem("show_time")
      var location1=localStorage.getItem("theatre_name")

  function updateSeats(){
    let seats=[]
    for(var j=0;j<cart.length;j++){
      seats[j]=cart[j].name
    }
      for (var i = 0; i < cart.length; i++) {
        const id= cart[i].id;
         const occupied=true;
         const user=log.id
         const data={occupied,user}
          
      fetch(`http://127.0.0.1:5000/update/${id}`,{
      method:"POST",
     headers:{
      'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    }).then(response => response.json())
    .catch(error => console.log(error))
  }

  const name=log.name
  const email=log.email
  const moviename=movie
  const time=time1
  const location=location1
  const seat=seats.toString()
  const price1=price
  const order={name,email,moviename,time,location,seat,price1}
  fetch('http://127.0.0.1:5000/order',{
   method:"POST",
   headers:{
    'Content-Type':'application/json'
    },
    body:JSON.stringify(order)
  }).then(response => response.json())
  .catch(error => console.log(error))

  clearInterval(Ref.current);
  alert.show("Seats Reserved Successfully",{type:"success"})
  localStorage.removeItem("confirm")

  navigate("/ticket")
      }


      function deleteblock(){
        for (var i = 0; i < cart.length; i++) {
        const available= cart[i].id;
        const occupied=!true;
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
  localStorage.removeItem("confirm")
  localStorage.removeItem("cart")
  localStorage.removeItem("price")
  localStorage.removeItem('seatsSelected')
  clearInterval(Ref.current);
  setTimeout(function(){
    navigate("/seats")
}, 1000)
}   

window.onbeforeunload = function(){
  var confirm1=localStorage.getItem("confirm")
  if(confirm1){
    for (var i = 0; i < cart.length; i++) {
    const available= cart[i].id;
    const occupied=!true
    const user=log.id
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
  clearInterval(Ref.current);
  }else{
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
  clearInterval(Ref.current);
  }
  
  }
    return(
        <div className='conf-des'>
                 <div className ='conf'>
                <h1>CONFIRMATION  </h1>
                <br/>
                <br/>
                <p>Time Remaining:<span>{timer}</span></p>
                <br/>
                <div className="selects">
                <p>Selected seats:
                    </p>
                    {cart && cart.map((item)=><p className='select on'  key={item.id}  >{item.name}
                    </p>)}
                    </div>
                    <br/>
                    <p >Total price:Rs{price}</p>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <button className='routes' onClick={deleteblock}>Back</button>
                    <button className='submit' onClick={updateSeats} >Submit</button>
                  </div>
       </div>
    );
}