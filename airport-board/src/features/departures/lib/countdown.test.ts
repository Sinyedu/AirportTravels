import { getCountdown } from "./countdown";

describe("getCountdown", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2026, 0, 1, 10, 0, 0));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("returns the remaining minutes for a future departure today", () => {
    expect(getCountdown("10:45")).toBe("45 min");
  });

  it("returns departed for a departure time earlier today", () => {
    expect(getCountdown("09:59")).toBe("Departed");
  });

  it("returns zero minutes for a departure at the current minute", () => {
    expect(getCountdown("10:00")).toBe("0 min");
  });
});
