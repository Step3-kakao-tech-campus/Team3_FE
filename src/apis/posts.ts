import client from "./instance";

export async function getPosts(queryString?: string) {
  const res = await client.get(`/api/posts${queryString || ""}`);
  return res;
}

interface PostOption {
  title: string;
  districtId: number;
  startTime: string;
  dueTime: string;
  content: string;
}

export async function postRegisterPosts(postOption: PostOption) {
  const response = await client.post("/api/posts", postOption);
  return response;
}

export async function getPostById(id: number) {
  const response = await client.get(`/api/posts/${id}`);
  return response;
}

export async function deletePost({ id }: { id: number }) {
  const response = await client.delete(`/api/posts/${id}`);
  return response;
}
