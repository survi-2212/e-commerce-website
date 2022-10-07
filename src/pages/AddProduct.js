import { Alert, Snackbar } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { db, Storage } from "../firebaseConfig";
import { mobile } from "../Responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  object-fit: contain;
  overflow-x: hidden;

  
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9));
  border: 1px solid white;
  
  ${mobile({ width: "85%"})}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  color: white;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  border: none;
  outline: none;
`;

const Select = styled.select`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  color: gray;
  border: none;
  outline: none;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  cursor: pointer;
  margin-top: 10px;
  letter-spacing: 2px;
  margin-right: 10px;
  color: white;
  ${mobile({ width: "100%" })}

  &:hover {
    transform: scale(1.01);
    transition: 0.8s ease-in;
  }
`;

function AddProduct() {
  const [title, setTitle] = useState(" ");
  const [category, setCategory] = useState(" ");
  const [Color, setColor] = useState("");
  const [size, setSize] = useState(" ");
  const [price, setPrice] = useState(" ");
  const [brand, setBrand] = useState(" ");
  const [desc, setDesc] = useState(" ");
  const [imageFile, setImageFile] = useState(" ");
  const [imageError, setimageError] = useState("");
  const [errorMsg, setErrorMsg] = useState(" ");
  const [successMsg, setSuccessMsg] = useState(" ");
  const [open, setOpen] = useState(false);

  const categoryItem = ["Women", "Men", "Jwellery"];
  const brandNameWomen = ["Max", "Allen solly", "Mark & Spencer","FABALLEY","Mango","Dressberry","PRADA",];
  const brandNameMen = ["Max", "Allen solly", "Levi's","Pepe Jeans","Mango","US polo","Tommy Hilfiger",];
  const brandNameJwellery = ["Tanishq", "Mejuri", "Orra ","Orra ","Almasika","Swarovski"];
  const color =["Black","Beige","Navy Blue","Maroon","Grey","Off White","Brown","White","Denim","Surplus","Pale Lilac","Gold","Silver"]

  const sizeItem = ["XS", "S", "M", "L", "XL","One-Size"];

  const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];

  const name = "all";
  const handleImage = (e) => {
    let selectedImage = e.target.files[0];
    // console.log(selectedImage)
    if (selectedImage) {
      if (selectedImage && types.includes(selectedImage.type)) {
        setImageFile(selectedImage);
        setimageError(" ");
      } else {
        setImageFile(null);
        setimageError("Please select the valid file");
        setSuccessMsg("");
        setErrorMsg("");
        setOpen(true);
      }
    } else {
      setimageError("Please select file");
      setOpen(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storageRef = ref(
      Storage,
      `product-Images${category.toUpperCase()}/${Date.now()}`
    );
    // console.log(storageRef._location.path);

    uploadBytes(storageRef, imageFile).then(() => {
      getDownloadURL(storageRef).then((url) => {
        addDoc(collection(db, `Products-${category.toUpperCase()}`), {
          title: title,
          brand:brand,
          color:Color,
          category: category,
          price: price,
          size: size,
          desc: desc,
          image: url,
        })
          .then(() => {
            setSuccessMsg("Data stored successfully");
            setOpen(true);
            setTitle("");
            setCategory("");
            setSize("");
            setPrice("");
            setColor("");
            setBrand("");
            setDesc("");
            setImageFile("");
            setErrorMsg("");
          })
          .catch((err) => {
            setErrorMsg("Failed to stor data");
            setSuccessMsg(" ");
            console.log(err.message);
            setOpen(true);
          });
      });
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Navbar />

      <Container>
        <Wrapper>
          <Title>Add Products</Title>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
            />
            

            <Select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              required
            >
              <option>Select Category</option>
              {categoryItem.map((item, index) => (
                <option value={item || ""} key={index}>
                  {item}
                </option>
              ))}
            </Select>

            <Select
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value);
              }}
              required
            >
              <option>Select Brand</option>
              {category === "Women" && <>
              {brandNameWomen.map((item, index) => (
                <option value={item || ""} key={index}>
                  {item}
                </option>
              ))}
              </>}
              {category === "Men" && <>
              {brandNameMen.map((item, index) => (
                <option value={item || ""} key={index}>
                  {item}
                </option>
              ))}
              </>}
              {category === "Jwellery" && <>
              {brandNameJwellery.map((item, index) => (
                <option value={item || ""} key={index}>
                  {item}
                </option>
              ))}
              </>}
              
            </Select>


            <Select
              value={Color}
              onChange={(e) => {
                setColor(e.target.value);
              }}
              required
            >
              <option>Select Color</option>
              {color.map((item, index) => (
                <option value={item || ""} key={index}>
                  {item}
                </option>
              ))}
            </Select>

            <Select
              value={size}
              onChange={(e) => {
                setSize(e.target.value);
              }}
              required
            >
              <option>Select Size</option>
              {sizeItem.map((item, index) => (
                <option value={item || ""} key={index}>
                  {item}
                </option>
              ))}
            </Select>

            <Input
              type="text"
              placeholder="Price"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              required
            />

            <Input
              type="textarea"
              placeholder="Description"
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              required
            />

            <Input
              type="file"
              style={{ backgroundColor: "white", color: "grey" }}
              onChange={handleImage}
              required
            />
            {imageError && (
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
                    {imageError}
                  </Alert>
                </Snackbar>
              </>
            )}

            <Button type="submit">Add Product</Button>
            {errorMsg && (
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
                    {errorMsg}
                  </Alert>
                </Snackbar>
              </>
            )}
            {successMsg && (
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
                    {successMsg}
                  </Alert>
                </Snackbar>
              </>
            )}
          </Form>
        </Wrapper>
        {/* Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum
        magnam delectus vitae rerum, similique odit harum facilis porro sit
        autem? Optio, aliquam. Tenetur quia tempore hic mollitia eveniet. Enim,
        consequatur. */}
      </Container>
    </>
  );
}

export default AddProduct;
