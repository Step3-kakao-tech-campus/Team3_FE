import { formatDateToKoreanTime } from "./formatDateToString";

export default function isPastTime(date: Date): boolean {
  return formatDateToKoreanTime(new Date()) > formatDateToKoreanTime(new Date(date));
}
