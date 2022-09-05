import { Box, Modal, Typography } from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { db } from "../firebaseConfig";
import { mobile } from "../Responsive";
import { useUserAuth } from "../UserAuthContext";

const Container = styled.div`
  padding: 10px;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  margin: 10px 10px;
`;

// const Summary = styled.div`
//   flex: 1;
//   padding: 20px;
//   height: 50vh;
//   align-items: center;
//   ${mobile({ flexDirection: "column" })}
// `;
// const SummaryTitle = styled.h1`
//   font-weight: 200;
// `;

// const SummaryItem = styled.div`
//   margin: 30px 0px;
//   display: flex;
//   justify-content: space-between;
//   font-weight: ${(props) => props.type === "total" && "500"};
//   font-size: ${(props) => props.type === "total" && "24px"};
// `;

// const SummaryItemText = styled.span``;

// const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 20%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;

  /* margin-left: 30%; */

  ${mobile({ width: "100%" })}
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height:200,
  bgcolor: "#EFF3EE",
  border: "1px solid #EFF3EE",
  p: 4,
};

function Checkout(item) {
  // console.log(item.item.id);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { loggedUser } = useUserAuth();

  const deleteItem = async () => {
    await deleteDoc(doc(db,`cart-${loggedUser[0].uid}`,`${item.item.id}`))
      .then(() => {
        console.log("success")
      })
      .catch((error) => {
        console.log(error.message)
      });
  };
  return (
    <Container>
      {/* <Summary>
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
        </Summary> */}

      <Button onClick={handleOpen}>CHECKOUT NOW</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6">
            Yoooo Hooooo....
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           Order placed successfully.....
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} onClick={deleteItem}>
           <Link to="/" style={{color:"black"}}>Continue Shopping</Link>
          </Typography>
        </Box>
      </Modal>
    </Container>
  );
}

export default Checkout;
