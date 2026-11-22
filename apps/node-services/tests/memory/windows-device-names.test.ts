import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, expect, it } from "vitest";
import { publishMemoryWiki } from "../../src/memory/published-memory-files.js";

const roots: string[] = [];
async function fixture() {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "device-names-"));
  roots.push(root);
  return root;
}
afterEach(async () => {
  for (const root of roots.splice(0))
    await fs.rm(root, { recursive: true, force: true });
});

it("keeps a Windows device name out of a published page's file name", async () => {
  const root = await fixture();
  const titles = ["CON", "nul.txt", "com1", "Auxiliary report"];
  await publishMemoryWiki(
    root,
    "alice",
    titles.map((title, index) => ({
      page: { documentId: `doc_${index}`, path: `projects/page-${index}.md` },
      content: `# ${title}\n`,
    })),
    new Map(),
  );
  expect(
    (
      await fs.readdir(path.join(root, "alice/memory/knowledge/projects"))
    ).sort(),
  ).toEqual(
    ["_CON.md", "_com1.md", "_nul.txt.md", "Auxiliary report.md"].sort(),
  );
});
