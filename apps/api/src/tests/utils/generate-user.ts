import { faker } from "@faker-js/faker";

export const generateUser = () => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});
