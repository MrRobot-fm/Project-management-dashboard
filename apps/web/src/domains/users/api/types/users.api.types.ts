export interface ApiGetCurrentUserResponseModel {
  user: User;
  success: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  logo: string;
  createdAt: Date;
  updatedAt: Date;
}
