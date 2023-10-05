import client from "./instance";

export async function getApplicants(postId: number) {
  if (!postId) throw new Error("postId 또는 accessToken이 유효하지 않습니다.");
  const res = await client.get(`/api/posts/${postId}/applicants?size=100`);
  return res;
}

export async function putAcceptApplicant(postId: number, applicantId: number) {
  if (!postId) throw new Error("putAcceptApplicant: postId 또는 accessToken이 유효하지 않습니다.");
  if (!applicantId) throw new Error("putAcceptApplicant: applicantId가 유효하지 않습니다.");
  const res = await client.post(`/api/posts/${postId}/applicants/${applicantId}`, {
    status: true,
  });
  return res;
}

export async function deleteRejectApplicant(postId: number, applicantId: number) {
  if (!postId) throw new Error("deleteRejectApplicant: postId 또는 accessToken이 유효하지 않습니다.");
  if (!applicantId) throw new Error("deleteRejectApplicant: applicantId가 유효하지 않습니다.");
  const res = await client.delete(`/api/posts/${postId}/applicants/${applicantId}`);
  return res;
}
