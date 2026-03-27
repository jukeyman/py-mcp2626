import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  writeFileSync,
} from "node:fs";
import { join, resolve } from "node:path";

const rootDir = resolve(process.cwd());

function readArgs() {
  const args = process.argv.slice(2);
  const values = {
    name: "",
    language: "",
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--name") {
      values.name = args[index + 1] ?? "";
    }
    if (arg === "--language") {
      values.language = args[index + 1] ?? "";
    }
  }

  return values;
}

function replaceTokens(dirPath, tokens) {
  for (const entry of readdirSync(dirPath, { withFileTypes: true })) {
    const absolutePath = join(dirPath, entry.name);
    if (entry.isDirectory()) {
      replaceTokens(absolutePath, tokens);
      continue;
    }

    const raw = readFileSync(absolutePath, "utf8");
    const next = Object.entries(tokens).reduce(
      (text, [token, value]) => text.replaceAll(token, value),
      raw,
    );
    writeFileSync(absolutePath, next, "utf8");
  }
}

function renameTokenizedPaths(dirPath, tokens) {
  for (const entry of readdirSync(dirPath, { withFileTypes: true })) {
    const absolutePath = join(dirPath, entry.name);
    if (entry.isDirectory()) {
      renameTokenizedPaths(absolutePath, tokens);
    }

    const renamedEntry = Object.entries(tokens).reduce(
      (text, [token, value]) => text.replaceAll(token, value),
      entry.name,
    );

    if (renamedEntry !== entry.name) {
      renameSync(absolutePath, join(dirPath, renamedEntry));
    }
  }
}

function main() {
  const { name, language } = readArgs();
  if (!name || !["ts", "py"].includes(language)) {
    throw new Error("Usage: node scripts/new-server.mjs --name <server-name> --language <ts|py>");
  }

  const templateDir = join(rootDir, "templates", language === "ts" ? "ts-server" : "py-server");
  const outputDir = join(rootDir, "apps", name);

  if (existsSync(outputDir)) {
    throw new Error(`Target already exists: ${outputDir}`);
  }

  mkdirSync(outputDir, { recursive: true });
  cpSync(templateDir, outputDir, { recursive: true });

  replaceTokens(outputDir, {
    "__SERVER_NAME__": name,
    "__PACKAGE_NAME__": name,
    "__PYTHON_MODULE__": name.replaceAll("-", "_"),
  });
  renameTokenizedPaths(outputDir, {
    "__SERVER_NAME__": name,
    "__PACKAGE_NAME__": name,
    "__PYTHON_MODULE__": name.replaceAll("-", "_"),
  });

  console.log(`Created ${language.toUpperCase()} server at ${outputDir}`);
}

main();
