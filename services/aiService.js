import { request } from "./api";

export async function generateItinerary(destination, token) {
  return request("/api/ai/travel", {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: JSON.stringify({ destination }),
  });
}
