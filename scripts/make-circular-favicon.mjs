import sharp from "sharp";

async function makeCircularFavicons() {
  const input = "public/assets/images/logo-avatar.jpg";
  const meta = await sharp(input).metadata();
  const width = meta.width || 360;
  const height = meta.height || 360;
  const size = Math.min(width, height);
  const radius = size / 2;

  // Exact circle mask in SVG
  const circleSvg = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${radius}" cy="${radius}" r="${radius}" fill="#ffffff"/></svg>`
  );

  const circularBase = await sharp(input)
    .extract({
      left: Math.floor((width - size) / 2),
      top: Math.floor((height - size) / 2),
      width: size,
      height: size,
    })
    .composite([{ input: circleSvg, blend: "dest-in" }])
    .png()
    .toBuffer();

  await sharp(circularBase).resize(512, 512).toFile("public/assets/images/logo-avatar-circle.png");
  await sharp(circularBase).resize(180, 180).toFile("public/apple-touch-icon.png");
  await sharp(circularBase).resize(48, 48).toFile("public/favicon.ico");
  await sharp(circularBase).resize(48, 48).toFile("public/favicon.png");
  await sharp(circularBase).resize(32, 32).toFile("public/favicon-32x32.png");
  await sharp(circularBase).resize(16, 16).toFile("public/favicon-16x16.png");

  console.log("Generated clean circular transparent favicons successfully!");
}

makeCircularFavicons().catch((e) => {
  console.error(e);
  process.exit(1);
});

