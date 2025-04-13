interface CreateUserResponse {
  user: {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
  };
  success: boolean;
}

declare namespace Cypress {
  interface Chainable {
    createUser(userData: {
      name: string;
      email: string;
      password: string;
    }): Chainable<Cypress.Response<CreateUserResponse>>;

    createUserAndLogin(user: {
      name: string;
      email: string;
      password: string;
    }): Chainable<CreateUserResponse>;

    deleteCurrentUser(user: {
      email: string;
      password: string;
    }): Chainable<Cypress.Response<void>>;

    logout(): Chainable<void>;
  }
}
