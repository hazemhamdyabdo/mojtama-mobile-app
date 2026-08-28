#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");

const classReplacements = [
  ["bg-[#E4E4E7]", "bg-slate-200"],
  ["border-[#F1F5F9]", "border-slate-100"],
  ["border-b border-[#F1F5F9]", "border-b border-slate-100"],
  ["bg-[#EF4444]", "bg-rejected"],
  ["bg-[#E2E8F0]", "bg-slate-200"],
  ["bg-[#E4D9FF]", "bg-primary-100"],
  ["bg-[#64748B]", "bg-slate-500"],
  ["bg-[#22C55E]", "bg-approved-500"],
  ["bg-[#F25C5C]", "bg-rejected-500"],
  ["text-[#1E3A5F]", "text-slate-800"],
  ["text-[#E2E8F0]", "text-slate-200"],
];

const jsReplacements = [
  ['trackColor={{ false: "#E4E4E7", true: "#C4B5FD" }}', "trackColor={{ false: colors.slate200, true: colors.primary300 }}"],
  ['trackColor={{ false: "#E9E4FF", true: "#C4B5FD" }}', "trackColor={{ false: colors.primary100, true: colors.primary300 }}"],
  ['thumbColor={value ? "#7B61FF" : "#FFFFFF"}', "thumbColor={value ? colors.primary : colors.white}"],
  ['thumbColor={isUrgent ? "#7B61FF" : "#FFFFFF"}', "thumbColor={isUrgent ? colors.primary : colors.white}"],
  ['color={liked ? "#7B61FF" : "#90A1B9"}', "color={liked ? colors.primary : colors.secText}"],
  ['color={isExpanded ? "#7B61FF" : "#64748B"}', "color={isExpanded ? colors.primary : colors.slate500}"],
  ['color={isPaid ? "#16A34A" : "#EF4444"}', "color={isPaid ? colors.approved700 : colors.rejected}"],
  ['color={destructive ? "#F87171" : "#64748B"}', "color={destructive ? colors.rejected : colors.slate500}"],
  ['option.iconColor ?? "#7B61FF"', "option.iconColor ?? colors.primary"],
  ['accentColor="#7B61FF"', "accentColor={colors.primary}"],
  ['tintColor: "#7B61FF"', "tintColor: colors.primary"],
  ['backgroundColor: "#fff"', "backgroundColor: colors.white"],
  ['backgroundColor: "#ffffff"', "backgroundColor: colors.white"],
  ['color: "#1F1F1F"', "color: colors.heading"],
  ['borderColor: "#E4E4E7"', "borderColor: colors.cardBorder"],
  ['borderColor: "#FCA5A5"', "borderColor: colors.rejected200"],
];

const arrayReplacements = [
  ['const DOT_COLORS = ["#7B61FF", "#A78BFA", "#DDD6FE"];', "const DOT_COLORS = [colors.primary, colors.primary400, colors.primary200];"],
];

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      walk(fullPath, files);
    } else if (/\.(tsx|ts)$/.test(entry) && !fullPath.includes("theme/colors.ts")) {
      files.push(fullPath);
    }
  }
  return files;
}

function ensureColorsImport(content) {
  if (
    content.includes("colors.") &&
    !content.includes('from "@/theme/colors"') &&
    !content.includes("from '@/theme/colors'")
  ) {
    const importLine = 'import { colors } from "@/theme/colors";\n';
    const lastImportMatch = content.match(/^import .+;\n/gm);
    if (lastImportMatch) {
      const lastImport = lastImportMatch[lastImportMatch.length - 1];
      const insertAt = content.indexOf(lastImport) + lastImport.length;
      return content.slice(0, insertAt) + importLine + content.slice(insertAt);
    }
    return importLine + content;
  }
  return content;
}

let totalFiles = 0;
const files = walk(path.join(root, "src"));

for (const file of files) {
  let content = readFileSync(file, "utf8");
  const original = content;

  for (const [from, to] of classReplacements) {
    content = content.split(from).join(to);
  }
  for (const [from, to] of arrayReplacements) {
    content = content.split(from).join(to);
  }
  for (const [from, to] of jsReplacements) {
    content = content.split(from).join(to);
  }

  content = ensureColorsImport(content);

  if (content !== original) {
    writeFileSync(file, content, "utf8");
    totalFiles += 1;
  }
}

console.log(`Pass 2 updated ${totalFiles} files.`);
