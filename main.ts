import { mkdirSync, writeFileSync } from "node:fs";

// The entry: a two-sentence horror story, chosen by blind testing
// 8 fresh replacement candidates (spare-key vehicle) against each
// other and against 6 strong rivals with a free model as proxy judge
// (see BUILD-REPORT.json). Winner: D5-final, 163 characters,
// 2 sentences. Replaces the critic-rejected drawing-trope story.
const STORY =
  "My son has lost his house key three times this term, so I keep a spare on the hook by the door. " +
  "This morning two spares hung on the hook, and the new one is warm.";

function countSentences(text) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0).length;
}

const chars = [...STORY].length;
const sentences = countSentences(STORY);
if (STORY.trim().length === 0) {
  throw new Error("entry must not be only white space");
}
if (chars < 1 || chars > 400) {
  throw new Error(`entry must be 1-400 characters, got ${chars}`);
}
if (sentences !== 2) {
  throw new Error(`entry must be exactly two sentences, got ${sentences}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", STORY, "utf8");
console.log(`wrote /output/entry.txt (${chars} chars, ${sentences} sentences)`);
