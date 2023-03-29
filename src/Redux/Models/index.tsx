export interface UserModel {
  access_token: string;
  User: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

export interface AccountLogin {
  username: string;
  password: string;
}

export interface UserState {
  user: UserModel;
  accountLogin: AccountLogin;
  error: string | undefined;
  success: string | undefined;
}
