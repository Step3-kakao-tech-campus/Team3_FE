import instanceForToken from "./authInstance";

export default async function postAuthentication() {
  const response = await instanceForToken.post("/api/authentication");
  return response;
}
