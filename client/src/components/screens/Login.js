
import axios from 'axios'
import React, { useState,useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'


export default function Login() {
  const history=useNavigate()
  const {state,dispatch}=useContext(UserContext)

     const [login,setLogin] =useState({email:"", password:""})
   const getLoginInput=(e)=>{
  let data= {...login,[e.target.name]:e.target.value}
  setLogin(data)

    }
    const clickLogin=()=>{
        console.log(login);

        const reg=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(!reg.test(String(login.email)))
         {
          M.toast({html: "Email format is wrong please check again", classes:'red'})
         }
         else{

          axios.post('http://localhost:7000/signin', login)
         .then(result=>{
            console.log(result.data.successMessage);
            localStorage.setItem('jwt',result.data.token)
            localStorage.setItem('user',JSON.stringify(result.data.user))
            console.log(result.data.token);
            console.log(result.data.user);
            dispatch({type:"USER",payload:result.data.user})
            M.toast({html: result.data.successMessage, classes:'green'})
            history('/')
         })
         .catch(err=>{
            console.log(err.response.data.errorMessage);
          M.toast({html: err.response.data.errorMessage, classes:'red'})
           history('/login')
         })
         }

    }
    return (
        <div className="mycard">
                <div class="card auth-card">
                <h3>Login page</h3>


                <input name="email" type="text" placeholder="Enter email" onChange={ getLoginInput}></input>
                <input name="password" type="password" placeholder="Enter password" onChange={ getLoginInput}></input>
                <button class="waves-effect waves-light btn" onClick={()=>clickLogin()}>Login</button>
                <br></br>
                <br></br>
                <Link to='/signup'>Don't you have account?</Link>

                </div>

            </div>


    )
}
