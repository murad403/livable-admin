export interface TUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  image?: string | null;
  is_admin: boolean;
  client_id?: number | null;
}

export interface TSignInResponse {
  access: string;
  refresh: string;
  user: TUser;
}

export interface TSignInInput {
  email: string;
  password: string;
}

export interface TChangePasswordInput {
  current_password: string;
  new_password: string;
  confirm_new_password: string;
}

export interface TChangePasswordResponse {
  detail: string;
}
