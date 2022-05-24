

import {React,Component} from 'react';
import { Link } from 'react-router-dom';
import './main.css'
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import addDays from 'date-fns/addDays'  
import moment from 'moment';




class Main extends Component {
  constructor(props) {
  
    super(props);
    this.state = {
      moviesList:[],
     
      ShowList:[],
     
      optiontime:null,
      selected:null,
      datetimeselected:null,
      dateselected:null,
      selectedmovieid:null
    
    };
  

    if(localStorage.getItem("dateselected")){
      this.setState({
      dateselected:new Date(localStorage.getItem("dateselected"))
    })
  }

    this.handleChange = this.handleChange.bind(this);
    // this.handleDate=this.handleDate.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);  
    this.handleTheatre=this.handleTheatre.bind(this);
    
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    let seat=event.target.value;
    localStorage.setItem('seats_wanted',seat)   
  }
  
  

clickMe(item){
  localStorage.setItem('movie_name', item); 
}
setMovid(item){

  localStorage.setItem('movie_id',item.id);
  localStorage.setItem('movie_name', item.name);
  this.setState({
    selectedmovieid:item.id
  })
}

// handleDate(datetime) {  
//   this.setState({  
//     selecteddate: datetime
//     // startDate: moment(datetime)
//   })  
  
//   // const dateselected=moment(this.state.selecteddate).format('YYYY-MM-DD')
//   // this.setState({
//   //   newdatetime:da
//   // })
//   // localStorage.setItem("dateselected",dateselected)
// } 

 async onFormSubmit (datetimefront) {  
 
  
  
  const dateselected_str=moment(datetimefront).format('YYYY-MM-DD')
  // localStorage.setItem("dateselected",dateselected)
  this.setState({
    dateselected: new Date(dateselected_str)
    // theatreList: data3.theatre,
    
})
localStorage.setItem("dateselected",dateselected_str)
 
  const current_date= moment().format("YYYY-MM-DD")

  // checking for date and time 
  // if current date then time should be current time
  let timeselected=""
  if(current_date===dateselected_str){
     timeselected=moment().format("HH:mm:ss")

  }
  // if not current date then time should start 00:00:00

  else{
     timeselected='00:00:00'
 
  }

  const datetimeselected=dateselected_str.concat(" ",timeselected)

  localStorage.setItem("datetimeselected",datetimeselected)
  // this.setState({  
  //   datetimeselected: datetimeselected,
  // })  

  const movieid=localStorage.getItem('movie_id')
  // const datetime=localStorage.getItem("datetimeselected")
  const res3=await fetch("http://127.0.0.1:5000/show/movieID/"+movieid+"/date/"+datetimeselected);
  const data3=await res3.json();
   
  // console.log(datetimefront.toString())
  // localStorage.setItem("selecteddate",datetimefront.toString())

  this.setState({
    // dateselected: new Date(dateselected),
    // theatreList: data3.theatre,
    ShowList:data3.show
})

localStorage.setItem("showlist",JSON.stringify(data3.show));    

  
} 

handleTheatre(event) {
  let show=JSON.parse(event.target.value);
  let theatrename=show.theatre_name;
  let theatreid = show.theatre_id;
  this.setState({  
    selected: theatreid,
  })  
  localStorage.setItem('theatre_name',theatrename)
  localStorage.setItem('theatre_id',theatreid)   
}






handleTime(event) { 
  let show=JSON.parse(event.target.value);
  let showtime=show.time;
  let showid = show.id;
  localStorage.setItem('show_time',showtime)
  localStorage.setItem('show_id',showid)   
}

async componentDidMount() {
   
  const res= await fetch("http://127.0.0.1:5000/movies");
  const data=await res.json();
// console.table(data.movies)
  // const res2=await fetch("http://127.0.0.1:5000/theatre");
  // const data1=await res2.json();
//   const movieid=localStorage.getItem('movie_id')
//   const datetime=localStorage.getItem("datetimeselected")
//   const res3=await fetch("http://127.0.0.1:5000/show/movieID/"+movieid+"/date/"+datetime);
//   const data3=await res3.json();
   
  this.setState({
    moviesList: data.movies,
    // theatreList: data3.theatre,
    // ShowList:data3.show
})
// localStorage.setItem("showlist",this.state.ShowList);         
}




tConvert (time) {
  // Check correct time format and split into components
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice (1);  // Remove full string match value
    time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join (''); // return adjusted time or original string
}



render () {
 
      // if(localStorage.getItem("selecteddate"))
      // this.setState({
      //   selecteddate:new Date(localStorage.getItem("selecteddate"))
      // })
      let shows = this.state.ShowList;
      if(localStorage.getItem("showlist") &&localStorage.getItem("showlist").length!==0 ){
        shows=JSON.parse(localStorage.getItem("showlist"))

      }
 
      
      let optiontheatre = shows.map((show) =>
              <option value={JSON.stringify(show)}>{show.theatre_name}</option>
          );
              
        
        
            let optiontime = shows.filter((show) => show.theatre_id===this.state.selected).map((show) =>
                            <option value={JSON.stringify(show)}>{this.tConvert(show.time)}</option>
                        );  

        return (
      <>
         
          <div className='book'>
            <div className='movieselect'>
               

              
          <div className='row-des'>

              {this.state.moviesList.map((movie) => {
               
                return(
                 
                  <div className="col-des"> 


                 <div onClick={() => this.setMovid(movie)}  >
                  
                  <img src={movie.img} className="card-img-top" alt={movie.name} style={{ border: movie.id === this.state.selectedmovieid ? '5px solid red' : 'none'}}/>
               
                  <p className='movname-des'>{movie.name}</p>
                  </div>
                  </div>

                  
                );
              })}

          </div>
             
       
              
             
               
                </div>
           
            
             <br/>
             
    <div className='property'> 
 {/* <form onSubmit={ this.onFormSubmit }>  */}
 {/* <form >  */}
        <div className="form-group">  
        
        <div>Select Date:</div>
      
          <ReactDatePicker  
              // selected={ this.state.dateselected }  
              selected={localStorage.getItem("dateselected")
                ? new Date(localStorage.getItem("dateselected"))
                : new Date()}
              onChange={this.onFormSubmit}
              name="selectedDate"  
              placeholderText='Enter Date'
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
              maxDate={addDays(new Date(), 5)} 
          /> 
                {/* <button className="btn">Select Date</button>     */}
        </div>  
    {/* </form>  */}



    <div className='form-des'>
      
                <form onsubmit="return false"> Seats Needed
                <input type="number" max={5} min={0} onChange={this.handleChange} 
                value={localStorage.getItem("seats_wanted")?
                localStorage.getItem("seats_wanted"):
                0
                } placeholder="Choose Seats" />
                </form>
                </div>
              
              <p className='theatre'>Theatre
              <select onChange={this.handleTheatre} >
              <option value="">Select Theatre</option>
                {optiontheatre}
                
              </select>
              </p>

              <p className="show">Time
              <select onChange={this.handleTime} >
              <option value="">Select Time</option>
                {optiontime}
                
              </select>
              </p>
    </div>

    <br></br>
      <div className='link'>        
    <Link className='sub-btn'
             
     to={{
       pathname: '/seats',
       state: this.state.value
     }}> submit
      </Link>
      </div> 
    </div>
     
        
       

      </>
      );
    }
  }       
    
  export default Main;
















