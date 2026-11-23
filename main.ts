const { copyFileSync, existsSync, mkdirSync } = require("node:fs");
const { join, resolve } = require("node:path");

const sourcePath = join(__dirname, "POST.json");
const outputDirectory = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
const destinationPath = join(outputDirectory, "POST.json");

if (!existsSync(sourcePath)) {
  console.error(`Error: POST.json is missing from the repository root (${sourcePath}).`);
  process.exit(1);
}

try {
  mkdirSync(outputDirectory, { recursive: true });
  copyFileSync(sourcePath, destinationPath);
  console.log(`Copied ${sourcePath} to ${destinationPath}`);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Error: Could not copy POST.json to ${destinationPath}: ${message}`);
  process.exitCode = 1;
}
