import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { graphql } from "msw";
import { setupServer } from "msw/node";
import "whatwg-fetch";

import Intro from "../../app/Intro/Intro";
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock("next/router", () => ({ push: jest.fn() }));

const renderView = () => {
  render(<Intro />);
};

test("render", async () => {
  renderView();
});
