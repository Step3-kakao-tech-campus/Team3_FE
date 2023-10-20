import client from "./instance";

interface Param {
  applicantId: number;
  targetId: number;
  rating: number;
}

export default async function postRating({ applicantId, targetId, rating }: Param) {
  if (!applicantId) throw new Error("applicantId가 유효하지 않습니다.");
  if (!targetId) throw new Error("targetId가 유효하지 않습니다.");
  if (!rating) throw new Error("rating가 유효하지 않습니다.");
  const response = await client.post(`/api/applicants/${applicantId}/rating`, {
    targetId,
    rating,
  });
  return response;
}
