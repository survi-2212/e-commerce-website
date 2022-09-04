import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { mobile } from "../Responsive";

const Container = styled.div`
  flex: 1;
  height: 70vh;
  margin: 3px;
  position: relative;
  overflow-y: hidden;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  ${mobile({ height: "20vh" })}
`;
const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`;
const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.6s ease;

  &:hover {
    background-color: gray;
    color: white;
  }
`;

function CatagoriesItem({ item }) {

  

  
  return (
    <Container>
    <Link to={`/categoryitem/${item.cat}`}>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Button >Shop Now</Button>
      </Info>
      </Link>
    </Container>
  );
}

export default CatagoriesItem;
