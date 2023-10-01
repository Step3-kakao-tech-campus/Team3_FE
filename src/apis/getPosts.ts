export default async function getPosts(queryString?: string) {
  return fetch(`https://server.jagaldol.dev:8080/api/posts${queryString || ""}`);
}
