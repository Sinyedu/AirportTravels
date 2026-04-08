import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../../page";
import * as flightsData from "../data/flights";
import { mockFlights } from "../mocks/mockFlights";
import { WeatherCondition } from "../data/weather";

describe("Airport Departure Board", () => {
  beforeEach(() => {
    // Mock flight generation to always return the same flights + weather
    jest
      .spyOn(flightsData, "generateFlights")
      .mockImplementation((airportCode: string) => ({
        airport: airportCode,
        flights: mockFlights,
        weather: "Sunny" as WeatherCondition,
      }));

    render(<Home />);
  });

  it("renders AirportSelector with country select", () => {
    const countrySelect = screen.getByLabelText(/Select Country/i);
    expect(countrySelect).toBeInTheDocument();
    expect(countrySelect).toHaveDisplayValue("-- Choose --");
  });

  it("renders airport select after selecting country", () => {
    fireEvent.change(screen.getByLabelText(/Select Country/i), {
      target: { value: "Denmark" },
    });

    const airportSelect = screen.getByLabelText(/Select Airport/i);
    expect(airportSelect).toBeInTheDocument();
    expect(airportSelect).toHaveDisplayValue("-- Choose --");
  });

  it("renders Filters after selecting airport", async () => {
    fireEvent.change(screen.getByLabelText(/Select Country/i), {
      target: { value: "Denmark" },
    });
    fireEvent.change(screen.getByLabelText(/Select Airport/i), {
      target: { value: "Copenhagen" },
    });

    // Wait for Filters checkboxes to appear
    const showDelayedCheckbox = await screen.findByLabelText(/Show Delayed/i);
    const showBoardingCheckbox = await screen.findByLabelText(
      /Show Boarding\/Final Call/i,
    );

    expect(showDelayedCheckbox).toBeInTheDocument();
    expect(showBoardingCheckbox).toBeInTheDocument();

    // Default checkboxes state
    expect(showDelayedCheckbox).toBeChecked();
    expect(showBoardingCheckbox).toBeChecked();
  });

  it("renders FlightTable after selecting airport", async () => {
    fireEvent.change(screen.getByLabelText(/Select Country/i), {
      target: { value: "Denmark" },
    });
    fireEvent.change(screen.getByLabelText(/Select Airport/i), {
      target: { value: "Copenhagen" },
    });

    const table = await screen.findByTestId("flights-table");
    expect(table).toBeInTheDocument();

    const rows = table.querySelectorAll("tbody tr");
    expect(rows.length).toBeGreaterThan(0);
  });

  it("paginates flights correctly", async () => {
    fireEvent.change(screen.getByLabelText(/Select Country/i), {
      target: { value: "Denmark" },
    });
    fireEvent.change(screen.getByLabelText(/Select Airport/i), {
      target: { value: "Copenhagen" },
    });

    const table = await screen.findByTestId("flights-table");
    const rows = table.querySelectorAll("tbody tr");
    const rowCount = rows.length;

    const nextButton = screen.getByRole("button", { name: /Next/i });
    const prevButton = screen.getByRole("button", { name: /Previous/i });

    // Prev should be disabled on first page
    expect(prevButton).toBeDisabled();

    const flightsPerPage = 5;
    const totalPages = Math.ceil(rowCount / flightsPerPage);

    if (totalPages > 1) {
      expect(nextButton).not.toBeDisabled();

      fireEvent.click(nextButton);

      await waitFor(() => {
        expect(prevButton).not.toBeDisabled();
      });
    } else {
      expect(nextButton).toBeDisabled();
    }
  });
});
