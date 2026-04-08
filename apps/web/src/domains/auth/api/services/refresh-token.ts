export const refreshToken = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      }
    );

    if (!response.ok) return null;

    return true;
  } catch (error) {
    console.error("Error during token refresh:", error);
    return null;
  }
};
