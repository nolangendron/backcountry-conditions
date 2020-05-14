import React, { useState } from 'react';
import styled from "@emotion/styled";
import img from '../images/Thar_Peak.jpg';
import SplitText from './SplitText'
import Select from 'react-select';

const Container = styled('div')`
display: grid;
margin: 0;
padding: 0;
grid-template-columns: repeat(12, 1fr);
height: 100vh;

.title {
  grid-column: 2 / span 4;
  margin: auto;
  font-size: 3em;
}   

.bgImage {
  grid-column: 7 / span 6;
  height: 100vh;
  background: 
  linear-gradient(to bottom, rgba(255, 255, 255, .5) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 1) 100%),
  linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0) 100%),
  url(${img}) no-repeat;
}

.select {
  width: 300px;
  margin-top: 60vh;
  margin-left: auto;
  margin-right: auto;
}
`
const options = [
  { value: 'Coquihalla', label: 'Coquihalla' },
  { value: 'Duffey', label: 'Duffey' },
  { value: 'Manning Park', label: 'Manning Park' },
];

const LandingPage = () => {
  const [state, setState] = useState({
    selectedOption: null,
  })

  const handleChange = selectedOption => {
    setState({ selectedOption });
  }

  const { selectedOption } = state;
  return (
    <Container>
      <div className="title">
        <h1><SplitText copy="BC" role="heading" count={0.5} /></h1>
        <h1><SplitText copy="Backcountry" role="heading" count={.7} /></h1>
        <h1><SplitText copy="Weather" role="heading" count={1.8} /></h1>
      </div>

      <div className="bgImage">
        <div className="select">
          <Select
            value={selectedOption}
            onChange={handleChange}
            options={options}
          />
        </div>
      </div>
    </Container >
  )
}

export default LandingPage;