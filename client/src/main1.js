import {React, useState, useEffect} from 'react';
import './main1.css'
import { Card,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default function Main1(){
    const [moviesList,setMovieslist]=useState([])
    const [selected,setSelected]=useState([])

    var ShowList=localStorage.getItem("ShowList")
    var id=localStorage.getItem("movie_id")
    const getData = async () => {
        try{
          const res= await fetch(`http://127.0.0.1:5000/movies/${id}`);
          const data=await res.json();
          setMovieslist(data.movies)
          console.log(moviesList)
        }catch(error){
          console.log(error) 
        }
      };
      
useEffect(() => {
    getData()
     
   }, []);

   const back=()=>{
    
    localStorage.removeItem("movie_name")
    localStorage.removeItem("movie_id")
    localStorage.removeItem("show_time")
    localStorage.removeItem("show_id")
    
    localStorage.removeItem("theatre_name")
    localStorage.removeItem("theatre_id")
    localStorage.removeItem("seats_wanted")
   
    localStorage.removeItem("seatsSelected")
    localStorage.removeItem("dateselected")
    localStorage.removeItem("datetimeselected")
    localStorage.removeItem("showlist") 
   }

   const handleChange=(event) =>{
    
    let seat=event.target.value;
    localStorage.setItem('seats_wanted',seat)   
  }
 
   const tConvert =(time)=> {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  }
   
   let shows =ShowList;
      if(localStorage.getItem("showlist") &&localStorage.getItem("showlist").length!==0 ){
        shows=JSON.parse(localStorage.getItem("showlist"))
      }
      let newshows=[]
      for(let i=0;i<shows.length;i++){
        newshows[i]=shows[i]
      }
     
      let dups=new Set()
       for(let i=0;i<newshows.length;i++){
         let show=newshows[i]
         
         if(dups.has(show.theatre_name)){
           newshows.splice(i,1)
         }
         dups.add(show.theatre_name)
       }
  
      
      let optiontheatre = newshows.map((show) =>
              <option value={JSON.stringify(show)}>{show.theatre_name}</option>
          );
   
              
        
      let optiontime = shows.filter((show) => show.theatre_id===selected).map((show) =>
                            <option value={JSON.stringify(show)}>{tConvert(show.time)}</option>
                        );  

let ds=localStorage.getItem("dateselected")

const handleTheatre=(event) =>{
    let show=JSON.parse(event.target.value);
    let theatrename=show.theatre_name;
    let theatreid = show.theatre_id;
    setSelected(theatreid)
    localStorage.setItem('theatre_name',theatrename)
    localStorage.setItem('theatre_id',theatreid)   
  }
  
  
  
  const handleTime=(event)=> { 
    let show=JSON.parse(event.target.value);
    let showtime=show.time;
    let showid = show.id;
    localStorage.setItem('show_time',showtime)
    localStorage.setItem('show_id',showid)   
  }
   

  return(
      <>
      <div className='body'>
    <div className="card-box">
    <div className="card-box-header">
      <img src={moviesList.img} className="card-img-top"    alt={moviesList.name}/>
    </div>
    <div className="card-box-content">
     <h4>{moviesList.name}</h4> <p className='date'>{ds}</p>
     

      <span >Theatre
              <select onChange={handleTheatre} >
              <option value="">Select Theatre</option>
                {optiontheatre} 
              </select>
              </span>
              <span >Time
              <select onChange={handleTime} >
              <option value="">Select Time</option>
                {optiontime} 
              </select>
              </span>
              <span className='dates1'>  Seats Needed
                <input type="number" max={5} min={0} onChange={handleChange} 
                 placeholder="Choose Seats" />
              </span>


      <div className="card-box-content-action">
        <div className="circle-btn">
          <Link to="/main" onClick={back}><img src="https://s2.svgbox.net/materialui.svg?ic=arrow_back_ios" width="25" height="25"/></Link>
          <Link to="/seats"><img src="https://s2.svgbox.net/materialui.svg?ic=arrow_forward_ios" width="25" height="25"/></Link>
        </div>
        
      
      </div>
      
    </div>
  
  </div>
   
<div>

     
</div>
  
    </div>
  

    </>
  );




}