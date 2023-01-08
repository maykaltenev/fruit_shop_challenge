export function getSubstring(str) {
  const index = str.lastIndexOf("/");
  return str.substring(index + 1);
}
