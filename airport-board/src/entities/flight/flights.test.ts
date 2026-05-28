import { generateFlights } from "./flights";

describe("generateFlights", () => {
  it("creates routes where every Copenhagen flight touches CPH", () => {
    const response = generateFlights("CPH", {
      count: 50,
      now: new Date(2026, 0, 1, 12, 0, 0),
      seed: "cph-network-test",
    });

    expect(response.flights).toHaveLength(50);
    expect(response.flights).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ direction: "arrival" }),
        expect.objectContaining({ direction: "departure" }),
      ]),
    );

    response.flights.forEach((flight) => {
      expect([flight.originCode, flight.destinationCode]).toContain("CPH");

      if (flight.direction === "arrival") {
        expect(flight.destinationCode).toBe("CPH");
        expect(flight.destination).toContain("(CPH)");
        expect(flight.originCode).not.toBe("CPH");
        expect(flight.origin).not.toContain("(CPH)");
      } else {
        expect(flight.originCode).toBe("CPH");
        expect(flight.origin).toContain("(CPH)");
        expect(flight.destinationCode).not.toBe("CPH");
        expect(flight.destination).not.toContain("(CPH)");
      }
    });
  });

  it("uses the local airline mix for Copenhagen", () => {
    const response = generateFlights("CPH", {
      count: 80,
      directions: ["departure"],
      now: new Date(2026, 0, 1, 12, 0, 0),
      seed: "cph-airline-mix-test",
    });

    const sasFlights = response.flights.filter((flight) => {
      return flight.airline === "SAS";
    });
    const emiratesFlights = response.flights.filter((flight) => {
      return flight.airline === "Emirates";
    });

    expect(sasFlights.length).toBeGreaterThan(emiratesFlights.length);
    expect(sasFlights.length).toBeGreaterThan(20);
  });

  it("can generate departure-only boards for a selected airport", () => {
    const response = generateFlights("OSL", {
      count: 20,
      directions: ["departure"],
      now: new Date(2026, 0, 1, 12, 0, 0),
      seed: "osl-departures-test",
    });

    expect(response.flights).toHaveLength(20);
    expect(response.flights.every((flight) => flight.direction === "departure")).toBe(
      true,
    );
    expect(response.flights.every((flight) => flight.originCode === "OSL")).toBe(
      true,
    );
    expect(response.flights.every((flight) => flight.destinationCode !== "OSL")).toBe(
      true,
    );
  });
});
