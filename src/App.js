import { HashRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";

import Cart from "./pages/Cart";

import Register from "./pages/Register";

import Login from "./pages/Login";

import CategoryItem from "./pages/CategoryItem";

import SinglePage from "./pages/SinglePage";
import ErrorPage from "./pages/Error/ErrorPage";
import { UserContextProvider } from "./UserAuthContext";
import "./App.css"
import UserProfile from "./pages/UserProfile";
import AddProduct from "./pages/AddProduct";
import Wishlist from "./pages/Wishlist";


function App() {
  return (
    <Router>
      <>
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categoryitem/:category" element={<CategoryItem />} />
            <Route path="/singlepage/:category/:id" element={<SinglePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<UserProfile/>}/>
            <Route path="/addproduct" element={<AddProduct/>}/>
            <Route path="/wishlist" element={<Wishlist/>}/>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </UserContextProvider>
      </>
    </Router>
  );
}

export default App;
