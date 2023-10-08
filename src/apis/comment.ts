import client from "./instance";

export async function getComments(id: number, pageParam?: number) {
  const response = await client.get(`/api/posts/${id}/comments`, {
    params: {
      key: pageParam,
      size: 10,
    },
  });
  return response;
}

export async function postComments({ id, content }: { id: number; content: string }) {
  const response = await client.post(`/api/posts/${id}/comments`, {
    content,
  });
  return response;
}
