import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { graphql } from "msw";
import { setupServer } from "msw/node";
import "whatwg-fetch";

import Intro from "../../app/Intro/Intro";
jest.mock("next/router", () => ({ push: jest.fn() }));

const renderView = () => {
  render(<Intro />);
};

test("render", async () => {
  renderView();
});

test("Find intro description", async () => {
  renderView();
  // Use findByText to wait for specific text to appear on the screen
  const sonaText = await screen.findByText("SONA");
  const mavenText = await screen.findByText("MAVEN OF THE STRINGS");
  // Assert that the text elements are found
  expect(sonaText).toBeInTheDocument();
  expect(mavenText).toBeInTheDocument();
});
