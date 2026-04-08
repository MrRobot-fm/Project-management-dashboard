"server only";

import { cookies } from "next/headers";

export const getCookie = async (cookieName: string) => {
  const cookieStore = await cookies();

  return cookieStore.get(cookieName)?.value;
};
