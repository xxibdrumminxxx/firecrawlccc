import { scrapeOptions } from "../../../controllers/v2/types";

describe("extractTransform change tracking adjustments", () => {
  it("extends timeout and waitFor when changeTracking format objects are provided", () => {
    const result = scrapeOptions.parse({
      formats: [{ type: "markdown" }, { type: "changeTracking" }],
      timeout: 30000,
    });

    expect(result.timeout).toBe(60000);
    expect(result.waitFor).toBe(5000);
  });

  it("extends defaults when changeTracking is supplied as a string format", () => {
    const result = scrapeOptions.parse({
      formats: ["markdown", "changeTracking"],
      timeout: 30000,
      waitFor: 1000,
    });

    expect(result.timeout).toBe(60000);
    expect(result.waitFor).toBe(5000);
  });

  it("does not override waitFor values that already meet the requirement", () => {
    const result = scrapeOptions.parse({
      formats: [{ type: "markdown" }, { type: "changeTracking" }],
      timeout: 60000,
      waitFor: 7000,
    });

    expect(result.timeout).toBe(60000);
    expect(result.waitFor).toBe(7000);
  });
});
