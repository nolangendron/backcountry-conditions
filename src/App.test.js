import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { render, cleanup } from "@testing-library/react";

import renderer from "react-test-renderer";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

it("matched snapshot", () => {
  const component = renderer.create(<App />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
