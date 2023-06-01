import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";


const Auth = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
      name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);

  const handleChange = (event) => {
    setInputs((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };


  const sendRequest = async (type = "signin") => {
    const res = await axios
      .post(`http://localhost:8000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      }
   
      )
      .catch((err) => {console.log(err)
     alert("Email Already Exists");
      });

      console.log("Name",inputs.name);
      localStorage.setItem("userImp",inputs.email)
   0   

    const data = await res.data;
    return data;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSignup) {
      sendRequest("signup")
        .then((data) => {localStorage.setItem("userId", data.user._id)
      
    
        
      })
        .then(() => {
          dispatch(authActions.signin());
          dispatch(authActions.logout());
        })
        .then(() => {
          alert("Account Created Successfully !!!");
          
        })
        .then((data) => console.log(data));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => {
          dispatch(authActions.signin());
        })
        .then(() => {
         alert("Login Successfull !!!")
          navigate("/");
        })
        .then((data) => console.log(data));
    }
  };

  return (
    <div >
      <form onSubmit={handleSubmit} >
        <Box
          maxWidth={300}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={3}
          bgcolor={'secondary.main'}
        >
          <Typography variant="h3" padding={3} textAlign="center" color="white">
            {isSignup ? "Sign Up" : "Sign In"}
          </Typography>
          {isSignup && (

            <TextField
              name="name"
              onChange={handleChange}
              placeholder="Name"
              value={inputs.name}
              margin="normal"
              required="true"
              color={'warning'}
              style={{ backgroundColor: "white" }}

            />

          )}
          <TextField
            name="email"
            onChange={handleChange}
            type={"email"}
            value={inputs.email}
            placeholder="Email"
            margin="normal"
            required="true"
            style={{ backgroundColor: "white" }}
          />
          <TextField
            name="password"
            onChange={handleChange}
            type={"password"}
            value={inputs.password}
            placeholder="Password"
            margin="normal"
            required="true"
            style={{ backgroundColor: "white" }}
          />


          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="info"
          >
            {isSignup ? "Create Account" : "Sign In"}
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 2 }}
            color="secondary"
          >
            {isSignup ? "have an Account? Sign In" : "New User? Register Now"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
