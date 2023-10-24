export default function processString(str: string) {
  const indexOfNewLine = str.indexOf("\n");
  if (indexOfNewLine === -1) {
    if (str.length <= 20) return str;
    return `${str.substring(0, 20)}...`;
  }
  return `${str.substring(0, indexOfNewLine)}\n...`;
}
