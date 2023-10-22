import React, { useCallback, useState } from "react";
import Image from "next/image";
import Input from "@/components/Input";

const Auth = () => {
  const [variant, setVariant] = useState("login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const inputForm = [
    { id: "email", onChange: (e: any) => setEmail(e.target.value), value: email, label: "Email", type: "email" },
    { id: "name", onChange: (e: any) => setName(e.target.value), value: name, label: "User Name", type: "text" },
    { id: "password", onChange: (e: any) => setPassword(e.target.value), value: password, label: "Password", type: "password" },
  ];

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => (currentVariant == "login" ? "regester" : "login"));
  }, []);

  return (
    <div className="relative w-full  h-full bg-[url('/images/hero.jpg')] bg-fixed bg-center bg-no-repeat bg-cover ">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className=" px-12 py-6">
          <Image src="/images/logo.png" alt="logoImage" height={200} width={200} />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-80 p-14 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-3xl mb-8 font-semibold">{variant === "login" ? "Sing in" : "Regester"}</h2>
            <div className="flex flex-col gap-4">
              {inputForm.map((item) => (
                <>{variant == "login" && item.id == "name" ? null : <Input key={item.id} {...item} />}</>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
