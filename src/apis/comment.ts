import client from "./instance";

export default async function getComments(id: string, pageParam?: number) {
  const response = await client.get(`/api/posts/${id}/comments`, {
    params: {
      key: pageParam,
      size: 10,
    },
  });
  return response;
}
