import { airports } from "@/data/airports";
import { getAirportOperationsSnapshot } from "./airportOperations";

describe("getAirportOperationsSnapshot", () => {
  it("only returns active flights that touch the selected airport", () => {
    airports.forEach((airport) => {
      const snapshot = getAirportOperationsSnapshot(airport.code);

      expect(snapshot).not.toBeNull();
      expect(snapshot?.flights.length).toBeGreaterThan(0);
      expect(
        snapshot?.flights.every((flight) => {
          return (
            flight.originCode === airport.code ||
            flight.destinationCode === airport.code
          );
        }),
      ).toBe(true);
    });
  });

  it("classifies Aalborg arrivals and departures by Aalborg route codes", () => {
    const snapshot = getAirportOperationsSnapshot("AAL");

    expect(snapshot).not.toBeNull();
    expect(snapshot?.arrivals.length).toBeGreaterThan(0);
    expect(snapshot?.departures.length).toBeGreaterThan(0);
    expect(
      snapshot?.arrivals.every((flight) => {
        return flight.destinationCode === "AAL" && flight.originCode !== "AAL";
      }),
    ).toBe(true);
    expect(
      snapshot?.departures.every((flight) => {
        return flight.originCode === "AAL" && flight.destinationCode !== "AAL";
      }),
    ).toBe(true);
  });
});
