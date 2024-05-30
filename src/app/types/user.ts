export interface User {
  username: string;
  email: string;
  google: boolean;
  avatar: string;
  uid: string;
  token: string;
  refresh: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface LoginPayload {
  usernameOrEmail: string;
  password: string;
}
