import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { setupServer } from "msw/node";
import { rest } from "msw";

import TodoContainer from "@/containers/TodoContainer/TodoContainer";
import { backendDomain } from "@/helpers/domain";

const taskValue = {
  _id: "6462f91b9ad3dc04af1b07f6",
  title: "First",
  isCompleted: false,
  createdAt: "2023-05-16T03:31:39.831Z",
  updatedAt: "2023-05-16T03:31:39.831Z",
};

const server = setupServer(
  rest.get(`${backendDomain()}/api/v1/tasks`, (req, res, ctx) => {
    return res(ctx.json([taskValue]));
  }),
  rest.post(`${backendDomain()}/api/v1/tasks`, (req, res, ctx) => {
    return res(
      ctx.json({
        _id: "6462f91b9ad3dc04af1b07f7",
        title: "Second",
        isCompleted: false,
        createdAt: "2023-05-16T03:31:39.831Z",
        updatedAt: "2023-05-16T03:31:39.831Z",
      })
    );
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
// afterEach(() => server.resetHandlers());

describe("Render TodoContainer", () => {
  beforeEach(() => {
    render(<TodoContainer />);
  });
  it("should render correct initial elements", async () => {
    const title = screen.getByText(/marvelous v2.0/i);
    expect(title).toBeInTheDocument();

    const addTextbox = screen.getByRole("textbox", { name: /add/i });
    expect(addTextbox).toBeInTheDocument();

    await waitFor(() => {
      const initialTask = screen.getByText(/first/i);
      expect(initialTask).toBeInTheDocument();
    });
  });

  it("should add new task", async () => {
    const addTextbox = screen.getByRole("textbox", { name: /add/i });
    // userEvent.type(addTextbox, "Second");
    fireEvent.input(addTextbox, { target: { value: "Second" } });
    expect(addTextbox).toHaveValue("Second");

    const addBtn = screen.getByRole("button", { name: /add/i });
    fireEvent.click(addBtn);

    await waitFor(() => {
      const newTask = screen.getByText(/second/i);
      expect(newTask).toBeInTheDocument();
    });
  });

  // Could add more test cases below
});
