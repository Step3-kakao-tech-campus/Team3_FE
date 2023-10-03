import client from "./instance";

export async function getPosts(queryString?: string) {
  return fetch(`https://server.jagaldol.dev:8080/api/posts${queryString || ""}`);
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
