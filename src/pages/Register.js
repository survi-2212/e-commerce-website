import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { mobile } from "../Responsive";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { Alert, Snackbar } from "@mui/material";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("https://images.unsplash.com/photo-1515023677547-593d7638cbd6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  object-fit: contain;
  overflow-y: hidden;
  
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;

  ${mobile({ flexDirection: "column" })}
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  border: none;
  outline: none;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  cursor: pointer;
  margin-top: 10px;
  color: white;
  letter-spacing: 2px;

  /* &:hover {
    transform: scale(1.01);
    transition: 0.8s ease-in-out;
  } */
`;

function Register() {
  const [email, setEmail] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [phoneNo, setphoneNo] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [successMessage, setsuccessMessage] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const initialCartValue = 0;
        const initialWishlist = 0;
        // console.log(user);

        addDoc(collection(db, "users"), {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNo: phoneNo,
          password: password,
          uid: user.uid,
          cart: initialCartValue,
          wishlist: initialWishlist,
        })
          .then(() => {
            setsuccessMessage("Successfully Signed up");
            setOpen(true);
            setfirstName("");
            setlastName("");
            setEmail("");
            setphoneNo("");
            setpassword("");
            setTimeout(() => {
              setsuccessMessage("");
              navigate("/login");
            }, 3000);

            
          })

          .catch((error) => seterrorMessage(error.message));
      })
      .catch((error) => {
        console.log(error.message);
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          seterrorMessage("Email already in use");
        }
        if (error.message === "Firebase: Error (auth/invalid-email).") {
          seterrorMessage("Enter valid email");
        }
        if (
          error.message ===
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
        ) {
          seterrorMessage("Password should be at least 6 characters ");
        }
        if (error.message === "Firebase: Error (auth/internal-error).") {
          seterrorMessage("Fill all the fields");
        }
        if (password !== confirmPassword) {
          seterrorMessage("Password do not match");
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
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input
            type="text"
            placeholder="First Name"
            onChange={(e) => setfirstName(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Last name"
            onChange={(e) => setlastName(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Contact No"
            onChange={(e) => setphoneNo(e.target.value)}
            maxLength="10"
            required
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setpassword(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setconfirmPassword(e.target.value)}
            required
          />
          <Button type="submit" onClick={handleSubmit}>
            CREATE
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
          {successMessage && (
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
                  {successMessage}
                </Alert>
              </Snackbar>
            </>
          )}
        </Form>

        <p style={{ color: "white", marginTop: "15px" }}>
          Already have an account ?
          <Link to="/login" style={{ color: "white", marginTop: "20px" }}>
            Log In
          </Link>
        </p>
      </Wrapper>
    </Container>
  );
}

export default Register;
