import client from "./instance";

export async function postSendVerificationEmail() {
  const res = await client.post(`/api/email-verification`);
  return res;
}
export async function postConfirmVerificationEmail({ token }: { token: string }) {
  const res = await client.post(`/api/email-confirm`, { token });
  return res;
}
