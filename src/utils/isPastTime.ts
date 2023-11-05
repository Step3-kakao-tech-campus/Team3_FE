export default function isPastTime(date: Date): boolean {
  return new Date() > new Date(date);
}
