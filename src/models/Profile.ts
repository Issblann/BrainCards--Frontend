interface Profile {
  id: string;
  userId: string;
  name: string;
  lastName: string;
  username: string;
  bio: string;
  image?: string | File | Blob;
  updatedAt: string;
}

export default Profile;
