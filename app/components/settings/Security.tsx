"use client";
import SpinnerIcon from "@/app/images/Spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { getCSRF } from "@/lib/services/getData";
import { postChangePassword } from "@/lib/services/postData";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSquare, Smartphone } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    currentPass: z.string().min(8, "Current password is required"),
    password1: z.string().min(8, "Password must be at least 8 characters"),
    password2: z.string().min(8, "Confirm password is required"),
  })
  .refine((data) => data.password1 === data.password2, {
    path: ["password2"],
    message: "Passwords do not match",
  });

type FormData = z.infer<typeof formSchema>;

export default function Security() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [cofirmPassword, setConfirmPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPass: "",
      password1: "",
      password2: "",
    },
  });

  const handleUpdatePassword = async (data: FormData) => {
    setLoading(true);
    try {
      const responseCSRF = await getCSRF();
      const csrfToken = responseCSRF?.data?.csrfToken;
      const responseUpdate = await postChangePassword(
        data.currentPass,
        data.password1,
        data.password2,
        csrfToken
      );
      setOpen(true);
      setIsSuccess(true);
    } catch (error: any) {
      const err = error.response.data.new_password2;
      setOpen(true);
      setIsSuccess(false);
      setMessage(err);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center  justify-between">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle
              className={`${!isSuccess ? "text-[#8B1D24]" : "text-[#055E45]"}`}
            >
              {!isSuccess ? "Update Failed" : "Updated Password"}
            </DialogTitle>
            <DialogDescription>
              {isSuccess
                ? "Your password has been updated successfully."
                : message ||
                  "Please check your current password and try again."}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Form {...form}>
        <form
          className="w-full"
          onSubmit={form.handleSubmit(handleUpdatePassword)}
        >
          <div className="w-full max-w-[500px] gap-2 flex flex-col">
            <div className="mb-4 pb-2 border-b flex justify-between items-center settings-cont-2 gap-2">
              <Label className=" text-neutral-400">UPDATE PASSWORD</Label>
            </div>
            <FormField
              control={form.control}
              name="currentPass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Re-enter Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full my-4">
              <Button
                type="submit"
                className="max-w-[500px] w-full bg-[#2E5257]"
              >
                {loading && <SpinnerIcon strokeColor="white"></SpinnerIcon>}{" "}
                CHANGE PASSWORD
              </Button>
            </div>
          </div>
        </form>
      </Form>

      <div className="w-full h-full flex flex-col mt-8">
        <div className="mb-4 pb-4 border-b flex justify-between items-center">
          <Label className=" text-neutral-400 uppercase">
            Two-factor authentication
          </Label>
        </div>
        <div className="w-full gap-4 flex flex-col">
          <div className="min-h-20 gap-2 cursor-pointer hover:bg-neutral-100 transition ease-in-out w-full flex justify-between items-center  rounded-2xl px-4">
            <div className="flex gap-2">
              <div>
                <Smartphone size={30}></Smartphone>
              </div>
              <div>
                <Label className="cursor-pointer">Authenticator App</Label>
                <Label className="cursor-pointer text-[12px] text-neutral-500 font-normal">
                  Use a code from Google Authenticator or Authy to secure your
                  account.
                </Label>
              </div>
            </div>
            <div className="cursor-pointer border h-9 flex w-auto min-w-20 justify-center items-center twofa-cont rounded-full border-[#2E5257] text-[#2E5257]">
              <Switch id="airplane-mode" className="toggle-switch hidden" />
              <Label className="toggle-label" htmlFor="airplane-mode">
                Enable
              </Label>
            </div>
          </div>

          <div className="min-h-20 gap-2 cursor-pointer hover:bg-neutral-100 transition ease-in-out w-full flex justify-between items-center  rounded-2xl px-4">
            <div className="flex gap-2">
              <div>
                <MessageSquare size={30}></MessageSquare>
              </div>
              <div>
                <Label className="cursor-pointer">SMS/Text message</Label>
                <Label className="cursor-pointer text-[12px] text-neutral-500 font-normal">
                  Get a one-time passcode sent to your mobile number to verify
                  your identity and secure your account.
                </Label>
              </div>
            </div>
            <div className="cursor-pointer border h-9 flex w-auto min-w-20 justify-center items-center twofa-cont rounded-full border-[#2E5257] text-[#2E5257]">
              <Switch id="airplane-mode" className="toggle-switch hidden" />
              <Label className="toggle-label" htmlFor="airplane-mode">
                Enable
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
