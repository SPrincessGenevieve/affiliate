"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowRight, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Logo from "@/app/images/logo.png";
import { CalendarForm } from "@/app/components/CalendarComponent";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SpinnerIcon from "@/app/images/Spinner";
import { getCSRF } from "@/lib/services/getData";
import { postRegistration } from "@/lib/services/postData";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { format } from "date-fns";
import PhoneInput from "@/app/components/PhoneInput";

// 1. Define Zod schema
const formSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    middleName: z.string().min(1, 'Input "N/A" if not applicable'),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    password1: z.string().min(8, "Password must be at least 8 characters"),
    password2: z.string().min(8, "Confirm password is required"),
    birthDate: z.date({ required_error: "Birthdate is required" }),
  })
  .refine((data) => data.password1 === data.password2, {
    path: ["password2"],
    message: "Passwords do not match",
  });

type FormData = z.infer<typeof formSchema>;

export default function RegisterForm() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password1: "",
      password2: "",
      birthDate: undefined,
    },
  });

  const calculateAge = (birthDate: Date): number => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    // Adjust age if birthday hasn't occurred yet this year
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const birthDateValue = form.watch("birthDate");
  const age = birthDateValue ? calculateAge(birthDateValue) : 0;

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    if (age < 18) {
      toast.custom(
        (t) => (
          <div className="w-full max-w-md bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-lg shadow-lg p-4">
            <div className={`text-sm font-medium text-[red]`}>
              Age Requirement
            </div>
            <div className="text-sm text-justify text-gray-600 dark:text-gray-400 mt-1">
              You must be at least <b>18 years old</b> to register for this
              service.
            </div>
          </div>
        ),
        {
          duration: 3000,
        }
      );
      setLoading(false);
      return;
    }

    try {
      const responseCSRF = await getCSRF();
      const csrfToken = responseCSRF?.data?.csrfToken;
      const formattedBirthDate = data.birthDate
        ? format(data.birthDate, "yyyy-MM-dd")
        : null;

      const responseRegister = await postRegistration({
        email: data.email,
        password1: data.password1,
        password2: data.password2,
        first_name: data.firstName,
        middle_name: data.middleName || "", // optional
        last_name: data.lastName,
        birth_date: formattedBirthDate,
        phone_number: data.phoneNumber,
        csrfToken: csrfToken,
      });
      setSuccess(true);
      setOpen(true);
      setTimeout(() => {
        router.push("/auth/registration/check-email");
      }, 3000);
    } catch (error: any) {
      setError(true);
      setOpen(true);
      console.log(error);
      const errorMsg = error?.response?.data?.email[0];

      let errMsg = "";

      if (data.password1 !== data.password2) {
        errMsg = "Passwords do not match.";
      } else if (error.status === 400) {
        errMsg = errorMsg;
      } else {
        errMsg = "Something went wrong. Please try again";
      }

      toast.custom(
        (t) => (
          <div className="w-full max-w-md bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-lg shadow-lg p-4">
            <div className={`text-sm font-medium text-[red]`}>
              Registration Failed!
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {errMsg}
            </div>
          </div>
        ),
        {
          duration: 6000,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const navigateBackLogin = () => {
    setLoadingLogin(true);
    router.replace("/");
  };

  return (
    <div className="w-full h-full body-cont flex flex-col justify-evenly">
      <div className="w-full flex items-center justify-center p-4 ">
        <Image
          src={Logo}
          className="h-auto w-auto max-w-60"
          width={400}
          height={400}
          alt="logo"
        ></Image>
      </div>
      {success && (
        <>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Registration Successful</DialogTitle>
                <DialogDescription className="flex items-center gap-2">
                  <div className="h-full w-5 flex items-center">
                    <SpinnerIcon strokeColor="#2E5257"></SpinnerIcon>
                  </div>
                  Success! Your registration is confirmed. Redirecting...
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </>
      )}
      <Form {...form}>
        <form
          className="flex flex-col gap-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-2 gap-2 form-register-cont">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Middle Name (optional) */}
            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Birthdate */}
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Birthdate</FormLabel>
                  <FormControl>
                    <CalendarForm {...field} error={!!fieldState.error} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <PhoneInput {...field}></PhoneInput>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="password2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-[#2E5257]">
            {loading && <SpinnerIcon strokeColor="white"></SpinnerIcon>}Register{" "}
            <ArrowRight className="ml-2" />
          </Button>
        </form>
      </Form>
      <Button
        onClick={navigateBackLogin}
        variant={"ghost"}
        className="font-light p-0 text-left gap-2 flex items-center justify-center"
      >
        {loadingLogin && (
          <div className="w-5 h-full flex items-center">
            <SpinnerIcon strokeColor="#2E5257"></SpinnerIcon>
          </div>
        )}
        <ChevronLeft></ChevronLeft> Back to Login
      </Button>
    </div>
  );
}
