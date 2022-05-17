export interface IAuthUser {
  username: string;
}

export interface IContext {
  user?: IAuthUser;
  onLogin: (username: string, password: string) => Promise<boolean>;
  onLogout: () => void;
}
