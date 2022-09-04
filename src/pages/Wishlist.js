import React, { useState } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import WishlistDetails from "../components/WishlistDetails";
import { mobile } from "../Responsive";
import { useUserAuth } from "../UserAuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Link } from "react-router-dom";


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
  border:1px solid black;
  background-color: transparent;
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

function Wishlist() {

  const { loggedUser } = useUserAuth();
  const [wishlist, setWishlist] = useState([]);

  if(loggedUser){
    const getData = () => {
      const wishlistItems = [];
      const path = `wishlist-${loggedUser[0].uid}`;
      // console.log(path)

      getDocs(collection(db, path))
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // console.log(doc.id, "=>",doc.data())
            wishlistItems.push({ ...doc.data(), id: doc.id });
          });
          setWishlist(wishlistItems);
          // console.log("done");
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    getData();
  }
  return (
    <div>
      <Container>
        <Announcement />
        <Navbar />
        <Wrapper>
          <Title>YOUR WISHLIST</Title>
          <Top>
          <Link to="/" style={{textDecoration:"none"}}> <TopButton>CONTINUE SHOPPING</TopButton></Link>
            <TopTexts>
              
              <TopText>Your Wishlist ({wishlist.length})</TopText>
            </TopTexts>
          </Top>
          {wishlist ? <>
          {wishlist.map((item)=>(
          <WishlistDetails item={item} key={item.id}/>
          ))}
        </> : <p>Wishlist is empty</p>}
        </Wrapper>
        <Footer />
      </Container>
    </div>
  );
}

export default Wishlist;
