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

export async function putProfile({ formData }: { formData: { name?: string; districtId: number; image?: File } }) {
  if (!formData.districtId) throw new Error("districtId가 유효하지 않습니다.");
  const response = await client.put(`/api/users/mine`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
}

export async function getUsers(name: string, pageParam?: number) {
  const res = await client.get(`/api/users`, {
    params: {
      key: pageParam,
      name,
    },
  });

  return res;
}
