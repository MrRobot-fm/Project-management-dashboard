"use server";

import { revalidatePath } from "next/cache";
import type { ActionResponse } from "@/types/action";
import { errorData } from "@/utils/error-data";
import { fetchInstance } from "@/utils/fetch-instance";
import { getCookie } from "@/utils/get-cookie";
import { validateFormData } from "@/utils/validate-form-data";
import { validationErrorData } from "@/utils/validation-error-data";
import type { User } from "@workspace/db";
import { UserSchema, type UserValidationType } from "@workspace/schemas";

interface UpdateUserResponse {
  user: User | undefined;
  success: boolean;
}

export const updateUser = async (
  formData: FormData,
): Promise<ActionResponse<User, "user", UserValidationType>> => {
  try {
    const jwtToken = await getCookie("jwt_token");

    const validation = validateFormData({ schema: UserSchema, formData });

    if (!validation.success) {
      return validationErrorData<UserValidationType>(validation.errors);
    }

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
    };

    const userId = formData.get("userId");

    const response = await fetchInstance<UpdateUserResponse>({
      path: `users/${userId}`,
      options: {
        headers: {
          Cookie: `jwt_token=${jwtToken}`,
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(data),
      },
    });

    if (response.data?.success) {
      revalidatePath("get-current-user");
    }

    return { user: response.data?.user, success: response.data?.success };
  } catch (error) {
    return errorData(error);
  }
};
