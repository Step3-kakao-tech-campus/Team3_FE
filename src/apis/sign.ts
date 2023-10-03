import client from "./instance";

interface UserData {
  email: string;
  password: string;
  name?: string;
  districtId?: number;
}

export const postRegister = (data: UserData) => {
  const { email, password, name, districtId } = data;
  return client.post("/api/join", {
    email,
    password,
    name,
    districtId,
  });
};

export const postLogin = (data: UserData) => {
  const { email, password } = data;
  return client.post("/api/login", {
    email,
    password,
  });
};

export const postLogout = () => {
  return client.post("/api/logout");
};

export const postAuthentication = () => {
  return client.post("/api/authentication");
};
