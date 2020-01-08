import React from "react";
import { render } from "@testing-library/react";
import NavBar from "./index";

describe("NavBar functionality", () => {
  it("Renders without crashing", () => {
    const component = render(<NavBar />);
  });
});
