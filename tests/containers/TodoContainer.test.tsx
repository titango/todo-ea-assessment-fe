import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import { setupServer } from "msw/node";
import { rest } from "msw";

import TodoContainer from "@/containers/TodoContainer/TodoContainer";
import { backendDomain } from "@/helpers/domain";

const server = setupServer(
  // rest.get(`http://localhost:8000/api/v1/tasks`, (req, res, ctx) => {
  rest.get(`${backendDomain()}/api/v1/tasks`, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          _id: "6462f91b9ad3dc04af1b07f6",
          title: "First",
          isCompleted: true,
          createdAt: "2023-05-16T03:31:39.831Z",
          updatedAt: "2023-05-16T03:31:39.831Z",
        },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
// afterEach(() => server.resetHandlers());

describe("Render TodoContainer", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    render(<TodoContainer />);
  });
  it("should render correct initial elements", async () => {
    const title = screen.getByText(/marvelous v2.0/i);
    expect(title).toBeInTheDocument();

    await waitFor(() => {
      const initialTask = screen.getByText(/first/i);
      expect(initialTask).toBeInTheDocument();
    });

    // const subTitle = screen.getByText(/Enter IPv4 Address\(es\)/i);
    // expect(subTitle).toBeInTheDocument();
    // const input = screen.getAllByRole("spinbutton");
    // expect(input[0]).toHaveValue(0);
    // expect(input[1]).toHaveValue(0);
    // expect(input[2]).toHaveValue(0);
    // expect(input[3]).toHaveValue(0);
    // const btnAdd = screen.getByRole("button", { name: /add/i });
    // expect(btnAdd).toBeInTheDocument();
    // const btnLookup = screen.getByRole("button", { name: /lookup/i });
    // expect(btnLookup).toBeInTheDocument();
    // expect(screen.queryByText("Result(s)")).not.toBeInTheDocument();
  });

  // it("should change values", () => {
  //   const input = screen.getAllByRole("spinbutton");
  //   fireEvent.change(input[0], { target: { value: 65 } });
  //   fireEvent.change(input[1], { target: { value: 15 } });
  //   fireEvent.change(input[2], { target: { value: 30 } });
  //   fireEvent.change(input[3], { target: { value: 155 } });
  //   expect(input[0]).toHaveValue(65);
  //   expect(input[1]).toHaveValue(15);
  //   expect(input[2]).toHaveValue(30);
  //   expect(input[3]).toHaveValue(155);
  // });

  // it("should lookup and show results", async () => {
  //   const input = screen.getAllByRole("spinbutton");
  //   fireEvent.change(input[0], { target: { value: 65 } });
  //   fireEvent.change(input[1], { target: { value: 15 } });
  //   fireEvent.change(input[2], { target: { value: 30 } });
  //   fireEvent.change(input[3], { target: { value: 155 } });
  //   const btnLookup = screen.getByRole("button", { name: /lookup/i });
  //   fireEvent.click(btnLookup);
  //   await waitFor(() => screen.queryByText(/result\(s\)/i));
  // });
});
