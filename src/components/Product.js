import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductList from "./ProductList";
import { mobile } from "../Responsive";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { LinearProgress } from "@mui/material";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  flex-wrap: wrap;
  /* width: 100vw; */
  /* ${mobile({ padding: "0", width: "100vw" })} */
`;

function Product({ cat }) {
  // console.log(cat);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProduct = () => {
      const productArray = [];
      const path = `Products-${cat.toUpperCase()}`;
      // console.log(path);
      getDocs(collection(db, path))
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            productArray.push({ ...doc.data(), id: doc.id });
          });
          setProducts(productArray);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    getProduct();
  }, []);
  // console.log(products)
  return (
    <Container>
      {products.map((item) => (
        <>
        {products ? <ProductList item={item} key={item.id} /> : <LinearProgress color="success" />}
        

        </>
      ))}
    </Container>
  );
}

export default Product;
