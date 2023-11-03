import { useSession } from "next-auth/react";

const Profile = () => {
  const { data } = useSession();
  console.log(data);
  return <h2 className="text-white">Profile</h2>;
};

export default Profile;
