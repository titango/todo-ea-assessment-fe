import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Button from "@/components/main/Button/Button";

const onClick = jest.fn();
describe("Button test", () => {
  it("should show button with text and action", () => {
    render(
      <Button onClick={onClick} ariaLabel="test">
        Test
      </Button>
    );
    const btn = screen.getByRole("button", { name: /test/i });
    expect(btn).toBeInTheDocument();

    fireEvent.click(btn);
    expect(onClick).toBeCalled();
  });
});
