import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../../page";

describe("Airport Departure Board", () => {
  beforeEach(() => {
    render(<Home />);
  });

  it("renders AirportSelector with country select", () => {
    const countrySelect = screen.getByLabelText(/Select Country/i);
    expect(countrySelect).toBeInTheDocument();
    expect(countrySelect).toHaveDisplayValue("-- Choose --");
  });

  it("renders airport select after selecting country", () => {
    const countrySelect = screen.getByLabelText(/Select Country/i);
    fireEvent.change(countrySelect, { target: { value: "Denmark" } });

    const airportSelect = screen.getByLabelText(/Select Airport/i);
    expect(airportSelect).toBeInTheDocument();
    expect(airportSelect).toHaveDisplayValue("-- Choose --");
  });

  it("renders Filters after selecting airport", () => {
    fireEvent.change(screen.getByLabelText(/Select Country/i), {
      target: { value: "Denmark" },
    });
    fireEvent.change(screen.getByLabelText(/Select Airport/i), {
      target: { value: "Copenhagen" },
    });

    const showDelayedCheckbox = screen.getByLabelText(/Show Delayed/i);
    const showBoardingCheckbox = screen.getByLabelText(
      /Show Boarding\/Final Call/i,
    );

    expect(showDelayedCheckbox).toBeInTheDocument();
    expect(showBoardingCheckbox).toBeInTheDocument();
    expect(showDelayedCheckbox).toBeChecked();
    expect(showBoardingCheckbox).toBeChecked();
  });

  it("renders FlightTable after selecting airport", () => {
    fireEvent.change(screen.getByLabelText(/Select Country/i), {
      target: { value: "Denmark" },
    });
    fireEvent.change(screen.getByLabelText(/Select Airport/i), {
      target: { value: "Copenhagen" },
    });

    const table = screen.getByTestId("flights-table");
    expect(table).toBeInTheDocument();
    expect(table.querySelectorAll("tbody tr").length).toBeGreaterThan(0);
  });

  it("paginates flights correctly", () => {
    fireEvent.change(screen.getByLabelText(/Select Country/i), {
      target: { value: "Denmark" },
    });
    fireEvent.change(screen.getByLabelText(/Select Airport/i), {
      target: { value: "Copenhagen" },
    });

    const nextButton = screen.getByRole("button", { name: /Next/i });
    const prevButton = screen.getByRole("button", { name: /Previous/i });

    expect(prevButton).toBeDisabled();

    const table = screen.getByTestId("flights-table");
    const rowCount = table.querySelectorAll("tbody tr").length;
    const flightsPerPage = 5;
    const totalPages = Math.ceil(rowCount / flightsPerPage);

    if (totalPages > 1) {
      expect(nextButton).not.toBeDisabled();
      fireEvent.click(nextButton);
      expect(prevButton).not.toBeDisabled();
    } else {
      expect(nextButton).toBeDisabled();
    }
  });
});
