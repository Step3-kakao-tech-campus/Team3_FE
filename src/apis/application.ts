import client from "./instance";

export default async function getApplicants(postId: number) {
  if (!postId) throw new Error("postId 또는 accessToken이 유효하지 않습니다.");
  const res = await client.get(`/api/posts/${postId}/applicants`);
  return res;
}
