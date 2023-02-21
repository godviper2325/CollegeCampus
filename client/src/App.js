
import './App.css';
import NavBar from './components/NavBar'
import {BrowserRouter,Routes,Route,useNavigate} from 'react-router-dom'
import React, { useEffect, createContext, useReducer } from 'react'
import Login from './components/screens/Login'
import Signup from './components/screens/Signup'
import Profile from './components/screens/Profile';
import Home from './components/screens/Home';
import CreatePost from './components/screens/CreatePost';
import {reducer,initialState} from './reducers/userReducer'

export const UserContext=createContext()

const Routing=()=>{
const history=useNavigate();

useEffect(()=>{

const user= JSON.parse(localStorage.getItem('user'))
if(user){
  history('/home')
}else{
  history('/login')
}
},
[])

return(
    
    
      <Routes>
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
