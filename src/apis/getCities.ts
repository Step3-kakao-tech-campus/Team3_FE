export default async function getCities() {
  return fetch("https://server.jagaldol.dev:8080/api/cities");
}
