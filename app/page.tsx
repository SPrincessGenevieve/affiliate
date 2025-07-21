"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import "@/app/globals.css";
import Logo from "@/app/images/logo.png";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import SpinnerIcon from "./images/Spinner";
import { postLogin } from "@/lib/services/postData";
import { toast } from "sonner";
import { useUserContext } from "./context/UserContext";
import { getUser } from "@/lib/services/getData";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setUserDetails } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const responseLogin = await postLogin(email, password);
      setSuccess("Successfully logged in.");

      const responseAffiliateUser = await getUser(responseLogin.data.key);
      setUserDetails({
        isLoggedIn: true,
        sessionkey: responseLogin.data.key,
        user_profile: responseAffiliateUser.data.detail,
      });
      SuccessLogin(router);
    } catch (err: any) {
      const nonFieldErrors = err?.response?.data?.non_field_errors[0];
      const errorFallout = err?.message;
      setError(nonFieldErrors || "Invalid email or password");
      toast.custom(
        (t) => (
          <div className="w-full max-w-md bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-lg shadow-lg p-4">
            <div className={`text-sm font-medium text-[red]`}>
              Login Failed!
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {nonFieldErrors ||
                errorFallout ||
                "Unable to log in with provided credentials."}
            </div>
          </div>
        ),
        {
          duration: 6000, // prevents auto-close
        }
      );
      console.error("Login error:", err);
      setUserDetails({
        isLoggedIn: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const SuccessLogin = (router: ReturnType<typeof useRouter>) => {
    toast.custom(() => (
      <div className="w-full max-w-md bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-lg shadow-lg p-4">
        <div className="text-sm font-medium text-[#2E5257]">
          Logged in successfully!
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Welcome back! Redirecting to your dashboard...
        </div>
      </div>
    ));

    // Redirect after a delay to let the toast show
    setTimeout(() => {
      router.replace("/dashboard");
    }, 500);
  };

  return (
    <div className="flex flex-col justify-center  h-full">
      <div className=" w-full h-30 flex items-center justify-center">
        <Image
          src={Logo}
          className="h-auto w-auto max-w-60"
          width={400}
          height={400}
          alt="logo"
        ></Image>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignIn();
        }}
        className="flex flex-col gap-4 h-auto mt-5 p-4"
      >
        <div className="flex flex-col gap-2">
          <Label className="font-normal">Email</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="font-normal">Password</Label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </div>

        <div></div>

        <Button type="submit" className="bg-[#2E5257]">
          {loading && <SpinnerIcon strokeColor="white" />} Login <ArrowRight />
        </Button>
      </form>
    </div>
  );
}
