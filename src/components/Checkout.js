import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../Responsive";

const Container = styled.div`
  padding: 10px;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  margin: 0px 10px;
`;

const Summary = styled.div`
  flex: 1;
  padding: 20px;
  height: 50vh;
  align-items: center;
  ${mobile({ flexDirection: "column" })}
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  /* margin-left: 30%; */
`;

function Checkout({data}) {
    // console.log(data)
    
    


  return (
    <Container>
      <Summary>
        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
        <SummaryItem>
          <SummaryItemText>Subtotal</SummaryItemText>
          <SummaryItemPrice>$ 80</SummaryItemPrice>
        </SummaryItem>
        <SummaryItem>
          <SummaryItemText>Estimated Shipping</SummaryItemText>
          <SummaryItemPrice>$ 5.90</SummaryItemPrice>
        </SummaryItem>
        <SummaryItem>
          <SummaryItemText>Shipping Discount</SummaryItemText>
          <SummaryItemPrice>$ -5.90</SummaryItemPrice>
        </SummaryItem>
        <SummaryItem type="total">
          <SummaryItemText>Total</SummaryItemText>
          <SummaryItemPrice>$ 80</SummaryItemPrice>
        </SummaryItem>
      </Summary>
      <Button>CHECKOUT NOW</Button>
    </Container>
  );
}

export default Checkout;
