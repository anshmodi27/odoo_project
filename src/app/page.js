"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
// import { authOptions } from "./api/auth/[...nextauth]";
import { useAtom } from "jotai";
import { userEmailAtom } from "./variable";

const Page = () => {
  // const { data: session } = useSession();

  // if (session) {
  //   redirect("/products");
  // } else {
  //   const session = getServerSession(authOptions);

  //   if (session) redirect("/products");
  // }

  // const session = getServerSession(authOptions);

  // if (session) redirect("/products");

  const [email, setEmail] = useAtom(userEmailAtom);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
  const [errorSignUp, setErrorSignUp] = useState("");
  const [successSignUp, setSuccessSignUp] = useState("");
  const [activeTab, setActiveTab] = useState("signin");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email) return setErrorLogin("Please enter your Email !!");
    if (!password) return setErrorLogin("Please enter your Password !!");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res.error) {
        setErrorLogin("Invalid Email or Password");
        return;
      }
      router.replace("/products");
    } catch (error) {}
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!name) return setErrorSignUp("Please enter your Name");
    if (!email) return setErrorSignUp("Please enter your Email");
    if (!password) return setErrorSignUp("Please enter your Password");

    try {
      const resUserExists = await fetch("/api/user-exists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setErrorSignUp("User already exists");
        return;
      }

      const res = await fetch("/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        setName("");
        setEmail("");
        setPassword("");
        setSuccessSignUp("User registration successful");
        setTimeout(() => {
          setSuccessSignUp("Redirecting to Sign In...");
        }, 1000);
        setTimeout(() => {
          setActiveTab("signin");
        }, 3000);
      } else {
        setErrorSignUp("User registration failed");
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Tabs
        defaultValue="signin"
        className="w-[400px]"
        onValueChange={setActiveTab}
        value={activeTab}
      >
        <TabsList>
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <form className={`bg-white shadow-md rounded px-8 pt-6 pb-4`}>
            {/* Login Form */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <Input
                type="email"
                placeholder="Enter Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <Button variant="outline" onClick={handleLogin}>
                Log In
              </Button>
            </div>
            {errorLogin && (
              <div className="mt-3">
                <p className="text-red-500 font-medium">* {errorLogin}</p>
              </div>
            )}
          </form>
        </TabsContent>
        <TabsContent value="signup">
          <form className={`bg-white shadow-md rounded px-8 pt-6 pb-4`}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <Input
                id="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <Button variant="outline" onClick={handleSignUp}>
                Sign Up
              </Button>
            </div>
            {errorSignUp && (
              <div className="mt-3">
                <p className="text-red-500 font-medium">* {errorSignUp} !!</p>
              </div>
            )}
            {successSignUp && (
              <div className="mt-3">
                <p className="text-green-500 font-medium">
                  * {successSignUp} !!
                </p>
              </div>
            )}
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
