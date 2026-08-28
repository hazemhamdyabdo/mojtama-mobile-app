export function getInitials(name: string, maxParts = 2) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, maxParts)
    .join("")
    .toUpperCase();
}
