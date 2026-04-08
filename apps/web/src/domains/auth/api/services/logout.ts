export async function logoutAction() {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/auth/logout`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  if (!response.ok) throw new Error("Logout failed");

  return response.json();
}
