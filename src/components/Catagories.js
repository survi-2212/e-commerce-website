import React from 'react'
import styled from 'styled-components'
import {categories} from "../data"
import CatagoriesItem from './CatagoriesItem';
import { mobile } from "../Responsive";


const Container=styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    ${mobile({ padding: "0px", flexDirection:"column" })}
`;

function Catagories() {
  return (
    <Container>
    {categories.map((item)=>(
        <CatagoriesItem item={item} key={item.id}/>
    ))}
    </Container>
  )
}

export default Catagories