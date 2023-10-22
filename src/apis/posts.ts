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

type PutOption = Omit<PostOption, "districtId"> & { id: number };

export async function putPost(putOption: PutOption) {
  const response = await client.put(`/api/posts/${putOption.id}`, {
    title: putOption.title,
    startTime: putOption.startTime,
    dueTime: putOption.dueTime,
    content: putOption.content,
  });
  return response;
}

export async function patchPost(postId: number) {
  const response = await client.patch(`/api/posts/${postId}`, { isClose: true });
  return response;
}
