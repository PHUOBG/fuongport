import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const backupRoot = path.join(root, ".cf-pages-backup");
const hiddenEntries = [
  {
    src: path.join(root, "src", "app", "api"),
    bak: path.join(backupRoot, "api"),
  },
  {
    src: path.join(root, "src", "__tests__", "integration", "contact.route.test.ts"),
    bak: path.join(backupRoot, "contact.route.test.ts"),
  },
];

const run = (cmd, extraEnv = {}) => {
  execSync(cmd, {
    stdio: "inherit",
    env: { ...process.env, ...extraEnv },
  });
};

for (const dir of [".next", "out", ".velite"]) {
  fs.rmSync(path.join(root, dir), { recursive: true, force: true });
}

const moved = [];
try {
  fs.rmSync(backupRoot, { recursive: true, force: true });
  fs.mkdirSync(backupRoot, { recursive: true });

  for (const entry of hiddenEntries) {
    if (fs.existsSync(entry.src)) {
      fs.renameSync(entry.src, entry.bak);
      moved.push(entry);
    }
  }

  run("npx velite build");
  run("npx next build", { STATIC_EXPORT: "true" });
} finally {
  for (const entry of moved) {
    if (fs.existsSync(entry.bak)) {
      fs.renameSync(entry.bak, entry.src);
    }
  }
  fs.rmSync(backupRoot, { recursive: true, force: true });
}
