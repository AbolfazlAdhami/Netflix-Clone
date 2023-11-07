import React from "react";
import { signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import singout from "@/pages/auth/singout";

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data: currentUser } = useCurrentUser();

  if (!visible) return null;

  return (
    <div className="bg-black w-60 absolute top-12 right-0 py-5 px-4 flex flex-col gap-4 border-2 rounded-md border-gray-600">
      <div className=" py-1 w-[95%] flex gap-4 items-center justify-start  mx-auto text-white text-start  duration-100 ">
        <img src="/images/default-red.png" className="w-8 rounded-sm" alt="" />
        <p className="text-white text-sm group-hover/item:underline">{currentUser?.name}</p>
      </div>
      <hr className="bg-gray-600 border-0 h-px  " />
      <div onClick={() => singout()} className="text-start px-3 text-white text-sm hover:underline">
        Sing out of Netflix
      </div>
    </div>
  );
};

export default AccountMenu;
