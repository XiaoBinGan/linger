import { describe, expect, it } from "vitest";

import { updateAccountProfileSchema } from "./personal-profile.js";

const input = updateAccountProfileSchema.input;

describe("the Account profile schema", () => {
  it("bounds a field in the bytes TeamHub counts", () => {
    // 40 Han characters are 120 bytes and fit; 41 are 123 and do not.
    expect(input.parse({ name: "\u6c49".repeat(40) }).name).toBe(
      "\u6c49".repeat(40),
    );
    expect(() => input.parse({ name: "\u6c49".repeat(41) })).toThrow();
    expect(input.parse({ name: "a".repeat(120) }).name).toBe("a".repeat(120));
    expect(() => input.parse({ name: "a".repeat(121) })).toThrow();
  });

  it("counts the other fields the same way", () => {
    expect(() => input.parse({ bio: "\u6c49".repeat(667) })).toThrow();
    expect(input.parse({ bio: "\u6c49".repeat(666) }).bio).toHaveLength(666);
    expect(() => input.parse({ organization: "\u6c49".repeat(67) })).toThrow();
    expect(
      input.parse({ organization: "\u6c49".repeat(66) }).organization,
    ).toBe("\u6c49".repeat(66));
  });

  it("still requires a name and one changed field", () => {
    expect(() => input.parse({ name: "" })).toThrow();
    expect(() => input.parse({})).toThrow();
  });
});
