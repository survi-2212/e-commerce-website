import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../Responsive";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Alert, Snackbar } from "@mui/material";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("https://images.unsplash.com/photo-1505801066737-f25b349904b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  object-fit: contain;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9));
  border: 1px solid white;

  ${mobile({ width: "95%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  color: white;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  border: none;
  outline: none;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;

  &:hover{
        transform: scale(1.01);
        transition: 0.8s ease-in-out;
        
    }
`;

function Login() {
  const [password, setpassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const [successmsg, setSuccessMsg] = useState("");
  const [open, setOpen] = React.useState(false);
  
  const navigate=useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => { 
        setSuccessMsg("Log In successful")
        setEmail("");
        setpassword("");
        seterrorMessage("");
        setOpen(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        // console.log(error.code)
        switch (error.message) {
          case "Firebase: Error (auth/user-not-found).":
            seterrorMessage("User not found");
            break;
          case "Firebase: Error (auth/invalid-email).":
            seterrorMessage("Enter valid email");
            break;
          case "Firebase: Error (auth/wrong-password).":
            seterrorMessage("Wrong Password");
            break;
          default:
            seterrorMessage("Enter all the Fields");
        }
        setOpen(true);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };



  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input placeholder="Username" type="email" onChange={(e)=>setEmail(e.target.value)} required/>
          <Input placeholder="Password" type="password" onChange={(e)=>setpassword(e.target.value)} required/>
          <Button type="submit" onClick={handleLogin}>
            LOGIN
          </Button>
          {errorMessage && (
            <>
              <Snackbar
                open={open}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                onClose={handleClose}
              >
                <Alert
                  sx={{ width: "100%" }}
                  severity="error"
                  onClose={handleClose}
                >
                  {errorMessage}
                </Alert>
              </Snackbar>
            </>
          )}
          {successmsg && (
            <>
              <Snackbar
                open={open}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                onClose={handleClose}
              >
                <Alert
                  sx={{ width: "100%" }}
                  severity="success"
                  onClose={handleClose}
                >
                  {successmsg}
                </Alert>
              </Snackbar>
            </>
          )}
          
        </Form>
        <p style={{ color: "white", marginTop: "15px" }}>
          Don't have an account ?{" "}
          <Link to="/register" style={{ color: "white", marginTop: "20px" }}>
            Sign Up
          </Link>
        </p>
      </Wrapper>
    </Container>
  );
}

export default Login;
