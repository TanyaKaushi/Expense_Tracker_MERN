import React, { useState, useEffect, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import M from 'materialize-css'
import styled from 'styled-components'
import { plus } from '../../utils/icons.js';
import Button from '../Button/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
  const navigate = useNavigate()
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [conpassword, setConPassword] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined)
  useEffect(() => {
    if (url) {
      uploadFeilds()
    }

  }, [url])
  const uploadPic = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "user-management");
    data.append("cloud_name", "tanyakaushi");
    fetch("https://api.cloudinary.com/v1_1/tanyakaushi/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const uploadFeilds = () => {
    if (fname == '' || lname == '' || password == '' || email == '' || conpassword == '' || age == '' || dob == '' || address1 == '' || address2 == '' || country == '' || city == '') {
      toast.error('All the fields are required');
    }
    else if (password !== conpassword) {
      toast.error('Password mismatch');
    }
    else if (password.length < 8) {
      toast.error('Your password must contain at least 8 characters.');
    }
    else if (password.search(/[a-z]/i) < 0) {
      toast.error('Your password must contain at least one letter.');
    }
    else if (password.search(/[0-9]/) < 0) {
      toast.error('Your password must contain at least one digit.');
    }
    else if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)) {

      toast.error('Invalid email');
      return
    }
    fetch('http://localhost:5000/signup', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fname,
        lname,
        age,
        dob,
        address1,
        address2,
        country,
        city,
        password,
        email,
        conpassword,
        pic: url
      })
    }).then(res => res.json())
      .then(data => {
        if (data.error) {
          M.toast({ html: data.error, classes: "red" })
        }
        else {
          alert("Successfully Sign Up");
          navigate('/signin')
        }
      }).catch(err => {
        console.log(err)
      })
  }

  const PostData = () => {
    if (image) {
      uploadPic()
    } else {
      uploadFeilds()
    }

  }
  return (
    <Fragment>
      <ToastContainer></ToastContainer>
      <SignUpStyled style={{ marginTop: "50px" }}>
        <div className="bCard" style={{ marginTop: "-20px" }}>
          <div className="card lCard input-field ">
            <h1><b>Sign Up</b></h1>
            <input
              className="input-control"
              type="text"
              placeholder="First Name"
              value={fname}
              onChange={(e) => setFName(e.target.value)}
            />
            <input
              className="input-control"
              type="text"
              placeholder="Last Name"
              value={lname}
              onChange={(e) => setLName(e.target.value)}
            />
            <input
              className="input-control"
              type="text"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <input
              className="input-control"
              type="text"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
            <input
              className="input-control"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="input-control"
              type="text"
              placeholder="Address 1"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
            />
            <input
              className="input-control"
              type="text"
              placeholder="Address 2"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
            />
            <input
              className="input-control"
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <input
              className="input-control"
              type="email"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <div class="row">
              <div class="column"> 
               <input
                className="input-control"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                
              />
              </div>
              <div class="column">
                <span style={{ fontSize: "12px", color: "grey" }}>Password must have at least 8 characters, one letter & one number</span>
              </div>
            </div>
            <input
              className="input-control"
              type="password"
              placeholder="Confirm Password"
              value={conpassword}
              onChange={(e) => setConPassword(e.target.value)}
            />

            <div className="file-field input-field">
              <div className="btn  #bf360c deep-orange darken-4">
                {/* <span>Upload Photo</span> */}
                <input className="input-control" type="file" onChange={(e) => setImage(e.target.files[0])} style={{ width: "270px", fontSize: "15px" }} />
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate input-control" type="text" placeholder="" />
              </div>
            </div>

            <div className="submit-btn">
              <Button
                name={'SIGN UP'}
                icon={plus}
                bPad={'.8rem 1.6rem'}
                bRad={'30px'}
                bg={'var(--color-accent'}
                color={'#fff'}
                onClick={() => PostData()}
              />
            </div>
            <br />
            <Link to="/signin">Already have an account ?</Link>
          </div>
        </div>
      </SignUpStyled>
    </Fragment>

  )
}

const SignUpStyled = styled.nav`
padding: 3rem 1.5rem;
   width: 1500px;
   height: 200%;
   background: rgba(252, 246, 249, 0.78);
   border: 3px solid #FFFFFF;
   backdrop-filter: blur(4.5px);
   border-radius: 32px;
  text-align: center;
   margin: auto;  
   
   gap: 0.5rem;
   input, textarea, select{
    
    margin-right: 10px;
       font-family: inherit;
       font-size: inherit;
       outline: none;
       border: none;
       padding: .5rem 1rem;
       border-radius: 5px;
       border: 2px solid #fff;
       background: transparent;
       margin-top: 10px;
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
       margin-top: 30px;
         box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
         &:hover{
             background: var(--color-green) !important;
         }
     }
 }

`