import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

describe("App Component", () => {
  test("renders without errors", () => {
    render(
      <Router>
        <App />
      </Router>
    );

    expect(screen.getByTestId("app-component")).toBeInTheDocument();
  });
});