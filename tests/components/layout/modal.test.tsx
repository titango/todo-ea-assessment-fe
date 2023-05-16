import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ConfirmationModal from "@/components/layout/modal/ConfirmationModal";

const isShowModal = true;
const onDeleteConfirm = jest.fn();
const onDeleteCancel = jest.fn();
describe("Confirmation Modal", () => {
  beforeEach(() => {
    // Render the Counter component
    render(
      <ConfirmationModal
        isOpen={isShowModal}
        onConfirm={onDeleteConfirm}
        onCancel={onDeleteCancel}
      >
        Confirmation Text
      </ConfirmationModal>
    );
  });

  it("should show elements", () => {
    const text = screen.getByText(/confirmation text/i); // Access text
    expect(text).toBeInTheDocument();

    const cancelBtn = screen.getByRole("button", { name: /cancel/i }); // access cancel btn
    expect(cancelBtn).toBeInTheDocument();
    const confirmBtn = screen.getByRole("button", { name: /confirm/i }); // access confirm btn
    expect(confirmBtn).toBeInTheDocument();
  });

  it("should allow cancel button clickable", () => {
    const cancelBtn = screen.getByRole("button", { name: /cancel/i }); // access cancel btn
    expect(cancelBtn).toBeInTheDocument();

    fireEvent.click(cancelBtn);
    expect(onDeleteCancel).toBeCalled();
  });

  it("should allow confirm button clickable", () => {
    const confirmBtn = screen.getByRole("button", { name: /confirm/i }); // access confirm btn
    expect(confirmBtn).toBeInTheDocument();

    fireEvent.click(confirmBtn);
    expect(onDeleteConfirm).toBeCalled();
  });
});
