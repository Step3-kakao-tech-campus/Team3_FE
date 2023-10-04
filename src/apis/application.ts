import client from "./instance";

interface Param {
  postId: number;
  accessToken: string;
}

export default async function getApplicants({ postId, accessToken }: Param) {
  const res = await client.get(`/api/posts/${postId}/applicants`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res;
}
