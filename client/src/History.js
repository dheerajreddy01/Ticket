
import React,{useState,useEffect} from 'react';
import './History.css'
function History(){

    const [data,setData]=useState([])
       
        const getData = async () => {
            try{
              const res = await fetch("http://127.0.0.1:5000/history");
              const result = await res.json();
              setData(result.history);
              console.log(data)
            }catch(error){
              console.log(error) 
            }
          };
        useEffect(() => {
            getData();
        },[]);
       
        let user=localStorage.getItem("user")
        var users=JSON.parse(user)
    let email=users.email
    
    
    
    
    return(
        <div>
                
                <div>
                      
                    {data && data.map((item)=><p  key={item.id}>
                        {item.email===email?
                      <div className="container">
	
	<div className="bp-card" data-clickthrough="link">
		<div className="bp-card_label">
			<div className="bd-border_solid"></div>
			<div className="bd-border_dotted"></div>
		</div>
		<div className="bp-card_content">
			<p className="secondary">Movie</p>
			<h4>{item.moviename}</h4>
			
			
			<ul>
				
					<li>
					<span>{item.seats}</span>	
					</li>
					<li>
						{item.date}
					</li>
					<li>
						{item.name}
					</li>
          <li>
            <p className='barcode'></p>
          </li>
			</ul>
			
			<a href="" className="price">
				Rs {item.price}/-
			</a>
			
      
		</div>
	</div>
	
</div>
                        :null
                    } </p>)}
                    
                    </div>
            </div>     
        
    );
     }
    export default History;