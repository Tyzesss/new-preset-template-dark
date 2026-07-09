import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const galleryDir = path.join(ROOT, "public", "gallery");

const MAX_WIDTH = 1600;
const QUALITY = 72;

async function main() {
  const entries = await fs.readdir(galleryDir, { withFileTypes: true });
  const jpgs = entries
    .filter((e) => e.isFile() && /\.jpe?g$/i.test(e.name))
    .map((e) => e.name)
    .filter((name) => !name.toLowerCase().endsWith(".min.jpg"));

  if (jpgs.length === 0) {
    console.log("No JPG files in public/gallery.");
    return;
  }

  let totalBefore = 0;
  let totalAfter = 0;

  for (const name of jpgs) {
    const inputPath = path.join(galleryDir, name);
    const outputName = name.replace(/\.jpe?g$/i, ".webp");
    const outputPath = path.join(galleryDir, outputName);

    const before = (await fs.stat(inputPath)).size;
    totalBefore += before;

    await sharp(inputPath, { failOn: "none" })
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const after = (await fs.stat(outputPath)).size;
    totalAfter += after;

    console.log(
      `${name} -> ${outputName} | ${(before / 1024 / 1024).toFixed(2)}MB -> ${(after / 1024 / 1024).toFixed(2)}MB`,
    );
  }

  console.log(
    `Total: ${(totalBefore / 1024 / 1024).toFixed(2)}MB -> ${(totalAfter / 1024 / 1024).toFixed(2)}MB`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

