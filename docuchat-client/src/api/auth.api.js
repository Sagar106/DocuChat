import api from "./axios";

export const loginUser = (data) => {
  api.post("/auth/login", data);
};

export const registerUser = (data) => {
  api.post("/auth/register", data);
};

export const logoutUser = () => {
  api.post("/auth/logout");
};

export const getCurrentUser = () => {
  api.post("/auth/me");
};

export const googleLogin = (idToken) => {
  api.post("/auth/google", {
    idToken,
  });
};
