import React from 'react'
import Announcement from '../components/Announcement'
import Catagories from '../components/Catagories'
import FeaturedProduct from '../components/FeaturedProduct'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import NewsLetter from '../components/NewsLetter'
import Slider from '../components/Slider'


function Home() {
    
    return (
        <>
            <Announcement/>
            <Navbar/>
            <Slider/>
            <Catagories/>
            <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",marginTop:"10px"}}>
            <h1 style={{fontSize:"50px" , margin:"auto"}}>Featured Product</h1>
            </div>
            <FeaturedProduct/>
            <NewsLetter/>
            <Footer/>
        </>
    )
}

export default Home