import client from "./instance";

interface Param {
  postId: number;
  applicantId: number;
  targetId: number;
  rating: number;
}

export default async function postRating({ postId, applicantId, targetId, rating }: Param) {
  if (!applicantId) throw new Error("applicantId가 유효하지 않습니다.");
  if (!targetId) throw new Error("targetId가 유효하지 않습니다.");
  if (!rating) throw new Error("rating가 유효하지 않습니다.");
  const response = await client.post(`/api/posts/${postId}/applicants/${applicantId}/rating`, {
    targetId,
    rating,
  });
  return response;
}
