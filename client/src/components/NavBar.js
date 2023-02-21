
import React from 'react'
import {Link} from 'react-router-dom'

export default function NavBar() {
    return (
        
            <nav>
                <div class="nav-wrapper">
                    <Link to="/" class="brand-logo">SRM Friends Circle</Link>
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li><Link to="/login">LogIn</Link></li>
                        <li><Link to="/signup">SignUp</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/createpost">CreatePost</Link></li>
                    </ul>
                </div>
                
            </nav>
            
        
    )
}