import client from "./instance";

export async function getPosts(queryString?: string) {
  const res = await client.get(`/api/posts${queryString || ""}`);
  return res;
}

interface PostOption {
  title: string;
  districtId: number;
  startTime: Date;
  dueTime: Date;
  content: string;
}

export async function postRegisterPosts(postOption: PostOption) {
  const response = await client.post("/api/posts", postOption);
  return response;
}
