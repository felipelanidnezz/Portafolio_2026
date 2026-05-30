import { cpSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const src = join("ouija-ai", "public");
const dest = join("public", "ouija-ai");

mkdirSync(dest, { recursive: true });
cpSync(src, dest, { recursive: true });
console.log("Synced ouija-ai/public → public/ouija-ai");
