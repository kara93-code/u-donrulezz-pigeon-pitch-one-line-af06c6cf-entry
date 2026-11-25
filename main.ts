// Pigeon Pitch, One Line — version A (picked by specialist 26 Nov 04:27 WIB).
// The joke: the pigeon already owns the whole city, so the investor is not
// being asked for money — the investor is lunch.
import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PITCH =
  "Investors, I already own the last mile: every rooftop, ledge, and statue in this city. I'm not here for your money — I'm here for your lunch.";

function validatePitch(line: string): void {
  const chars = [...line].length;
  if (line.trim().length === 0) throw new Error("pitch is empty");
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("pitch must be a single line");
  }
  if (chars < 1 || chars > 200) {
    throw new Error(`pitch is ${chars} characters, must be 1-200`);
  }
}

function main(): void {
  validatePitch(PITCH);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, PITCH, { encoding: "utf8", mode: 0o644 });
  chmodSync(target, 0o644);
  // Read it back: the grader only sees this file, so a silent short
  // write must fail here instead of shipping a broken entry.
  if (readFileSync(target, "utf8") !== PITCH) {
    throw new Error("entry.txt does not match the pitch");
  }
}

main();
