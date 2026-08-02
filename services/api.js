const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://your-backend.onrender.com";

const buildUrl = (path) => `${API_BASE_URL}${path}`;

export async function request(path, options = {}) {
  const response = await fetch(buildUrl(path), {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || data.error || "Request failed");
    }
    return data;
  }

  if (!response.ok) {
    throw new Error("Request failed");
  }

  return null;
}
