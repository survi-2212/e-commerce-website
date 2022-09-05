import React, { useState } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { mobile } from "../Responsive";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Alert, LinearProgress, Snackbar } from "@mui/material";
import { useUserAuth } from "../UserAuthContext";
import { FavoriteBorderOutlined } from "@mui/icons-material";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: contain;
  ${mobile({ height: "50vh", objectFit: "contain" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Brand = styled.h4`
margin-top: 10px;
  font-weight: 600;
`

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 20px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  ${mobile({ width: "100%" })}
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  margin-right:10px;
  transition: 0.9s ease-in-out;
  width: 200px;
  &:hover {
    background-color: #f8f4f4;
    transition: 0.9s ease-in-out;
  }
`;
const Wishlist = styled.button`
  padding: 9px;
  border: 2px solid black;
  background-color: black;
  cursor: pointer;
  font-weight: 500;
  margin-right:10px;
  color: white;
    transition: 0.9s ease-in-out;
  width: 70px;
  &:hover {
    background-color: transparent;
    color: teal;
    border-color:teal;
    transition: 0.9s ease-in-out;
  }

`

// const Wishlist = styled.p`
//   cursor: pointer;
//   text-decoration: underline;
//   margin-bottom: 10px;

//   &:hover{
//     color: teal;
//   }
// `

function SinglePage() {
  const { id, category } = useParams();
  const { loggedUser } = useUserAuth();
  const [successMessage, setsuccessMessage] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const [product, setProduct] = useState("");
  const [size, setSize] = useState("");
  const [open, setOpen] = useState(false);

  

  const sizeItem = ["XS", "S", "M", "L", "XL","One-Size"];

  function GetCurrentProduct() {
    useEffect(() => {
      const getproduct = async () => {
        const docPath = doc(db, `Products-${category.toUpperCase()}`, id);
        const docSnap = await getDoc(docPath);
        setProduct(docSnap.data());
      };
      getproduct();
    }, []);
    return product;
  }
  GetCurrentProduct();
  // console.log(GetCurrentProduct);

  const handleAddCart = () => {
    if (loggedUser) {
      addDoc(collection(db, `cart-${loggedUser[0].uid}`), {
        product,
        size,
        quantity: 1,
        cost:1
      })
        .then(() => {
          setsuccessMessage("Item added to cart");
          setOpen(true);
          
        })
        .catch(() => {
          seterrorMessage("Failed to add item to the cart");
          setOpen(true);
        });
    } else {
      seterrorMessage("You must Log In to continue");
      setOpen(true);
    }
  };

  const handleWishlist =()=>{
    if (loggedUser) {
      addDoc(collection(db, `wishlist-${loggedUser[0].uid}`), {
        product,
        // quantity: 1,
      })
        .then(() => {
          setsuccessMessage("Item added to wishlist");
          setOpen(true);
          
        })
        .catch(() => {
          seterrorMessage("Failed to add item to the wishlist");
          setOpen(true);
        });
    } else {
      seterrorMessage("You must Log In to continue");
      setOpen(true);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Container>
      <Announcement />
      <Navbar />

      {product ? (
        <>
          <Wrapper>
            <ImgContainer>
              <Image src={product.image} />
            </ImgContainer>
            <InfoContainer>
              <Title>{product.title}</Title>
              <Brand><span>Brand : </span>{product.brand}</Brand>
              <Desc>{product.desc}</Desc>
              <span style={{fontSize:"20px"}}>Rs.</span><Price>{product.price}</Price>
              {/* <p>color:{product.color[9]}</p> */}

              
              {product.category === "jwellery" &&
              <>
              <FilterContainer>
                <Filter>
                  <FilterTitle>Size</FilterTitle>
                  <FilterSize
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  >
                    
                      <FilterSizeOption>
                        Select Category
                      </FilterSizeOption>
                      <FilterSizeOption>
                        One Size
                      </FilterSizeOption>
                    
                    
                  </FilterSize>
                </Filter>
              </FilterContainer>
              </>}
              <FilterContainer>
                <Filter>
                  <FilterTitle>Size</FilterTitle>
                  <FilterSize
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  >
                    {sizeItem.map((item, index) => (
                      <FilterSizeOption key={index} value={item || ""}>
                        {item}
                      </FilterSizeOption>
                    ))}
                    
                  </FilterSize>
                </Filter>
              </FilterContainer>
              {/* <Wishlist >Add to wishlist</Wishlist> */}
              <AddContainer>
                <Button onClick={handleAddCart}>ADD TO CART</Button>
                <Wishlist><FavoriteBorderOutlined onClick={handleWishlist}/></Wishlist>
              </AddContainer>
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
            </InfoContainer>
          </Wrapper>
        </>
      ) : (
        <>
          <LinearProgress color="success" />
        </>
      )}

      <NewsLetter />
      <Footer />
    </Container>
  );
}

export default SinglePage;
