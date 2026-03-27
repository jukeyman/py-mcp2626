import { describe, expect, it } from "vitest";
import { starterCapabilities } from "@py-type/shared-schemas";

describe("starterCapabilities", () => {
  it("includes tools support", () => {
    expect(starterCapabilities.primitives).toContain("tools");
  });

  it("includes both languages", () => {
    expect(starterCapabilities.languages).toEqual(["typescript", "python"]);
  });
});
