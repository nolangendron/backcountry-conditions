import React, { useState, Fragment } from "react";
import "./App.css";
import styled from "@emotion/styled";
import LandingPage from "./components/LandingPage";

const Container = styled("div")``;
function App() {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <LandingPage />
    </Fragment>
  );
}

export default App;
