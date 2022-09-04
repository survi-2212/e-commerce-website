import React, { useState } from "react";
import styled from "styled-components";
import {
  AccountCircleOutlined,
  FavoriteBorderOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import Badge from "@mui/material/Badge";
import { mobile } from "../Responsive";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../UserAuthContext";
import { auth, db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";


const Container = styled.div`
  height: 70px;
  /* width: 100%; */
  /* box-shadow: 0px 11px 11px -14px #111;  */
  overflow-y: hidden;
  overflow-x: hidden;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  /* flex-wrap: wrap; */
  justify-content: space-between;
  align-items: center;

  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  margin-left: 20px;
`;

const Logo = styled.div`
  font-weight: 200;
  font-size: 40px;
  text-align: center;
  letter-spacing: 4px;
  ${mobile({ fontSize: "24px" })}
`;
const LogoName = styled.span`
  font-family: "Oleo Script Swash Caps", cursive;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2 })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 30px;
  ${mobile({ fontSize: "12px", marginLeft: "20px" })}
`;

function Navbar() {
  const { loggedUser } = useUserAuth();
  const navigate = useNavigate();
  const [cartData, setcartData] = useState([]);
  const [wishlist, setwishlist] = useState([]);

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/");
    });
  };

  const handleMouseOver = (e) => {
    e.target.style.color = "teal";
  };
  const handleMouseOut = (e) => {
    e.target.style.color = "black";
  };

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

    const getWishlistData = () => {
      const wishlistItem = [];
      const path = `wishlist-${loggedUser[0].uid}`;
      // console.log(path)

      getDocs(collection(db, path))
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // console.log(doc.id, "=>",doc.data())
            wishlistItem.push({ ...doc.data(), id: doc.id });
          });
          setwishlist(wishlistItem);
          // console.log("done");
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    getWishlistData();
  }

  // console.log(cartData.length);

  return (
    <Container>
      {!loggedUser && (
        <>
          <Wrapper>
            {/* logo */}
            <Left>
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                <Logo>
                  <LogoName style={{ cursor: "pointer" }}>Bohemian</LogoName>
                </Logo>
              </Link>
            </Left>
            {/* Icons */}
            <Right>
              <MenuItem
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
                <Badge badgeContent={0}>
                  <FavoriteBorderOutlined />
                </Badge>
              </MenuItem>
              <Link
                to="/cart"
                style={{ color: "black" }}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
                <MenuItem>
                  <Badge badgeContent={0}>
                    <ShoppingCartOutlined />
                  </Badge>
                </MenuItem>
              </Link>
              <Link
                to="/login"
                style={{ color: "black" }}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
                <MenuItem>
                  <AccountCircleOutlined />
                </MenuItem>
              </Link>
            </Right>
          </Wrapper>
        </>
      )}

      {loggedUser && (
        <>
          <Wrapper>
            {/* logo */}
            <Left>
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                <Logo>
                  <LogoName style={{ cursor: "pointer" }}>Bohemian</LogoName>
                </Logo>
              </Link>
            </Left>
            {/* Icons */}
            <Right>
              <Link
                to="/profile"
                style={{ textDecoration: "none", color: "black" }}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: "800",
                    cursor: "pointer",
                  }}
                >
                  Hello {loggedUser[0].firstName}
                </p>
              </Link>

              {loggedUser[0].email === "suravisingh331@gmail.com" && (
                <Link
                  to="/addproduct"
                  style={{ textDecoration: "none", color: "black" }}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: "800",
                      marginLeft: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Add
                  </p>
                </Link>
              )}

              <Link  to="/wishlist"
                style={{ color: "black" }} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                <MenuItem>
                  <Badge badgeContent={wishlist.length} color="primary">
                    <FavoriteBorderOutlined />
                  </Badge>
                </MenuItem>
              </Link>

              <Link
                to="/cart"
                style={{ color: "black" }}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
                <MenuItem>
                  <Badge badgeContent={cartData.length} color="primary">
                    <ShoppingCartOutlined />
                  </Badge>
                </MenuItem>
              </Link>

              <MenuItem
                onClick={handleLogout}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
                <LogoutIcon />
              </MenuItem>
            </Right>
          </Wrapper>
        </>
      )}
    </Container>
  );
}

export default Navbar;
