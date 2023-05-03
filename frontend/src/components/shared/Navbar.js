import React, { useContext } from "react";
// import "../../";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import styled from 'styled-components'

export default function Navbar() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const renderList = () => {
    if (state) {
      return [
        <li>
          <Link to="/profile">My Profile</Link>
        </li>,

      ];
    } else {
      return [
        <p style={{ marginRight: "20px" }}>
          <Link to="/signin">Login </Link>
        </p>,

        <p>
          <Link to="/signup"> Signup</Link>
        </p>,
      ];
    }
  };
  return (
    <NavBarStyled>
      <nav >
        <div style={{marginTop: "-10px"}}>

          Expense Tracker

          <div className="links" id="nav-mobile" >
            {renderList()}
          </div>
        </div>


      </nav>

    </NavBarStyled>

  )
}

const NavBarStyled = styled.nav`
  max-width: 1470px;
  height: 30px;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #FFFFFF;
  backdrop-filter: blur(4.5px);
  border-radius: 22px;
  margin: auto;  
  padding: 2rem;
  margin-bottom: -10px;
  


.links{
    float: right;
     display: flex;
  }
  

`