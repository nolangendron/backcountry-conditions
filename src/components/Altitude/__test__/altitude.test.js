import React from "react";
import ReactDOM from "react-dom";
import Altitude from "../Altitude.js";

import { render, cleanup } from "@testing-library/react";

import renderer from "react-test-renderer";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Altitude />, div);
});

it("renders Altitude correctly", () => {
  render(<Altitude elevation="undefined" />);
});

it("matches snapshot", () => {
  const tree = renderer
    .create(<Altitude elevation="1200" elevationLower="false" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
