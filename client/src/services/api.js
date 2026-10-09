
const API_URL = "http://localhost:5000/api";

export async function summariseWebsite(url) {
  const response = await fetch(`${API_URL}/summarise`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to summarise webpage.");
  }

  return data;
}
