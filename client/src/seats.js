import React,{useEffect,useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import './App.css'
export default function Seats(){
    const [data, setData] = useState([]);
   
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
  
    const getData = async () => {
      try{
        const movie=localStorage.getItem('movie_id')
        const theatre=localStorage.getItem("theatre_id")
        const show=localStorage.getItem("show_id")
        const res = await fetch("http://127.0.0.1:5000/seats/movieId/"+movie+"/theatreid/"+theatre+"/showid/"+show)
        const data = await res.json();
        setData(data.seats);
      }catch(error){
        console.log(error) 
      }
    };
  useEffect(() => {
      getData();
      localStorage.setItem("cart",JSON.stringify(cart))
       localStorage.setItem('price',JSON.stringify(price))
       localStorage.setItem('seatsSelected',JSON.stringify(seat_selected))
    }, [cart,price,seat_selected]);

    let seats_wanted=localStorage.getItem("seats_wanted")
    const addDevice=(e,data)=>{
      
      const checkTicket=cart.filter((item)=>item.id===data.id);
      if(checkTicket.length>0){
        e.target.style.background="#444451"
        data.occupied=false
        setSeatselected(seat_selected-1)
        setCart(cart.filter((item) => item.id !== data.id))
        setPrice(price-(data.price))
      }else{
        if(seat_selected<seats_wanted){
          e.target.style.background="red"
          localStorage.getItem("cart")
          data.occupied=true
          // data.selected_users=name
          setCart([...cart, data]);
          setSeatselected(seat_selected+1)
          console.log(data.occupied=true)
       setPrice(parseInt(data.price+price))
        
        }
        else{
          alert("exceeded the number of seats wanted")
        }
      }
    }
    
    //Blocking the seats
    async function blockSeats(){
      
      if(seat_selected<seats_wanted){
        //giving a warning to the user that the seats are less in number
              alert("user has selected less number of seats")   
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
      const occupied=cart[i].occupied
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
          console.log(check)
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
      window.confirm("seats already booked");
      localStorage.removeItem("cart");
      localStorage.removeItem("price");
      localStorage.removeItem("seatsSelected")
      localStorage.removeItem('seatsWanted')
      navigate('/main')
    }
  }
}
const main=()=>{
  localStorage.removeItem("seatsSelected")
  localStorage.removeItem("cart")
  localStorage.removeItem("price")
}

  return(
      <div className='App'>
<h2>Available seats</h2>
     
     <div className='screen'></div>
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
            <div className="selecteds">
            <p>Selected seats:
                  
                    </p>
                    {cart && cart.map((item)=><p className='selected on' key={item.id}  >{item.name}
                    </p>)}
                    </div>
            <div className='row'><p>Total price of tickets:{price} Rs</p></div>
            <div>
            <Link className='route' to="/main" onClick={main}>Back</Link>
         <button className='route' onClick={blockSeats}>Confirm</button>
               
            
            </div>
           
      </div>
  )
}







 