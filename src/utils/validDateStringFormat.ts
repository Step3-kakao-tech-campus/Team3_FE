/**
 * 문자열이 'YYYY-MM-DD' 형식의 문자열인지 확인하는 함수
 * @param dateString 확인 할 문자열
 * @returns 문자열의 형식이 'YYYY-MM-DD'를 만족하는지 여부
 */
export default function isValidDateFormatByDash(dateString: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
}
