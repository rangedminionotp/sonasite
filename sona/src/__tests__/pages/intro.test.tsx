import { expect, test, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import Intro from "../../app/Intro/Intro";
import React from "react";
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
  //@ts-expect-error
  expect(sonaText).toBeInTheDocument();
  //@ts-expect-error
  expect(mavenText).toBeInTheDocument();
});
