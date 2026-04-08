import { resetDatabase } from "./fixtures/db-utils";

export default async () => {
  await resetDatabase();
};
