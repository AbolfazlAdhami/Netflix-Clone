import React, { useCallback, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Input from "@/components/Input";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/react";
const Auth = () => {
  const [variant, setVariant] = useState("login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const inputForm = [
    { id: "email", onChange: (e: any) => setEmail(e.target.value), value: email, label: "Email", type: "email" },
    { id: "name", onChange: (e: any) => setName(e.target.value), value: name, label: "User Name", type: "text" },
    { id: "password", onChange: (e: any) => setPassword(e.target.value), value: password, label: "Password", type: "password" },
  ];

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => (currentVariant == "login" ? "regester" : "login"));
  }, []);
  const login = useCallback(async () => {
    try {
      await signIn("credentials", { email, password, callbackUrl: "/", redirect: false });
      router.push("/profile");
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);
  const regester = useCallback(async () => {
    try {
      await axios.post("/api/regester", { email, name, password });
      login();
    } catch (err) {
      console.log(err);
    }
  }, [email, name, password, login]);

  return (
    <div className="relative w-full h-full  bg-[url('/images/hero.jpg')] bg-fixed bg-center bg-no-repeat bg-cover ">
      <div className="bg-black w-full h-full md:bg-opacity-50">
        <nav className=" px-12 py-3">
          <Image src="/images/logo.png" alt="logoImage" height={200} width={200} />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 p-14 self-center mt-1 md:w-3/5 lg:w-1/2 lg:max-w-md rounded-lg w-full">
            <h2 className="text-white text-3xl mb-8 font-semibold">{variant === "login" ? "Sing in" : "Regester"}</h2>
            <div className="flex flex-col gap-4">
              {inputForm.map((item, index) => (
                <div key={index}>{variant == "login" && item.id == "name" ? null : <Input key={item.id} {...item} />}</div>
              ))}
            </div>
            <button type="button" onClick={variant === "login" ? login : regester} className="bg-red-500 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition-all duration-75">
              {variant == "login" ? "Login" : "Sing up"}
            </button>
            <div className="flex flex-row justify-center items-center mt-6 gap-4">
              <div className="w-10 h-10 rounded-full bg-white flex justify-center items-center cursor-pointer hover:bg-opacity-70 transition-all duration-75">
                <FaGithub size={30} />
              </div>
              <div className="w-10 h-10 rounded-full bg-white flex justify-center items-center cursor-pointer hover:bg-opacity-70 transition-all duration-75">
                <FcGoogle size={30} />
              </div>
            </div>
            <p className="text-neutral-500 mt-8 ">
              {variant === "login" ? "Frist time to using Netflix?" : "Already have an cccount?"}
              <span className="text-white ml-1 hover:underline cursor-pointer" onClick={toggleVariant}>
                {variant === "login" ? "Create acctount" : "Login"}
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
