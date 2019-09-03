export interface IUser {
  id: number;
  username: string;
  email: string;
}

export interface AuthContextProps { 
  loaded: boolean;
  currentUser: IUser | null;
};