import { resetDatabase } from "../playwright/fixtures/db-utils";

export default async () => {
  await resetDatabase();
};
