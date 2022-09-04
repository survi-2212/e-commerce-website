import React from "react";
import styled from "styled-components";
import { mobile } from "../Responsive";

const Container = styled.div`
  height: 40px;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 3px;
  /* width: 100%; */
  /* box-shadow: 10px 11px 11px -14px #111;  */
  ${mobile({width :"100%",textAlign:"center"})}

  
`;

function Announcement() {
  return (
    <Container>Super deal ! Free Shipping on Orders over Rs.1000</Container>
  );
}

export default Announcement;
