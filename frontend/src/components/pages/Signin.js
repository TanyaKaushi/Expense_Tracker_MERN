import React, { useState, useContext , Fragment} from "react";
import { Link, useNavigate } from "react-router-dom";
import M from 'materialize-css'
import { UserContext } from "../../App";
import styled from 'styled-components'
import { plus } from '../../utils/icons.js';
import Button from '../Button/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignIn() {
  const { state, dispatch } = useContext(UserContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const PostData = () => {
    if (password == '' || email == '') {
      toast.error('All the fields are required');
    }
    else if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)) {
      toast.error('Invalid email');
      return
    }
    fetch('http://localhost:5000/signin', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password,
        email
      })
    }).then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.error) {
          M.toast({ html: data.error, classes: "red" })
        }
        else {
          localStorage.setItem("jwt", data.token)
          localStorage.setItem("user", JSON.stringify(data.user))
          dispatch({ type: "USER", payload: data.user })
          // M.toast({ html: 'Signedin successfully', classes: "green dark" })
          toast.success('Employee has been add');
          alert("Successfully added")
          navigate('/profile')
        }
      }).catch(err => {
        console.log(err)
        toast.error(err);
      })
  }
  return (
    <Fragment>
     <ToastContainer ></ToastContainer>
    <SignInStyled style={{ marginTop: "50px" }}>

      
      <div className="container">

        <div className="row">
          <div className="col-8" style={{ backgroundColor: "#ffebee red lighten-5" }}>
            <div className='bCard'>
              <div data-testid="sign-1" className="card lCard input-field ">

                <h1><b>Sign In</b></h1>
                <input
                  className="input-control"
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="input-control"
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br /><br />
                {/* <button className="submit-btn"
              icon={plus}
              bPad={'.8rem 1.6rem'}
              bRad={'30px'}
              bg={'var(--color-accent'}
              color={'#fff'}
                onClick={() => PostData()}>
                LOGIN
              </button> */}

                <div className="submit-btn">
                  <Button
                    name={'LOGIN'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                    onClick={() => PostData()}
                  />
                </div>
                <br />
                <Link to="/signup">Don't have an account ?</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </SignInStyled>
    </Fragment>

  )
}

const SignInStyled = styled.nav`
padding: 7rem 1.5rem;
    width: 400px;
    height: 200%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
   text-align: center;
    margin: auto;  
    
    gap: 0.5rem;
    input, textarea, select{
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        margin-top: 20px;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control{
        input{
            width: 100%;
        }
    } 

    .submit-btn{
      button{
        margin: auto;
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          &:hover{
              background: var(--color-green) !important;
          }
      }
  }

`