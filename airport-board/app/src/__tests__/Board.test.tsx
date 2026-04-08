import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../../page";
import { airports } from "../data/airports";

describe("Airport Departure Board", () => {
  it("renders country select", () => {
    render(<Home />);
    const countrySelect = screen.getByLabelText(/Select Country/i);
    expect(countrySelect).toBeInTheDocument();
    expect(countrySelect).toHaveDisplayValue("-- Choose --");
  });

  it("renders airport select after selecting country", () => {
    render(<Home />);
    const countrySelect = screen.getByLabelText(/Select Country/i);
    fireEvent.change(countrySelect, { target: { value: "Denmark" } });

    const airportSelect = screen.getByLabelText(/Select Airport/i);
    expect(airportSelect).toBeInTheDocument();
    expect(airportSelect).toHaveDisplayValue("-- Choose --");
  });

  it("displays flights after selecting airport", () => {
    render(<Home />);
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
    render(<Home />);
    fireEvent.change(screen.getByLabelText(/Select Country/i), {
      target: { value: "Denmark" },
    });
    fireEvent.change(screen.getByLabelText(/Select Airport/i), {
      target: { value: "Copenhagen" },
    });

    const nextButton = screen.getByText(/Next/i);
    const prevButton = screen.getByText(/Previous/i);

    expect(prevButton).toBeDisabled();
    if (
      screen.getByTestId("flights-table").querySelectorAll("tbody tr").length >
      5
    ) {
      expect(nextButton).not.toBeDisabled();
    }
  });
});

describe("Airports data", () => {
  it("has countries and cities defined", () => {
    expect(airports.length).toBeGreaterThan(0);
    airports.forEach((c) => {
      expect(c.country).toBeDefined();
      expect(Array.isArray(c.cities)).toBe(true);
      c.cities.forEach((city) => {
        expect(city.name).toBeDefined();
        expect(city.code).toBeDefined();
      });
    });
  });
});
