import React, { useEffect, useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import styled from "styled-components";
import { mobile } from "../Responsive";
import { DeleteForeverOutlined } from "@mui/icons-material";
import { Alert, Button, Snackbar } from "@mui/material";
import { useUserAuth } from "../UserAuthContext";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const Bottom = styled.div`
  display: flex;
  justify-content: space-evenly;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Image = styled.img`
  width: 200px;
  object-fit: contain;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  ${mobile({ padding: "10px" })}
`;

const ProductName = styled.span`
  ${mobile({ marginBottom: "10px" })}
`;

const ProductId = styled.span`
  ${mobile({ marginBottom: "10px" })}
`;

// const ProductColor = styled.div`
//   width: 20px;
//   height: 20px;
//   border-radius: 50%;
//   background-color: ${(props) => props.color};
// `;

const ProductSize = styled.span`
  ${mobile({ marginBottom: "10px" })}
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${mobile({ flexDirection: "row", justifyContent: "space-between" })}
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const DeleteBtn = styled.button`
  flex: 1;
  width: 100%;
  border: none;
  background-color: transparent;

  ${mobile({ marginTop: "10px", marginBottom: "10px", width: "100%" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
  margin-bottom: 10px;
`;

function CartDetails({ item }) {
  // console.log(item.id);
  const { loggedUser } = useUserAuth();
  const [count, setcount] = useState(item.quantity);
  const [open, setOpen] = useState(false);
  const [successMessage, setsuccessMessage] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const Price = item.product.price * count;


  const handleIncrement = async () => {
    setcount(count + 1);
        

    const itemRef = doc(db, `cart-${loggedUser[0].uid}`, `${item.id}`);
    await updateDoc(itemRef, {
      quantity: count + 1,
      
    })
      .then(() => {
        console.log("quantity changed");
      })
      .catch(() => {
        console.log("failed");
      });
  };

  const handleDecrement = async () => {
    if (count >= 1) {
      setcount(count - 1);

      const itemRef = doc(db, `cart-${loggedUser[0].uid}`, `${item.id}`);
      await updateDoc(itemRef, {
        quantity: count - 1,
      })
        .then(() => {
          console.log("quantity changed");
        })
        .catch(() => {
          console.log("failed");
        });
    }
  };

  const deleteItem = async () => {
    await deleteDoc(doc(db, `cart-${loggedUser[0].uid}`, `${item.id}`))
      .then(() => {
        setsuccessMessage("Item Deleted Successfully");
        setOpen(true);
      })
      .catch(() => {
        seterrorMessage("Failed to delete item");
        setOpen(true);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

 

  return (
    <Bottom>
      <Info>
        <Product>
          <ProductDetail>
            <Image src={item.product.image} />
            <Details>
              <ProductName>
                <b>Product :</b> {item.product.title}
              </ProductName>
              <ProductId>
                <b>Brand :</b>
                {item.product.brand}
              </ProductId>
              <ProductId>
                <b>Color :</b> {item.product.color}
              </ProductId>
              <ProductSize>
                <b>Size:</b> {item.product.size}
              </ProductSize>
            </Details>
          </ProductDetail>
          <PriceDetail>
            <ProductAmountContainer>
              <RemoveOutlinedIcon
                onClick={() => {
                  handleDecrement();
                }}
                style={{ cursor: "pointer" }}
              />
              <ProductAmount>{count}</ProductAmount>
              <AddOutlinedIcon
                onClick={() => {
                  handleIncrement();
                }}
                style={{ cursor: "pointer" }}
              />
            </ProductAmountContainer>
            <ProductPrice>
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>Rs. </span>
              {Price}
            </ProductPrice>
          </PriceDetail>
        </Product>
      </Info>
      <DeleteBtn onClick={deleteItem}>
        <Button
          variant="outlined"
          startIcon={<DeleteForeverOutlined />}
          style={{ color: "teal", width: "50%", border: "none" }}
        >
          Remove
        </Button>
      </DeleteBtn>

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
      <Hr />
    </Bottom>
    // Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum a minus in quae sed veritatis hic ipsa excepturi inventore, error sunt provident qui eius! Facere harum sit autem facilis nemo voluptatibus unde animi, mollitia dolor in, voluptatum quibusdam sunt. Non.
  );
}

export default CartDetails;
