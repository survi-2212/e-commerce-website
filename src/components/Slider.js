import React, { useState } from "react";
import styled from "styled-components";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { sliderItems } from "../data";
import { mobile, tablet } from "../Responsive";
// import React, { Component } from "react";
// import Slider from "react-slick";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })}
`;
const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transform: translateX(${(props) => props.SlideIndex * -100}vw);
  transition: all 1.5s ease;
`;
const Slide = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #${(props) => props.bg};
`;
const ImageContainer = styled.div`
  flex: 1;
  height: 100%;
  /* margin-left: 30px; */
`;
const Image = styled.img`
  height: 80%;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;
const Title = styled.h1`
  font-size: 60px;
`;
const Desc = styled.p`
  margin: 45px 0;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 3px;
`;
const Button = styled.button`
  padding: 10px;
  font-size: 15px;
  background-color: transparent;
  cursor: pointer;
  border: 0.5px solid grey;
  letter-spacing: 2px;
  /* border-radius: 30px; */
  font-weight: 600;
  transition: all 0.9s ease;

  &:hover {
    background-color: grey;
    color: white;
  }
`;

function Slider() {
  const [SlideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(SlideIndex > 0 ? SlideIndex - 1 : 2);
    } else {
      setSlideIndex(SlideIndex < 2 ? SlideIndex + 1 : 0);
    }
  };



  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ChevronLeftOutlinedIcon />
      </Arrow>
      <Wrapper SlideIndex={SlideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImageContainer>
              <Image src={item.img} />
            </ImageContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Button>SHOP NOW</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ChevronRightOutlinedIcon />
      </Arrow>
      


    </Container>
  );
}

export default Slider;
