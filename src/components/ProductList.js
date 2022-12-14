import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { Rating } from "@mui/material";
import { mobile, tablet } from "../Responsive";
import { Link } from "react-router-dom";




const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;
const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  flex-wrap: wrap;

  &:hover ${Info} {
    opacity: 1;

    ${tablet({ flexDirection: "column" })}
  }
`;
const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;
const Image = styled.img`
  height: 90%;
  z-index: 2;
  /* object-fit: contain; */
  /* max-width:300px; */
  
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Details = styled.div`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  margin-top: 6px;

  ${mobile({ flexDirection: "column" ,marginTop:"10px"})}
`;

const Ratings = styled.div`
  ${mobile({ marginTop: "10px" })}
`;

function ProductList({ item }) {
  // console.log(item)
  const [value, setValue] = useState(3);
  return (
    <>
      <div>
        <Container>
          <Circle />
          <Image
            src={
              item && item.image
                ? item.image
                : "https://sometestimage.com/test.jpg"
            }
          />
          <Info>
          {/* <a href={`/singlepage/${item.category}/${item.id}`} style={{color:"black"}}>
            <Icon>
              <SearchIcon />
            </Icon>
            </a> */}
          <Link to={`/singlepage/${item.category}/${item.id}`} style={{color:"black"}}>
            <Icon>
              <SearchIcon />
            </Icon>
            </Link>
          </Info>
        </Container>
        <Details>
          <div style={{ letterSpacing: "3px" }}>
            <h4 style={{marginBottom:"7px"}}>{item.title}</h4>
            <h4>Rs.{item.price}</h4>
          </div>
          <Ratings>
            <Rating name="disabled" value={value} disabled />
          </Ratings>
        </Details>
      </div>
    </>
  );
}

export default ProductList;
