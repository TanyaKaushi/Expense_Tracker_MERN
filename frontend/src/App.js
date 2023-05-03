import React,{useState ,useEffect, useMemo,  createContext, useReducer, useContext} from 'react'
import styled from "styled-components";
import bg from './img/bg.png'
import { MainLayout } from './styles/Layouts'
import Orb from './components/Orb/Orb'
import Navigation from '../src/components/Navigation/Navigation'
import Dashboard from '../src/components/Dashboard/Dashboard';
import Income from '../src/components/Income/Income'
import Expenses from '../src/components/Expenses/Expenses';
import { useGlobalContext } from './context/globalContext';

import Navbar from "./components/shared/Navbar";
import Signup from "./components/pages/Signup";
import Login from './components/pages/Signin';
import Profile from "./components/pages/Profile";
import {initialState, reducer} from '../src/reducers/userReducer';
import { BrowserRouter, Route, Routes,useNavigate  } from "react-router-dom";

export const UserContext = createContext()

const Routing =()=>{
  const navigate = useNavigate()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user =JSON.parse(localStorage.getItem("user"))

    if(user){
      dispatch({type:"USER", payload:user})
 
    }else{
      navigate('/signin')
    }
  },[])
  return(
<Routes>
<Route path="/" element={<Login />} />
          <Route path="/signin" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          
        </Routes>
  ) 
 
  
}

function App() {

  const [state, dispatch] = useReducer(reducer,initialState)
 


  const global = useGlobalContext()
  console.log(global);

 
  return (
    <AppStyled bg={bg} className="App">
       <div>
      <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <Navbar />
       <Routing/>
      </BrowserRouter>
      </UserContext.Provider>
      
    </div>
    
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default App;
