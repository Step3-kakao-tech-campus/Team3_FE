export default function truncateSecondFloatingPoint(number: number): number {
  return Math.trunc(number * 10) / 10;
}
