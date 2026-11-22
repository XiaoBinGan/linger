import { describe, expect, it } from "vitest";

import { isGlobalSearchShortcut } from "./search-shortcut";

const key = (init: KeyboardEventInit & { keyCode?: number }) =>
  new KeyboardEvent("keydown", init as KeyboardEventInit);

describe("isGlobalSearchShortcut", () => {
  it("keeps the keystroke while an IME composition is in flight", () => {
    // Browsers report a composition either way; both must keep the key.
    expect(
      isGlobalSearchShortcut(
        key({ key: "k", metaKey: true, isComposing: true }),
      ),
    ).toBe(false);
    expect(
      isGlobalSearchShortcut(key({ key: "k", metaKey: true, keyCode: 229 })),
    ).toBe(false);
    expect(
      isGlobalSearchShortcut(key({ key: "k", ctrlKey: true, keyCode: 229 })),
    ).toBe(false);
  });

  it("opens search for Cmd/Ctrl+K outside a composition", () => {
    expect(isGlobalSearchShortcut(key({ key: "k", metaKey: true }))).toBe(true);
    expect(
      isGlobalSearchShortcut(key({ key: "K", ctrlKey: true, keyCode: 75 })),
    ).toBe(true);
    expect(isGlobalSearchShortcut(key({ key: "k" }))).toBe(false);
    expect(
      isGlobalSearchShortcut(key({ key: "k", metaKey: true, shiftKey: true })),
    ).toBe(false);
    expect(
      isGlobalSearchShortcut(key({ key: "k", ctrlKey: true, altKey: true })),
    ).toBe(false);
  });
});
