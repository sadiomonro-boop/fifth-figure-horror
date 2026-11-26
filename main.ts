import { mkdirSync, writeFileSync } from "node:fs";

// The entry: a two-sentence horror story, chosen by blind testing
// 9 original candidates against each other and against two classic
// rivals with a free model as proxy judge (see BUILD-REPORT.json).
// Winner: C7, 164 characters, 2 sentences.
const STORY =
  "My son's teacher called to say he drew our family again in class today. " +
  "There were five of us in the picture, and the fifth was standing behind me, holding my hand.";

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
