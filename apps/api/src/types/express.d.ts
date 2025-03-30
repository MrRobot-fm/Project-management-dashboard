import type { User } from "@workspace/db";

declare module "express" {
  export interface Request {
    user?: User;
  }
}
