import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebaseConfig";
import FeatureProductList from "./FeatureProductList";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

function FeaturedProduct() {
  const name = "women";
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProduct = () => {
      const productArray = [];
      const path = `Products-${name.toUpperCase()}`;
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

//   console.log(products)

  return (
    <div>
      <Container>
        {products.map((item) => (
          <FeatureProductList item={item} key={item.id} />
        ))}
      </Container>
    </div>
  );
}

export default FeaturedProduct;
