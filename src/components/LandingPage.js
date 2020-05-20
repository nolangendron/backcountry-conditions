import React, { useState } from 'react';
import styled from "@emotion/styled";
import imgLandingPage from "../images/powder2.png"
import coquihalla from '../images/Thar_Peak.jpg';
import duffey from '../images/duffey.jpg';
import manning from '../images/manning.jpg'
import SplitText from './SplitText'
import Select from 'react-select';

const Container = styled('div')`
display: grid;
margin: 0;
padding: 0;
grid-template-columns: repeat(12, 1fr);
height: 100vh;

.left-container {
  grid-column: 2 / span 3;
}
.title {
  margin-top: 80px;
  font-size: 2em;
}   

.title h1 {
  margin: 0;
}

.bgImage {
  position: relative;
  z-index: 1;
  grid-column: 5 / span 8;
  background: 
    /* linear-gradient(to bottom, 
      rgba(255, 255, 255, 0.5) 0%, 
      rgba(255, 255, 255, 1) 50%, 
      rgba(255, 255, 255, 1) 100%), */
    linear-gradient(to right, 
      rgba(255, 255, 255, 1) 0%, 
      rgba(255, 255, 255, .3) 50%, 
      rgba(255, 255, 255, 0) 100%),
    url(${imgLandingPage}) no-repeat;
  background-size: cover;
}

.bgImage::before {
  content: "";
  position: absolute;
  grid-column: 5 / span 8;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(to bottom, 
      rgba(255, 255, 255, 0) 0%, 
      rgba(255, 255, 255, .5) 50%, 
      rgba(255, 255, 255, .5) 100%),
    linear-gradient(to right, 
      rgba(255, 255, 255, 1) 0%, 
      rgba(255, 255, 255, .3) 50%, 
      rgba(255, 255, 255, 0) 100%),
      url(${props => props.selected && props.selected}) no-repeat;  
  background-size: cover;
  opacity: ${props => props.selected ? 1 : 0};
  transition: opacity 2s;
  z-index: -1;
}

.select {
  margin-top: 100px;
  width: 400px;
}
`
const options = [
  { value: 'coquihalla', label: 'Coquihalla', image: coquihalla },
  { value: 'duffey', label: 'Duffey', image: duffey },
  { value: 'manningPark', label: 'Manning Park', image: manning }
];

const LandingPage = () => {
  const [state, setState] = useState({
    selectedOption: null,
  })

  console.log(state.selectedOption && state.selectedOption.image)
  const handleChange = selectedOption => {
    setState({ selectedOption });
  }

  const { selectedOption } = state;
  return (
    <Container selected={state.selectedOption && state.selectedOption.image}>
      <div className="left-container">
        <div className="title">
          <h1><SplitText copy="BC" role="heading" count={0.5} /></h1>
          <h1><SplitText copy="Backcountry" role="heading" count={.7} /></h1>
          <h1><SplitText copy="Weather" role="heading" count={1.6} /></h1>
        </div>
        <div className="select">
          <Select
            value={selectedOption}
            onChange={handleChange}
            options={options}
          />
        </div>
      </div>
      <div className="bgImage">
      </div>
    </Container >
  )
}

export default LandingPage;