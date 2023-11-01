import client from "./instance";

export async function postSendVerificationEmail() {
  const res = await client.post(`/api/email-verification`);
  return res;
}
export async function postConfirmVerificationEmail() {
  const res = await client.post(`/api/email-confirm`);
  return res;
}
