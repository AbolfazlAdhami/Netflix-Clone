import React from "react";
import { signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data: currentUser } = useCurrentUser();

  if (!visible) return null;

  return (
    <div className="bg-black w-60 absolute top-12 right-0 py-5 flex flex-col gap-4 border-2 border-gray-600">
      <div className="px-6 py-1 w-[95%]  mx-auto text-white text-start  duration-100 ">
        <img src="/images/default-red.png" alt="" />
        <p className="text-white text-sm group-hover/item:underline">{currentUser?.name}</p>
      </div>
    </div>
  );
};

export default AccountMenu;
