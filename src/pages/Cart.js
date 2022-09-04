import React, { useState } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { mobile } from "../Responsive";
import CartDetails from "../components/CartDetails";
import { useUserAuth } from "../UserAuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Link } from "react-router-dom";
import Checkout from "../components/Checkout";
import { Button } from "@mui/material";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "8px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
 
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  ${mobile({ padding:"none" })}
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const CheckoutBtn = styled.button`
  
  width: 150px;
  border: none;
  background-color: black;
  padding: 6px;
 
  
  

  ${mobile({ marginTop: "10px", marginBottom: "10px", width: "100%"})}
`;

function Cart() {
  const { loggedUser } = useUserAuth();
  const [cartData, setcartData] = useState([]);

  if (loggedUser) {
    const getData = () => {
      const cartItems = [];
      const path = `cart-${loggedUser[0].uid}`;
      // console.log(path)

      getDocs(collection(db, path))
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // console.log(doc.id, "=>",doc.data())
            cartItems.push({ ...doc.data(), id: doc.id });
          });
          setcartData(cartItems);
          // console.log("done");
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    getData();
  }
  //  console.log(cartData);

  

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/" style={{ textDecoration: "none" }}>
            
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag({cartData.length})</TopText>
            
          </TopTexts>
        </Top>
        {cartData ? (
          <>
            {cartData.map((item) => (
              <CartDetails item={item} key={item.id}/>
            ))}
          </>
        ) : (
          <p>Cart is empty</p>
        )}
        <CheckoutBtn>
        <Button
          variant="outlined"
          style={{ color: "white",fontWeight:"500", width: "50%", border: "none" }}
        >
          Checkout
        </Button>
      </CheckoutBtn>
      </Wrapper>
      
      
      <Footer />
    </Container>
  );
}

export default Cart;
