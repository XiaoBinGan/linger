# Knowledge Format

Knowledge Format provides shared YAML-based parsing and serialization helpers for knowledge documents, reused by Memory, the Wiki and other knowledge code.

A document may begin with a UTF-8 byte-order mark: an editor that saves one is not writing document text, so the validators, the front-matter reader, the normalizer and the bundle-root version writer read it as encoding and never require the author to remove it.

The package has no AGENTS.md of its own; commands are the `scripts` in `package.json`, and general conventions are in the root [AGENTS.md](../../AGENTS.md).
