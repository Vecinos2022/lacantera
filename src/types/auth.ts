export interface AuthSlice {
  loading: boolean;
  login: (user: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface session {
  uid: string;
  user: string;
}

export type AuthAction = "login" | "register";
