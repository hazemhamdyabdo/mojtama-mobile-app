import fs from "node:fs";
import path from "node:path";

const root = path.resolve("src");
const importLine =
  'import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";';

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
    } else if (entry.name.endsWith(".tsx")) {
      files.push(fullPath);
    }
  }
  return files;
}

function usesStyledElsewhere(content) {
  return /styled\s*\(/.test(content.replace(/const SafeAreaView = styled[\s\S]*?;/, ""));
}

function migrate(content) {
  let next = content;
  let changed = false;

  const hadStyledWrapper = /const SafeAreaView = styled\(/.test(next);

  next = next.replace(
    /import \{ SafeAreaView as [\w]+ \} from "react-native-safe-area-context";\r?\n\r?\nconst SafeAreaView = styled\([\w]+\);\r?\n\r?\n/g,
    "",
  );
  next = next.replace(
    /import \{ SafeAreaView as [\w]+ \} from "react-native-safe-area-context";\r?\nconst SafeAreaView = styled\([\w]+\);\r?\n\r?\n/g,
    "",
  );

  if (hadStyledWrapper && next !== content) {
    changed = true;
  }

  const usesDirectSafeArea =
    /import \{ SafeAreaView \} from "react-native-safe-area-context"/.test(next) &&
    /<SafeAreaView[\s>]/.test(next);

  if (usesDirectSafeArea) {
    next = next.replace(
      /import \{ SafeAreaView \} from "react-native-safe-area-context";\r?\n/g,
      "",
    );
    changed = true;
  }

  if (!changed) {
    return content;
  }

  if (!next.includes(importLine)) {
    const importMatch = next.match(/^import .+;\r?\n/m);
    if (importMatch) {
      const insertAt = next.indexOf(importMatch[0]) + importMatch[0].length;
      next = `${next.slice(0, insertAt)}${importLine}\n${next.slice(insertAt)}`;
    } else {
      next = `${importLine}\n${next}`;
    }
  }

  next = next.replace(/<SafeAreaView(\s|>)/g, "<ScreenSafeAreaView$1");
  next = next.replace(/<\/SafeAreaView>/g, "</ScreenSafeAreaView>");

  if (hadStyledWrapper && !usesStyledElsewhere(next)) {
    next = next.replace(/import \{ styled \} from "nativewind";\r?\n/g, "");
  }

  return next;
}

const files = walk(root);
let updated = 0;

for (const file of files) {
  if (file.includes(`${path.sep}ScreenSafeAreaView.tsx`)) {
    continue;
  }

  const original = fs.readFileSync(file, "utf8");
  const migrated = migrate(original);

  if (migrated !== original) {
    fs.writeFileSync(file, migrated);
    updated += 1;
    console.log(path.relative(process.cwd(), file));
  }
}

console.log(`Updated ${updated} files.`);
