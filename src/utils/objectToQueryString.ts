/**
 * 객체를 전달 받아 쿼리스트링으로 변환하는 함수
 * 쿼리스트링 예시 - ?cityId=1&key=2&all=true
 * @param obj - 쿼리스트링으로 변환할 객체, key는 string, value는 string | number의 타입을 가진다
 * @returns - 변환된 쿼리스트링을 반환
 */
export default function objectToQueryString(obj: Record<string, string | number>) {
  const queryString = Object.keys(obj)
    .map((key) => `${key}=${encodeURIComponent(obj[key])}`)
    .join("&");
  return queryString ? `?${queryString}` : "";
}
