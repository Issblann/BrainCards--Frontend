interface Profile {
  id: string;
  userId: string;
  name: string;
  lastName: string;
  username: string;
  bio: string;
  // email: string; // fix email on backend
  image?: string;
  updatedAt: string;
}
export default Profile;
