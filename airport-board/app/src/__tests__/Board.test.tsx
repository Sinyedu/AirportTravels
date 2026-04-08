import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../../page";
import * as flightsData from "../data/flights";
import { WeatherCondition } from "../data/weather";

// Mock flight data so the test can work correctly, since project is different
const mockFlights = [
  {
    id: "1",
    flight: "AB123",
    destination: "London",
    time: "12:00",
    gate: "A1",
    status: "On Time",
  },
  {
    id: "2",
    flight: "CD456",
    destination: "Berlin",
    time: "14:30",
    gate: "B2",
    status: "Delayed",
  },
];
jest
  .spyOn(flightsData, "generateFlights")
  .mockImplementation((airportCode: string) => ({
    airport: airportCode,
    flights: mockFlights,
    weather: "Sunny" as WeatherCondition,
  }));

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
    fireEvent.change(screen.getByLabelText(/Select Country/i), {
      target: { value: "Denmark" },
    });

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

  it("renders FlightTable after selecting airport", async () => {
    fireEvent.change(screen.getByLabelText(/Select Country/i), {
      target: { value: "Denmark" },
    });
    fireEvent.change(screen.getByLabelText(/Select Airport/i), {
      target: { value: "Copenhagen" },
    });

    // Wait for flights to appear
    const table = await waitFor(() => screen.getByTestId("flights-table"));
    expect(table).toBeInTheDocument();
    expect(table.querySelectorAll("tbody tr").length).toBeGreaterThan(0);
  });

  it("paginates flights correctly", async () => {
    fireEvent.change(screen.getByLabelText(/Select Country/i), {
      target: { value: "Denmark" },
    });
    fireEvent.change(screen.getByLabelText(/Select Airport/i), {
      target: { value: "Copenhagen" },
    });

    const table = await waitFor(() => screen.getByTestId("flights-table"));

    const nextButton = screen.getByRole("button", { name: /Next/i });
    const prevButton = screen.getByRole("button", { name: /Previous/i });

    expect(prevButton).toBeDisabled();

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
