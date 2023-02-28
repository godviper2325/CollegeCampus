import axios from 'axios'
import React, { useEffect, useState ,useContext} from 'react'
import { UserContext } from '../../App'
import { useParams } from 'react-router-dom'

export default function UserProfile() {
    const [post,setPosts]=useState([])
    const [user,setUser]=useState({})
    const {state, dispatch}=useContext(UserContext)
    const {id} =useParams()

    console.log(id);
    useEffect(()=>{
        axios.get('http://localhost:7000/user/'+id,{
            headers:{
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            }
        }).then(result=>{
            console.log(result);
            setPosts(result.data.posts)
            setUser(result.data.user)
            
        })
    },[])
    return (
       
//         <div style={{maxWidth:"500px" , margin:"0px auto"}}>
//            <div style={{display:"flex", justifyContent:"space-between", margin:"20px 0px", borderBottom:"1px solid gray"}}>  
//                <div>
               
//                 <br></br>
                
//                   <br></br>
                
// <img style={{width:"180px", height:"180px", borderRadius:"100px"}} src={require('../../images/logo2.jpg')}></img>

//                </div>
//                <div>
//                  <h4>{user.name}</h4>
//                  <span>{user.email}</span>
              
//                 <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
//                     <h6>{post.length} posts</h6>
//                     <br></br>
//                     <h6> 10 followers</h6>
//                     <h6> 10 following</h6>
//                 </div>
               
//             </div>   
           
           
//             </div>
        
//          <div className="gallery">
//             {
//                 post.map(item=>{
//                     return <img key={item._id} className="photos" src={item.photo} alt={item.title}></img>
//                 })
//             }
            
//             </div>
         
       
//       </div> 
      <>
      {user?
       <div style={{maxWidth:"500px" , margin:"0px auto"}}>
       <div style={{display:"flex", justifyContent:"space-between", margin:"20px 0px", borderBottom:"1px solid gray"}}>  
           <div>
           
            <br></br>
            
              <br></br>
            
<img style={{width:"180px", height:"180px", borderRadius:"100px"}} src={require('../../images/logo2.jpg')}></img>

           </div>
           <div>
             <h4>{user.name}</h4>
             <span>{user.email}</span>
          
            <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                <h6>{post.length} posts</h6>
                <br></br>
                <h6> 10 followers</h6>
                <h6> 10 following</h6>
            </div>
           
        </div>   
       
       
        </div>
    
     <div className="gallery">
        {
            post.map(item=>{
                return <img key={item._id} className="photos" src={item.photo} alt={item.title}></img>
            })
        }
        
        </div>
     
   
  </div> 
  :
  <h1>Loading...</h1>
      }
      </>         
        
    )
}