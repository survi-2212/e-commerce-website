import React from 'react'
import Announcement from '../components/Announcement'
import Catagories from '../components/Catagories'
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
            <NewsLetter/>
            <Footer/>
        </>
    )
}

export default Home