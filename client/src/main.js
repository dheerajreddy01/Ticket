import {React,Component} from 'react';
import { Link } from 'react-router-dom';
import './App.css'
import avt from "./assets/avatarimg.jpeg";
import major from './assets/majorimg.jpg'




class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesList:[],
      theatreList:[],
      ShowList:[]
    
    };
    this.handleChange = this.handleChange.bind(this);

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
  localStorage.setItem('movie_id',item);
}


handleTheatre(event) {
  let theatre=JSON.parse(event.target.value);
  let theatrename=theatre.tname;
  let theatreid = theatre.id;
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
  const res2=await fetch("http://127.0.0.1:5000/theatre");
  const data1=await res2.json();
  const res3=await fetch("http://127.0.0.1:5000/show");
  const data3=await res3.json();

  this.setState({
    moviesList: data.movies,
    theatreList: data1.theatre,
    ShowList:data3.show
});
       
      
}


render () {
 
      // let movies = this.state.moviesList;
      let theatre = this.state.theatreList;
      let optiontheatre = theatre.map((theatres) =>
              <option value={JSON.stringify(theatres)}>{theatres.tname}</option>
          );

          let show = this.state.ShowList;
          let optionshow = show.map((shows) =>
                  <option value={JSON.stringify(shows)}>{shows.time}</option>
              );

       

        return (
      <>
         
          <div className='book'>
            <div className='movieselect'>
               {/* huyy */}
              <Link
             
              to={{
                pathname: '/seats',
                state: this.state.value
              }}>
            
              
              <div className="row"> 
              <div onClick={this.setMovid.bind(this,1)} className="col">
              <div onClick={this.clickMe.bind(this,'Avatar') }>
              <img src={avt} class="card-img-top" alt="Avatar" />
              <p className='movname-des'> Avatar</p>
              </div>
              </div>

              <div onClick={this.setMovid.bind(this,2)} className="col">
              <div onClick={this.clickMe.bind(this,'Major') }>
              <img src={major} class="card-img-top" alt="major" />
              <p className='movname-des'> Major</p>
              </div>
              </div>
              </div>

             
           
              
              </Link>
                {/* hhhyhy */}
                </div>
            
             <br/>
             
    <div className='property'> 
                <div className='form-des'>
                <form> Seats Needed
                <input type="number" max={5} min={0} onChange={this.handleChange} placeholder="Choose Seats" />
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
                {optionshow}
                
              </select>
              </p>
    </div>
             
              
             

            <br></br>
               
    
    </div>
        
       

      </>
      );
    }
  }       
    
  export default Main;