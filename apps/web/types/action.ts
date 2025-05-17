import type { ErrorResponse } from "./error";
import type { typeToFlattenedError } from "zod";

type ActionMapped<T, K extends string = "data"> = {
  [key in K]?: T;
};

export interface ActionBase<T extends object> {
  success: boolean;
  zodErrors?: typeToFlattenedError<T>;
  error?: ErrorResponse;
}

export type ActionResponse<
  T,
  K extends string = "data",
  Z extends object = object,
> = ActionBase<Z> & ActionMapped<T, K>;
