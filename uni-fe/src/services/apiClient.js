import axios from "axios";

export const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL ||
  `http://${window.location.hostname}:8080/project/aboutUni/uni-be/app/api/api.php`;

export const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export function authHeaders(extraHeaders = {}) {
  const token = sessionStorage.getItem("aboutUni.jwt");
  const csrfToken = sessionStorage.getItem("aboutUni.csrf");

  return {
    ...extraHeaders,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(csrfToken ? { "X-CSRF-Token": csrfToken } : {}),
  };
}
