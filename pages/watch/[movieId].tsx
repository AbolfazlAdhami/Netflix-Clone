import React from "react";
import { useRouter } from "next/router";

const WatchPage = () => {
  const { query } = useRouter();
  console.log(query);
  return <></>;
};

export default WatchPage;
