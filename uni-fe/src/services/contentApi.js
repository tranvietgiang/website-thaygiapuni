import { api, authHeaders } from "./apiClient.js";

export async function fetchSiteContent() {
  const response = await api.get("", {
    params: { action: "content" },
  });

  return response.data.content;
}

export async function saveSiteContent(content) {
  const response = await api.post(
    "",
    { content },
    {
      params: { action: "content" },
      headers: authHeaders(),
    },
  );

  return response.data.content;
}
