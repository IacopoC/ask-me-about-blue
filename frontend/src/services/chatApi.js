const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function sendMessage(messages) {
  const response = await fetch(`${API_URL}/api/chat`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages,
    }),
  });

  if(!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  return data.reply;
}
