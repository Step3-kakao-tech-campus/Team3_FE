import instance from "./index";

interface UserData {
  email: string;
  password: string;
  name?: string;
  districtId?: number;
}

export const register = (data: UserData) => {
  const { email, password, name, districtId } = data;
  return instance.post("/api/join", {
    email,
    password,
    name,
    districtId,
  });
};

export const login = (data: UserData) => {
  const { email, password } = data;
  return instance.post("/api/login", {
    email,
    password,
  });
};

export const logout = () => {
  return instance.post("/api/logout");
};

export const authentication = () => {
  return instance.post("/api/authentication");
};
