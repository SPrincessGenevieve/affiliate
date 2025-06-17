"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import "@/app/globals.css";
import Logo from "@/app/images/logo.png";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import SpinnerIcon from "@/app/images/Spinner";
import { postLogin } from "@/lib/services/postData";
import { getCSRF } from "@/lib/services/getData";
import { toast } from "sonner";
import { useUserContext } from "@/app/context/UserContext";

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingForgotPass, setLoadingForgotPass] = useState(false);
  const { setUserDetails } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const responseCSRF = await getCSRF();
      const csrfToken = responseCSRF?.data?.csrfToken;
      const responseLogin = await postLogin(email, password, csrfToken);
      setSuccess("Successfully logged in.");
      setUserDetails({
        isLoggedIn: true,
      });
      SuccessLogin(router);
    } catch (err: any) {
      const nonFieldErrors = err?.response?.data?.non_field_errors[0];
      setError(nonFieldErrors || "Invalid email or password");
      toast.custom(
        (t) => (
          <div className="w-full max-w-md bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-lg shadow-lg p-4">
            <div className={`text-sm font-medium text-[red]`}>
              Login Failed!
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {nonFieldErrors || "Unable to log in with provided credentials."}
            </div>
          </div>
        ),
        {
          duration: 3000, // prevents auto-close
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
      router.push("/dashboard");
    }, 2000);
  };

  const handleForgotPassword = () => {
    setLoadingForgotPass(true);
    router.push("/auth/forgot-password");
  };

  return (
    <div className="flex flex-col justify-center w-full max-w-[600px] h-full">
      <div className=" w-full h-30 flex items-center justify-center">
        <Image
          src={Logo}
          className="h-auto w-auto max-w-60"
          width={400}
          height={400}
          alt="logo"
        ></Image>
      </div>
      <div className="flex flex-col gap-4 h-auto mt-5 p-4">
        <div className="flex flex-col gap-2">
          <Label className="font-normal">Email</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-normal">Password</Label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          ></Input>
        </div>
        <div>
          <Button
            variant={"ghost"}
            onClick={handleForgotPassword}
            className="font-light p-0 text-left gap-2 flex items-center justify-center"
          >
            {loadingForgotPass && (
              <div className="w-5 h-full flex items-center">
                <SpinnerIcon strokeColor="#2E5257"></SpinnerIcon>
              </div>
            )}
            Forgot Password?
          </Button>
        </div>

        <Button onClick={handleSignIn} className="bg-[#2E5257]">
          {loading && <SpinnerIcon strokeColor="white"></SpinnerIcon>} Login{" "}
          <ArrowRight></ArrowRight>
        </Button>
        <Link href={"/auth/registration"} className="font-light text-center">
          You do not have an account yet? Create an account here.
        </Link>
      </div>
    </div>
  );
}
