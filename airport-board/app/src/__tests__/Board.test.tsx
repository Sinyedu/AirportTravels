import { render, screen, fireEvent } from "@testing-library/react";
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
});
