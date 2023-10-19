import client from "./instance";

interface RecordOptions {
  key?: number;
  size?: number;
  condition?: "all" | "created" | "participated";
  status?: "all" | "open" | "closed";
  cityId?: number;
  start?: string;
  end?: string;
}

export async function getParticipationRecord(userId: number, recordOptions: RecordOptions) {
  if (!userId) throw new Error("userId가 유효하지 않습니다.");
  const response = await client.get(`/api/posts/users/${userId}/participation-records`, { params: recordOptions });
  return response;
}

export async function getRecord(userId: number) {
  if (!userId) throw new Error("userId가 유효하지 않습니다.");
  const response = await client.get(`/api/users/${userId}/records`);
  return response;
}

export async function postScore({ postId, formData }: { postId: number; formData: { score: number; image?: File } }) {
  if (!postId) throw new Error("postId가 유효하지 않습니다.");
  const response = await client.post(`/api/posts/${postId}/scores`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
}

export async function putScore({
  postId,
  scoreId,
  formData,
}: {
  postId: number;
  scoreId: number;
  formData: { score?: number; image?: File };
}) {
  if (!postId) throw new Error("postId가 유효하지 않습니다.");
  if (!scoreId) throw new Error("scoreId가 유효하지 않습니다.");
  const response = await client.put(`/api/posts/${postId}/scores/${scoreId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
}

export async function deleteScore({ postId, scoreId }: { postId: number; scoreId: number }) {
  if (!postId) throw new Error("postId가 유효하지 않습니다.");
  if (!scoreId) throw new Error("scoreId가 유효하지 않습니다.");
  const response = await client.delete(`/api/posts/${postId}/scores/${scoreId}`);
  return response;
}
