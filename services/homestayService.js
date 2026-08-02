import { request } from "./api";

export async function getHomestays(token) {
  return request("/api/homestays", {
    method: "GET",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}

export async function getHomestayById(id, token) {
  return request(`/api/homestays/${id}`, {
    method: "GET",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}

export async function createHomestay(data, token) {
  return request("/api/homestays", {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: JSON.stringify(data),
  });
}

export async function updateHomestay(id, data, token) {
  return request(`/api/homestays/${id}`, {
    method: "PUT",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: JSON.stringify(data),
  });
}

export async function deleteHomestay(id, token) {
  return request(`/api/homestays/${id}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}
