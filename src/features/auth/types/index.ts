type role = "user" | "admin";

export interface IAuthState {
  user: {
    email: string;
    role: role;
    profileURL?: string;
  };
  token: string | null;
}

export type AddUserFunc = (user: { username: string }, token: string) => void;
