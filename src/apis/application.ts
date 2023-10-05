import client from "./instance";

export async function getApplicants(postId: number) {
  if (!postId) throw new Error("postId 또는 accessToken이 유효하지 않습니다.");
  const res = await client.get(`/api/posts/${postId}/applicants?size=100`);
  return res;
}

export async function postAcceptApplicant(postId: number, applicantId: number) {
  if (!postId) throw new Error("postAcceptApplicant: postId 또는 accessToken이 유효하지 않습니다.");
  if (!applicantId) throw new Error("postAcceptApplicant: applicantId가 유효하지 않습니다.");
  const res = await client.post(`/api/posts/${postId}/applicants/${applicantId}`, {
    status: true,
  });
  return res;
}
