import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import M from 'materialize-css'

export default function Signup() {

  const [signup,setSignUp] =useState({name:"",email:"",password:""})

    const getSingUpInput=(e)=>{
        //console.log(e.target.name);
      let data=  {...signup,[e.target.name]:e.target.value}
      setSignUp(data)
      

    }
    const clickSignUp=()=>{
      const reg=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(!reg.test(String(signup.email)))
   {
    M.toast({html: "Email format is wrong please check again", classes:'red'})
   } else{

       // console.log(signup);
       axios.post('http://localhost:7000/signup',signup).then(result=>{
        console.log(result);
        console.log(result.data.successMessage);
        M.toast({html: result.data.successMessage, classes:'green'})
       }).catch(err=>{
        M.toast({html: err.response.data.errorMessage, classes:'red'})
        console.log(err.response.data.errorMessage);
       })
      }
    }
    return (
        
           

            <div className="mycard">
                <div class="card auth-card">
                <h3>Signup page</h3>
                <input name="name" type="text" placeholder="Enter name" onChange={getSingUpInput}></input>
               
                <input name="email" type="text" placeholder="Enter email" onChange={getSingUpInput}></input>
                <input name="password" type="password" placeholder="Enter password" onChange={getSingUpInput}></input>
                <button class="waves-effect waves-light btn"  onClick={()=>clickSignUp()}>Signup</button>
                <br></br>
                <br></br>
                <Link to='/login'>Already registered account?</Link>

                </div>

            </div>
            
 
        
            
        
    )
}