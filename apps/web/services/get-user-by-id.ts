export const getUserById = async ({ id }: { id: string }) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    throw new Error("Missing API_BASE_URL env variable");
  }
  const res = await fetch(`${baseUrl}/users/${id}`);

  return res.json();
};
