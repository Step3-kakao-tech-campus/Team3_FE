import client from "./instance";

export async function getMyProfile() {
  const res = await client.get(`/api/users/mine`);
  return res;
}

export async function getProfileById(userId: number) {
  if (!userId) throw new Error("userId가 유효하지 않습니다.");
  const res = await client.get(`/api/users/${userId}`);
  return res;
}
