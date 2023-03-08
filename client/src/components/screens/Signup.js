import React, { useState } from 'react'
import { Await, Link } from 'react-router-dom'
import axios from 'axios'
import M from 'materialize-css'

export default function Signup() {

  const [signup,setSignUp] =useState({name:"",email:"",password:"",image:""})
  const [url, setUrl] = useState([])
  const getFileInput = (e) => {
    // console.log(e.target.files[0].name);
    if (e.target.name === 'image') {
        let data = { ...signup, [e.target.name]: e.target.files[0] }
        setSignUp(data)
    } else {
        let data = { ...signup, [e.target.name]: e.target.value }
        setSignUp(data)
    }

}

    const getSingUpInput=(e)=>{
        //console.log(e.target.name);
      let data=  {...signup,[e.target.name]:e.target.value}
      setSignUp(data)
      

    }
    //const signUp=()=>{
      // axios.post('http://localhost:7000/signup',{name:signup.name,email:signup.email,password:signup.password,image:url})
      // .then(result=>{
      //   console.log(result);
      //   console.log(result.data.successMessage);
      //   M.toast({html: result.data.successMessage, classes:'green'})
      //  }).catch(err=>{
      //   M.toast({html: err.response.data.errorMessage, classes:'red'})
      //   console.log(err.response.data.errorMessage);
      //  })
     //}
    const clickSignUp=async()=>{
      const reg=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(!reg.test(String(signup.email)))
   {
    M.toast({html: "Email format is wrong please check again", classes:'red'})
   } else{

       // console.log(signup);

       const data = new FormData()
        data.append('file', signup.image)
        data.append('upload_preset', 'socialmedia')
        data.append('cloud_name', 'deswhfdie')

       let resultdata = await axios.post('https://api.cloudinary.com/v1_1/deswhfdie/image/upload', data)
      .then(result=>{
        console.log(result.data.url);
        setUrl(url.push(result.data.url))

        axios.post('http://localhost:7000/signup',{name:signup.name,email:signup.email,password:signup.password,image:url[0]})
      .then(result=>{
        console.log(result);
        console.log(result.data.successMessage);
        M.toast({html: result.data.successMessage, classes:'green'})
       }).catch(err=>{
        M.toast({html: err.response.data.errorMessage, classes:'red'})
        console.log(err.response.data.errorMessage);
       })
        
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
                
                <div className="file-field input-field">
                <div className="btn">
                    <span>Upload Profile Picture</span>
                    <input name="image" type="file" onChange={getFileInput}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" placeholder="Upload Profile Picture" />
                </div>
            </div>

            <button class="waves-effect waves-light btn"  onClick={()=>clickSignUp()}>Signup</button>
                <br></br>
                <br></br>
                <Link to='/login'>Already registered account?</Link>

                </div>

            </div>
            
 
        
            
        
    )
    }
  
