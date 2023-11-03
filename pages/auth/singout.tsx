import React, { useEffect } from "react";
import { signOut } from "next-auth/react";

function singout() {
  const logOut = () => signOut();

  return (
    <div onClick={logOut} className="text-white">
      {" "}
      Singout Page
    </div>
  );
}

export default singout;
