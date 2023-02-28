
import './App.css';
import NavBar from './components/NavBar'
import {BrowserRouter,Routes,Route,useNavigate} from 'react-router-dom'
import React, { useEffect, createContext, useReducer, useContext } from 'react'
import Login from './components/screens/Login'
import Signup from './components/screens/Signup'
import Profile from './components/screens/Profile';
import Home from './components/screens/Home';
import CreatePost from './components/screens/CreatePost';
import {reducer,initialState} from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile';

export const UserContext=createContext()

const Routing=()=>{
const history=useNavigate();
const {state,dispatch}=  useContext(UserContext)

useEffect(()=>{
 
const user= JSON.parse(localStorage.getItem('user'))
if(user){
  dispatch({type:"USER", payload:user})
  console.log("yes logged in");
 // history('/')

}else{
  console.log('no login info')
  history('/login')
}

},
[])

return(
    
    
      <Routes>

      <Route exact path="/profile/:id" element={<UserProfile/>}>

      </Route>

      <Route path="/login" element={ <Login/>}>
       
        </Route>
      
      <Route path="/signup" element={<Signup/>}>
      
      </Route>
      
      <Route path="/profile" element={<Profile/>}>
      
      </Route>
      
      <Route path="/" element={<Home/>}>

      </Route>
      <Route path="/createpost" element={<CreatePost/>}>

      </Route>

      {/* <Route path="/profile/:id" element={<UserProfile/>}>

      </Route> */}

      </Routes>
    
  )
}


function App() {

  const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <div className="App">

<UserContext.Provider value={{state,dispatch}}>
<BrowserRouter>
      <NavBar/>
      
  
      <Routing></Routing>
      
      </BrowserRouter>
</UserContext.Provider>
    </div>
  );
}

export default App;
