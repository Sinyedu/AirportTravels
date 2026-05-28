import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../../../../app/page";

const push = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push
  })
}));

describe("AirportOps homepage", () => {
  beforeEach(() => {
    push.mockClear();
    render(<Home />);
  });

  it("introduces the operations dashboard product", () => {
    expect(
      screen.getByRole("heading", {
        name: /airport operations monitoring for busy airfields/i
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/operational modules/i)).toBeInTheDocument();
  });

  it("opens a selected airport dashboard", () => {
    fireEvent.change(screen.getByLabelText(/Select airport/i), {
      target: { value: "Copenhagen (CPH)" }
    });
    fireEvent.click(screen.getByRole("button", { name: /open dashboard/i }));

    expect(push).toHaveBeenCalledWith("/airports/cph");
  });
});
