
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../App'

export default function NavBar() {
     
    const history=useNavigate()

    const { state, dispatch } = useContext(UserContext)

    const onSignout=()=>{
        localStorage.clear()
        dispatch({type:"CLEAR"})
        history('/login')
       
        

    }
    const renderList=()=>{

        const isUserLoggedIn = localStorage.getItem("user");
        if (isUserLoggedIn) {
            return [
                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to="/createpost">CreatePost</Link></li>,
                <li><Link to="/allfollowingpost">Home</Link></li>,
                // <li><Link to="/">HomePage</Link></li>,
                 <li onClick={()=>onSignout()} ><Link >Signout</Link></li>

            ]
        } else {
            return [
                 <li><Link to="/login">LogIn</Link></li>,
                 <li><Link to="/signup">SignUp</Link></li>
               

            ]
        }
    }
    return (

        <nav>
            <div class="nav-wrapper">
                <Link to={state ? "/" : "/login"} className="brand-logo">SRM Friends Circle</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">


                    {renderList()}
                </ul>
            </div>

        </nav>


    )
}