import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  registerUser(user: object) {
    return api.post("/user", user);
  },
  getLoggedInUser() {
    return api.get("/user");
  },
  updateUser(data: object) {
    return api.post("/user/update", data);
  },
  loginUser(user: object) {
    return api.post("/user/login", user);
  },
  logoffUser() {
    return api.get("/user/logout");
  },
};
