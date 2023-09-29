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
  }); // Send with join
};

export const login = (data: UserData) => {
  const { email, password } = data;
  return instance.post("/api/login", {
    email,
    password,
  });
};

// export const logout = () => {
//   removeCookie("email");
//   removeCookie("token");
//   window.location.href = "/";
//   return instance.post("/api/logout");
// };

export const authentication = () => {
  return instance.get("/api/authentication");
};
