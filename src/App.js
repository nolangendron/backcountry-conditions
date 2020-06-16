import React from "react";
import styled from "@emotion/styled";
import { fonts, colors } from "./styles/index";
import LandingPage from "./components/LandingPage";

const AppStyles = styled("div")`
  max-width: 1400px;
  margin: 0 auto;

  h1 {
    font-family: ${fonts.header};
    font-style: normal;
    font-weight: 200;
    font-size: 58px;
    line-height: 70px;
    text-align: center;
    letter-spacing: -0.015em;
    color: ${colors.primary};
  }

  h5 {
    font-family: ${fonts.text};
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.15px;
  }

  h6 {
    font-family: ${fonts.text};
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.15px;
  }
`;
function App() {
  return (
    <AppStyles>
      <LandingPage />
    </AppStyles>
  );
}

export default App;
