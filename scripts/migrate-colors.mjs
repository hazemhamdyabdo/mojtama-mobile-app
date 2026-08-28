#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");

const classReplacements = [
  ["text-[#1F1F1F]", "text-heading"],
  ["text-[#2E2E2E]", "text-label"],
  ["text-[#90A1B9]", "text-sec-text"],
  ["text-[#64748B]", "text-slate-500"],
  ["text-[#62748E]", "text-slate-500"],
  ["text-[#45556C]", "text-slate-600"],
  ["text-[#475569]", "text-slate-600"],
  ["text-[#7B61FF]", "text-primary"],
  ["text-[#5B4ACF]", "text-primary-700"],
  ["text-[#EF4444]", "text-rejected"],
  ["text-[#F87171]", "text-rejected-500"],
  ["text-[#FFFFFF]", "text-white"],
  ["text-[#fff]", "text-white"],
  ["text-[#22C55E]", "text-approved-500"],
  ["text-[#16A34A]", "text-approved-700"],
  ["text-[#059669]", "text-approved-600"],
  ["text-[#34D399]", "text-approved"],
  ["text-[#F59E0B]", "text-pending-600"],
  ["text-[#D97706]", "text-pending-700"],
  ["text-[#CA8A04]", "text-pending-700"],
  ["text-[#FBBF24]", "text-pending"],
  ["text-[#F97316]", "text-pending-600"],
  ["text-[#2563EB]", "text-primary-700"],
  ["text-[#2B7FFF]", "text-primary-600"],
  ["text-[#0F766E]", "text-approved-700"],
  ["text-[#00786F]", "text-approved-700"],
  ["text-[#3D3D3D]", "text-label"],
  ["text-[#9CA3AF]", "text-sec-text"],
  ["text-[#C4C4C4]", "text-input-text"],
  ["text-[#A78BFA]", "text-primary-400"],
  ["text-[#C4B5FD]", "text-primary-300"],
  ["text-[#DDD6FE]", "text-primary-200"],
  ["text-[#E4D9FF]", "text-primary-100"],
  ["bg-[#7B61FF]", "bg-primary"],
  ["bg-[#F0EDFF]", "bg-primary-50"],
  ["bg-[#F8F6FF]", "bg-primary-50"],
  ["bg-[#E9E4FF]", "bg-primary-100"],
  ["bg-[#E8E2FF]", "bg-primary-100"],
  ["bg-[#EDE9FF]", "bg-primary-100"],
  ["bg-[#EBE8FF]", "bg-primary-100"],
  ["bg-[#FAFAFF]", "bg-primary-50"],
  ["bg-[#F8FAFC]", "bg-slate-50"],
  ["bg-[#F1F5F9]", "bg-slate-100"],
  ["bg-[#FFFFFF]", "bg-white"],
  ["bg-[#fff]", "bg-white"],
  ["bg-[#FFE6E6]", "bg-rejected-50"],
  ["bg-[#FEE2E2]", "bg-rejected-50"],
  ["bg-[#F87171]", "bg-rejected-500"],
  ["bg-[#FEF9C3]", "bg-pending-50"],
  ["bg-[#FFF6DE]", "bg-pending-50"],
  ["bg-[#FFEDD5]", "bg-pending-100"],
  ["bg-[#DCFCE7]", "bg-approved-50"],
  ["bg-[#E1F9F0]", "bg-approved-50"],
  ["bg-[#ECFDF3]", "bg-approved-50"],
  ["bg-[#F0FDFA]", "bg-approved-50"],
  ["bg-[#E5F0FC]", "bg-primary-50"],
  ["bg-[#DBEAFE]", "bg-primary-50"],
  ["bg-[#0F766E]", "bg-approved-700"],
  ["bg-[#D1D5DB]", "bg-slate-300"],
  ["bg-[#CBD5E1]", "bg-slate-300"],
  ["border-[#E4E4E7]", "border-card-border"],
  ["border-[#E2E8F0]", "border-slate-200"],
  ["border-[#CAD5E2]", "border-input-text"],
  ["border-[#CBD5E1]", "border-slate-300"],
  ["border-[#FCA5A5]", "border-rejected-200"],
  ["border-[#7B61FF]", "border-primary"],
  ["border-[#F87171]", "border-rejected-500"],
  ["border-[#FEF9C3]", "border-pending-50"],
  ["border-[#FFE8B1]", "border-pending-100"],
  ["border-[#C7F4E3]", "border-approved-100"],
  ["border-[#FED5D5]", "border-rejected-100"],
  ["border-[#D1D5DB]", "border-slate-300"],
  ["divide-[#E4E4E7]", "divide-card-border"],
];

const jsReplacements = [
  ['color="#7B61FF"', "color={colors.primary}"],
  ['color="#7b61ff"', "color={colors.primary}"],
  ['color="#90A1B9"', "color={colors.secText}"],
  ['color="#64748B"', "color={colors.slate500}"],
  ['color="#1F1F1F"', "color={colors.heading}"],
  ['color="#FFFFFF"', "color={colors.white}"],
  ['color="#fff"', "color={colors.white}"],
  ['color="#EF4444"', "color={colors.rejected}"],
  ['color="#F87171"', "color={colors.rejected}"],
  ['color="#22C55E"', "color={colors.approved500}"],
  ['color="#16A34A"', "color={colors.approved700}"],
  ['color="#F59E0B"', "color={colors.pending600}"],
  ['color="#CAD5E2"', "color={colors.inputText}"],
  ['color="#62748E"', "color={colors.slate500}"],
  ['color="#45556C"', "color={colors.slate600}"],
  ['placeholderTextColor="#90A1B9"', "placeholderTextColor={colors.secText}"],
  ['placeholderTextColor="#CAD5E2"', "placeholderTextColor={colors.inputText}"],
  ['backgroundColor: "#1F1F1F"', "backgroundColor: colors.heading"],
  ['backgroundColor: "#FFFFFF"', "backgroundColor: colors.white"],
  ['backgroundColor: "#7B61FF"', "backgroundColor: colors.primary"],
  ['<ActivityIndicator color="#7B61FF"', "<ActivityIndicator color={colors.primary}"],
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

let totalFiles = 0;
const files = walk(path.join(root, "src"));

for (const file of files) {
  let content = readFileSync(file, "utf8");
  const original = content;

  for (const [from, to] of classReplacements) {
    content = content.split(from).join(to);
  }

  for (const [from, to] of jsReplacements) {
    content = content.split(from).join(to);
  }

  const usesColors =
    content.includes("colors.") &&
    !content.includes('from "@/theme/colors"') &&
    !content.includes("from '@/theme/colors'");

  if (usesColors) {
    const importLine = 'import { colors } from "@/theme/colors";\n';
    const lastImportMatch = content.match(/^import .+;\n/gm);
    if (lastImportMatch) {
      const lastImport = lastImportMatch[lastImportMatch.length - 1];
      const insertAt = content.indexOf(lastImport) + lastImport.length;
      content = content.slice(0, insertAt) + importLine + content.slice(insertAt);
    } else {
      content = importLine + content;
    }
  }

  if (content !== original) {
    writeFileSync(file, content, "utf8");
    totalFiles += 1;
  }
}

console.log(`Updated ${totalFiles} files.`);
