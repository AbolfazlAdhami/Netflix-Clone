import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import useCurrentUser from "@/hooks/useCurrentUser";
import Image from "next/image";
interface UserCardProps {
  name: string;
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        parmanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
const images = ["/images/default-blue.png", "/images/default-green.png", "/images/default-red.png", "/images/default-slate.png"];

const UserCard: React.FC<UserCardProps> = ({ name }) => {
  const imgSrc = images[Math.floor(Math.random() * 4)];

  return (
    <div className="group flex gap-6 mx-auto ">
      <div className="w-fit h-fit rounded-md flex items-center transition-all ease-in duration-200 justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
        <Image src={imgSrc} width={75} height={75} alt="user_avatar" />
      </div>
      <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">{name}</div>
    </div>
  );
};

const Profile = () => {
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();
  const selectProfile = useCallback(() => router.push("/"), [router]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">Who&#39;s wtching?</h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div onClick={selectProfile}>
            <UserCard name={currentUser?.name} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
