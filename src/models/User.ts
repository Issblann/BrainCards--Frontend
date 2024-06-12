interface User {
  email: string;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  message: string;
}

export interface UserLogged extends User {
  token: string;
  id: string;
}
export default User;
