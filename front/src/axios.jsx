import axios from "axios";

const baseURL = "/api";

const axiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    Authorization: `JWT ${localStorage.getItem("access_token")}` || null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function errorHandling(error) {
    const originalRequest = error.config;

    if (error.response.isUndefined) {
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      originalRequest.url === `${baseURL}token/refresh/`
    ) {
      window.location.href = "/login/";
      return Promise.reject(error);
    }

    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);

        if (tokenParts.exp > now) {
          return axiosInstance
            .post("/token/refresh/", { refresh: refreshToken })
            .then((response) => {
              localStorage.setItem("access_token", response.data.access);
              localStorage.setItem("refresh_token", response.data.refresh);

              axiosInstance.defaults.headers.Authorization = `JWT ${response.data.access}`;
              originalRequest.headers.Authorization = `JWT ${response.data.access}`;

              return axiosInstance(originalRequest);
            });
        }
        window.location.href = "/login/";
      } else {
        window.location.href = "/login/";
      }
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;
