import { describe, expect, it } from "vitest";

import { translate } from "@/i18n/language";

import { artifactTreeDetail } from "./message-file-item";

describe("published folder detail", () => {
  it("words the total the way every other size in the app reads", () => {
    const detail = (total_bytes: number) =>
      artifactTreeDetail(
        {
          type: "artifact_tree",
          content: "attachments",
          publication_group_id: "group_one",
          root_path: "attachments/",
          file_count: 7,
          directory_count: 3,
          total_bytes,
        },
        translate,
      );
    expect(detail(1536)).toBe("7 files · 3 folders · 1.5 KB");
    expect(detail(1024 * 1024 - 1)).toBe("7 files · 3 folders · 1 MB");
    expect(detail(300)).toBe("7 files · 3 folders · 300 B");
  });
});
