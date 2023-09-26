/**
 * Date 객체를 전달받아 "0000년 00월 00일 00시 00분"의 형태로 파싱 후 그 값을 리턴하는 함수.
 * @param date - string으로 변환할 Date 객체
 * @returns - 파싱된 string 반환
 */
export default function formatDateToString(date: Date) {
  const newDate = new Date(date);

  const year = newDate.getFullYear(); // 연도
  const month = (newDate.getMonth() + 1).toString().padStart(2, "0"); // 월 (0부터 시작하므로 +1, 두 자리로 포맷)
  const day = newDate.getDate().toString().padStart(2, "0"); // 일 (두 자리로 포맷)
  const hours = newDate.getHours().toString().padStart(2, "0"); // 시간 (두 자리로 포맷)
  const minutes = newDate.getMinutes().toString().padStart(2, "0"); // 분 (두 자리로 포맷)

  return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
}
