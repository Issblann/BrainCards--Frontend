interface User {
  email: string;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  message: string;
  picture?: string;
}

export interface UserLogged extends User {
  id: string;
}
export default User;
