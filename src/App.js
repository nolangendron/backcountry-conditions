import React, { useState, Fragment } from 'react';
import './App.css';
import styled from "@emotion/styled";
import Main from './components/Main';
import img from './images/Thar_Peak.jpg';
import { Burger } from './components/Burger/Burger';
import Menu from './components/Menu/Menu';
import LandingPage from './components/LandingPage';

const Container = styled("div")`

`
function App() {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <LandingPage />
    </Fragment>
  );
}

export default App;
