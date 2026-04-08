import { faker } from "@faker-js/faker";
import path from "path";
import { fileURLToPath } from "url";

export const generateUser = () => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const FIXTURES_PATH = path.join(__dirname, "..", "fixtures");
