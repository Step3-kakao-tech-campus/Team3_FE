/**
 *
 * @param date 현재 시간과 비교하기 위한 Date 객체, 한국 시간을 기준으로 하는 시간을 전달받아야 한다.
 * @returns 현재 시각과 비교하여 과거 시간 여부를 boolean 타입으로 반환한다.
 */
export default function isPastTime(date: Date): boolean {
  const currentTime = new Date();
  const utc = currentTime.getTime() + currentTime.getTimezoneOffset() * 60 * 1000;
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const currentTimeKor = new Date(utc + KR_TIME_DIFF);

  return currentTimeKor > new Date(date);
}
