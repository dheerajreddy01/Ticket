import {React,Component} from 'react';
import { Link } from 'react-router-dom';
import './App.css'

// const [movie, setMovie] = useState([]);

// const [movie, setMovie] = useState([]);
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesList:[],
      theatreList:[],
      ShowList:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleMovie = this.handleMovie.bind(this);
    this.handleMovie = this.handleMovie.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    let seat=event.target.value;
    localStorage.setItem('seats_wanted',seat)   
  }


  handleMovie(event) {
    // this.setState({value: event.target.value});
    // this.setState({key: event.target.key});
    
    let movie=JSON.parse(event.target.value);
 
    let moviename=movie.name;
    let movieid = movie.id;
  
  
    localStorage.setItem('movie_name',moviename)
    localStorage.setItem('movie_id',movieid)   
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
  
   const res1= await fetch("http://127.0.0.1:5000/movies");
   const data=await res1.json();
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
  
      let movies = this.state.moviesList;
        let optionItems = movies.map((movie) =>
                <option value={JSON.stringify(movie)}>{movie.name}</option>
            );

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
            <p>Pick a movie:
              <select onChange={this.handleMovie} >
                {optionItems}  
              </select>
              </p>
             <br/>
             <p>Pick a Theatre:
              <select onChange={this.handleTheatre} >
                {optiontheatre}
                
              </select>
              </p>
              <br/>
              <p>Pick a Time:
              <select onChange={this.handleTime} >
                {optionshow}
                
              </select>
              </p>
            <br/>
             
            <form>No of Seats needed:
             

                <input type="number" max={5} min={0} onChange={this.handleChange}  />

              
            </form>
            <br></br>
           
            <Link
              className='route'
              to={{
                pathname: '/seats',
                state: this.state.value
              }}>
              Next
            </Link>
            </div>
          </div>
          
      </>
      );
    }
  }       
    
  export default Main;
    