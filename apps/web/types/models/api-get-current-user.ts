export interface ApiGetCurrentUserResponseModel {
  user: User;
  success: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  logo: string;
}
