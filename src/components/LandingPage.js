import React from 'react';
import styled from "@emotion/styled";
import img from '../images/Thar_Peak.jpg';
import SplitText from './SplitText'


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
  background: 
  linear-gradient(to bottom, rgba(255, 255, 255, .5) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 1) 100%),
  linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0) 100%),

  url(${img}) no-repeat;
}
`

const LandingPage = () => {
  return (
    <Container>
      <div className="title">
        <h1><SplitText copy="BC" role="heading" count={0.5} /></h1>
        <h1><SplitText copy="Backcountry" role="heading" count={.7} /></h1>
        <h1><SplitText copy="Weather" role="heading" count={1.8} /></h1>
      </div>
      <div className="bgImage" />
    </Container >
  )
}

export default LandingPage;