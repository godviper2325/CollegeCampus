import axios from 'axios'
import React, { useEffect, useState ,useContext} from 'react'
import { UserContext } from '../../App'

export default function Profile() {
    
    const [image,setImage]=useState([])
    const {state, dispatch}=useContext(UserContext)
   
    useEffect(()=>{
        axios.get('http://localhost:7000/mypost',{
            headers:{
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            }
        }).then(result=>{
            console.log(result);
            setImage(result.data)
            
        })
    },[])
    return (
       
        <div style={{maxWidth:"500px" , margin:"0px auto"}}>
           <div style={{display:"flex", justifyContent:"space-between", margin:"20px 0px", borderBottom:"1px solid gray"}}>  
               <div>
               
                <br></br>
                
                  <br></br>
                
<img style={{width:"180px", height:"180px", borderRadius:"100px"}} src={state?state.image:"loading..."}></img>

               </div>
               <div>
                 <h4>{state.name}</h4>
                 <span>{state.email}</span>
              
                <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                    <h6>{image.length} posts</h6>
                    <br></br>
                    <h6> 10 followers</h6>
                    <h6> 10 following</h6>
                </div>
               
            </div>   
           
           
            </div>
        
         <div className="gallery">
            {
                image.map(item=>{
                    return <img className="photos" src={item.photo} alt={item.title}></img>
                })
            }
            
            </div>
         
       
      </div>          
        
        
  )
}