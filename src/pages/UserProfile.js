import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { mobile } from "../Responsive";
import { useUserAuth } from "../UserAuthContext"


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
  /* overflow-x: hidden; */
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9));
  border: 1px solid white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  color: white;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  /* ${mobile({ flexDirection: "column" })} */
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const ButtonLink = styled.div`
  display: flex;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  cursor: pointer;
  margin-top: 10px;
  letter-spacing: 2px;
  margin-right: 10px;

  &:hover {
    transform: scale(1.01);
    transition: 0.8s ease-in;
  }
`;

function UserProfile() {

    const {loggedUser} = useUserAuth();

  return (
    <>
      <Navbar />

      <Container>
        <Wrapper>
          <Title>Account Details</Title>
          <Form>
            <Input type="text" placeholder="First Name" value={loggedUser[0].firstName} readOnly/>
            <Input type="text" placeholder="Last name" value={loggedUser[0].lastName} readOnly/>
            <Input type="email" placeholder="Email" value={loggedUser[0].email} readOnly/>
            <Input type="text" placeholder="Contact No" value={loggedUser[0].phoneNo} readOnly/>
            <ButtonLink>
              <Button type="button">
                <Link to="/" style={{textDecoration:"none",color:"white"}}>My Orders</Link>
              </Button>

              <Button type="button">
                <Link to="/" style={{textDecoration:"none",color:"white"}}>Home</Link>
              </Button>
            </ButtonLink>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
}

export default UserProfile;
