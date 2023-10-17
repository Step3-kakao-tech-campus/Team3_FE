import client from "./instance";

interface UserData {
  email: string;
  password: string;
  name?: string;
  districtId?: number;
}

export async function postRegister(data: UserData) {
  const response = await client.post("/api/join", data);

  return response;
}

export async function postLogin(data: UserData) {
  const { email, password } = data;
  const response = await client.post("/api/login", {
    email,
    password,
  });
  return response;
}

export async function postLogout() {
  const response = await client.post("/api/logout");
  return response;
}

export async function postAuthentication() {
  const response = await client.post("/api/authentication");
  return response;
}
