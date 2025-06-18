"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React, { useState } from "react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCSRF } from "@/lib/services/getData";
import { postUpdatePassword } from "@/lib/services/postData";
import SpinnerIcon from "../images/Spinner";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const formSchema = z
  .object({
    new_password1: z.string().min(8, "Password must be at least 8 characters"),
    new_password2: z.string().min(8, "Confirm password is required"),
  })
  .refine((data) => data.new_password1 === data.new_password2, {
    path: ["new_password1"],
    message: "Passwords do not match",
  });

type FormData = z.infer<typeof formSchema>;

export default function ResetPassword() {
  const [message, setMessage] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      new_password1: "",
      new_password2: "",
    },
  });

  const navigateBackLogin = () => {
    setLoadingLogin(true);
    router.push("/");
  };

  const updatePassword = async (data: FormData) => {
    setLoading(true);
    if (
      data.new_password1 !== data.new_password2 ||
      !data.new_password1 ||
      !data.new_password2
    ) {
      setLoading(false);
      return;
    }

    try {
      const responseCSRF = await getCSRF();
      const csrfToken = responseCSRF?.data?.csrfToken;
      const responseUpdatePassword = await postUpdatePassword(
        data.new_password1,
        data.new_password2,
        csrfToken
      );
      setMessage("Password changed successfully! Redirecting to Login...");
      setIsUpdated(true);
      toast.custom(
        (t) => (
          <div className="w-full max-w-md bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-lg shadow-lg p-4">
            <div className={`text-sm font-medium text-green-600`}>
              Password Changed Successfully!
            </div>
            <div className={`text-sm text-gray-600 dark:text-gray-400 mt-1`}>
              You can now log in with your new credentials.
            </div>
          </div>
        ),
        {
          duration: 5000,
        }
      );
    } catch (error: any) {
      console.log(error);
      const messageError = error?.response?.data;
      toast.custom(
        (t) => (
          <div className="w-full max-w-md bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-lg shadow-lg p-4">
            <div className={`text-sm font-medium text-red-600`}>
              Registration Failed!
            </div>
            <div className={`text-sm text-gray-600 dark:text-gray-400 mt-1`}>
              Something went wrong. Please try again later.
            </div>
          </div>
        ),
        {
          duration: 5000,
        }
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="gap-2 flex flex-col justify-center items-center">
        <Label className="text-[25px] text-center">Create new password</Label>
        <Label className="font-light text-center">
          Use at least 8 characters. Re-enter to confirm.
        </Label>
      </div>
      <div className="w-full h-auto">
        <DotLottieReact src="/password.lottie" autoplay loop />
      </div>
      <Form {...form}>
        <form className="w-full" onSubmit={form.handleSubmit(updatePassword)}>
          <div className="flex flex-col gap-2 w-full">
            <FormField
              control={form.control}
              name="new_password1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field}></Input>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="new_password2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field}></Input>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            ></FormField>

            <Button type="submit" className="bg-[#2E5257] mt-4">
              {loading && <SpinnerIcon strokeColor="white"></SpinnerIcon>}
              Reset Password
            </Button>
            <Link
              href={"/"}
              onClick={() => setLoadingLogin(true)}
              className="font-light text-[14px] p-0 mt-4 text-left gap-2 flex items-center justify-center"
            >
              {loadingLogin && (
                <div className="w-5 h-full flex items-center">
                  <SpinnerIcon strokeColor="#2E5257"></SpinnerIcon>
                </div>
              )}
              <ChevronLeft></ChevronLeft> Back to Login
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
