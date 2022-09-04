import React, { useState } from "react";
import styled from "styled-components";
import { mobile, tablet } from "../Responsive";
import { Alert, Button, Snackbar } from "@mui/material";
import { useUserAuth } from "../UserAuthContext";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { DeleteForeverOutlined } from "@mui/icons-material";


const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${tablet({ flexDirection: "column" })}
  

`;

const Info = styled.div`
  flex: 3;

`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  ${tablet({ flexDirection: "column" })}
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  ${tablet({ padding:"10px" })}

`;

const ProductName = styled.span`
  ${tablet({ marginBottom:"10px" })}
`;



const ProductSize = styled.span`
  ${tablet({ marginBottom:"10px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const DeleteBtn = styled.button`
  flex: 1;
  width: 100%;
  border: none;
  background-color: transparent;

  ${mobile({ marginTop: "10px", marginBottom: "10px", width: "100%" })}
`;

// const Button = styled.button`
//   width: 200px;
//   height: 50px;
//   padding: 10px;
//   background-color: black;
//   color: white;
//   font-weight: 600;
//   margin-top: 20px;
//   cursor: pointer;
// `;

function WishlistDetails(item) {
  // console.log(item.item.id)

  const [open, setOpen] = useState(false);
  const [successMessage, setsuccessMessage] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const { loggedUser } = useUserAuth();



  const deleteItem = async () => (
    await deleteDoc(doc(db, `wishlist-${loggedUser[0].uid}`, `${item.item.id}`))
      .then(() => {
        setsuccessMessage("Item Deleted Successfully");
        setOpen(true);
      })
      .catch(() => {
        seterrorMessage("Failed to delete item");
        setOpen(true);
      })
  );

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };



  // const handleAddCart = () => {
  //   if (loggedUser) {
  //     addDoc(collection(db, `cart-${loggedUser[0].uid}`), {
  //       item
  //     })
  //       .then(() => {
  //         setsuccessMessage("Item added to cart");
  //         setOpen(true);
          
  //       })
  //       .catch(() => {
  //         seterrorMessage("Failed to add item to the cart");
  //         setOpen(true);
  //       });
  //   } else {
  //     seterrorMessage("You must Log In to continue");
  //     setOpen(true);
  //   }
  // };

  

  return (
    <Bottom>
      <Info>
        <Hr />
        <Product>
          <ProductDetail>
            <Image src={item.item.product.image}/>
            <Details>
              <ProductName>
                <b>Product:</b>{item.item.product.title}
              </ProductName>
              <ProductSize>
                <b>Size:</b> {item.item.product.size}
              </ProductSize>
              <ProductSize>
              <b>Color :</b> {item.item.product.color}
              </ProductSize>
              <ProductPrice><span style={{fontSize:"20px",fontWeight:"bold"}}>Rs. </span> {item.item.product.price}</ProductPrice>
            </Details>
          </ProductDetail>
        </Product>
      </Info>
      <DeleteBtn onClick={deleteItem}>
        <Button
          variant="outlined"
          startIcon={<DeleteForeverOutlined />}
          style={{ color: "teal", width: "50%", border: "none" }}
        >
          Delete
        </Button>
      </DeleteBtn>
      {/* <Button onClick={handleAddCart}>Add to Cart</Button> */}
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
    </Bottom>
  );
}

export default WishlistDetails;
