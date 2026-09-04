const API_BASE_URL = "https://followupai-gvfs.onrender.com";

export async function getClients() {
  const response = await fetch(`${API_BASE_URL}/clients`);

  if (!response.ok) {
    throw new Error("Failed to fetch clients");
  }

  return response.json();
}

export async function createClient(clientData) {
  const response = await fetch(`${API_BASE_URL}/clients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clientData),
  });

  if (!response.ok) {
    throw new Error("Failed to create client");
  }

  return response.json();
}

export async function getFollowups() {
  const response = await fetch(`${API_BASE_URL}/followups`);

  if (!response.ok) {
    throw new Error("Failed to fetch follow-ups");
  }

  return response.json();
}

export async function generateScript(followupId) {
  const response = await fetch(
    `${API_BASE_URL}/followups/${followupId}/script`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to generate AI script");
  }

  return response.json();
}

export async function testCall(followupId) {
  const response = await fetch(
    `${API_BASE_URL}/followups/${followupId}/call-test`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to test call");
  }

  return response.json();
}

export async function getCallLogs() {
  const response = await fetch(`${API_BASE_URL}/call-logs`);

  if (!response.ok) {
    throw new Error("Failed to fetch call logs");
  }

  return response.json();
}
