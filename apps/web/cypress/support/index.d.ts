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

    deleteCurrentUser(user: { email: string; password: string }): Chainable<Cypress.Response<void>>;

    logout(): Chainable<void>;
    createWorkspace(name: string): Chainable<void>;
    editWorkspace(name: string): Chainable<void>;
    deleteCurrentWorkspace(): Chainable<void>;

    createProject(name: string, description: string): Chainable<void>;
    editProject(name: string, description: string, existingName): Chainable<void>;
    deleteProject(name: string): Chainable<void>;
  }
}
