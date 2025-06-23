import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { useUserContext } from "@/app/context/UserContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarForm } from "../CalendarComponent";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import PhoneInput from "../PhoneInput";
import { patchUser } from "@/lib/services/patchData";
import { getCSRF } from "@/lib/services/getData";
import { format } from "date-fns";
import SpinnerIcon from "@/app/images/Spinner";
import { Button } from "@/components/ui/button";
import UpdateEmail from "./Security/UpdateEmail";

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

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().min(1, 'Input "N/A" if not applicable'),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  birthDate: z
    .date({ required_error: "Birthdate is required" })
    .refine((date) => calculateAge(date) >= 18, {
      message: "You must be at least 18 years old",
    }),
  phoneNumber: z.string().min(1, "Phone number is required"),
  profilePicture: z.string().nullable().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function Profile() {
  const { setUserDetails, user_profile } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const formData = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user_profile.first_name,
      middleName: user_profile.middle_name,
      lastName: user_profile.last_name,
      email: user_profile.email,
      phoneNumber: user_profile.phone_number,
      birthDate: undefined,
      profilePicture: user_profile.profile_picture,
    },
  });

  useEffect(() => {
    if (user_profile && user_profile.email) {
      formData.reset({
        firstName: user_profile.first_name,
        middleName: user_profile.middle_name,
        lastName: user_profile.last_name,
        email: user_profile.email,
        phoneNumber: user_profile.phone_number,
        birthDate: user_profile.birth_date
          ? new Date(user_profile.birth_date)
          : undefined,
        profilePicture: null,
      });
    }
  }, [user_profile, formData]);

  const [isFailed, setIsFailed] = useState(false);

  const birthDateValue = formData.watch("birthDate");
  const age = birthDateValue ? calculateAge(birthDateValue) : 0;

  const handleUpdate = async (data: FormData) => {
    if (age < 18) {
      return;
    }
    setLoading(true);
    try {
      const responseCSRF = await getCSRF();
      const csrfToken = responseCSRF?.data?.csrfToken;
      const formattedBirthDate = data.birthDate
        ? format(data.birthDate, "yyyy-MM-dd")
        : null;
      const responseUpdate = await patchUser({
        first_name: data.firstName,
        middle_name: data.middleName,
        last_name: data.lastName,
        phone_number: data.phoneNumber,
        birth_date: formattedBirthDate,
        profile_picture: null,
        csrfToken: csrfToken,
      });

      setUserDetails({
        user_profile: responseUpdate.data,
      });
      setOpen(true);
      setIsFailed(false);
      setLoading(false);
    } catch (error: any) {
      setOpen(true);
      setIsFailed(true);
      const err = error.response.data.detail;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full gap-8 flex flex-col">
      <Form {...formData}>
        <form
          className="w-full gap-8 flex flex-col"
          onSubmit={formData.handleSubmit(handleUpdate)}
        >
          <div className="">
            <div className="mb-4 pb-2 border-b">
              <Label className="mb-4 text-neutral-400">
                PERSONAL INFORMATION
              </Label>
            </div>
            <div className="w-full max-w-[500px] gap-2 flex flex-col">
              {/* FIRST NAME */}
              <FormField
                control={formData.control}
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
              {/* MIDDLE NAME */}
              <FormField
                control={formData.control}
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
              {/* LAST NAME */}
              <FormField
                control={formData.control}
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
              {/* BIRTHDATE */}
              <FormField
                control={formData.control}
                name="birthDate"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Birthdate</FormLabel>
                    <FormControl>
                      <CalendarForm
                        value={field.value ? new Date(field.value) : undefined}
                        onChange={(date) => field.onChange(date)}
                        error={!!fieldState.error}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="">
            <div className="mb-4 pb-2 border-b">
              <Label className="mb-4 text-neutral-400">
                CONTACT INFORMATION
              </Label>
            </div>

            <div className="w-full max-w-[500px] gap-2 flex flex-col">
              {/* EMAIL */}
              <FormField
                control={formData.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="w-full relative flex items-center">
                        <Input disabled {...field} />
                        <Dialog>
                          <DialogTrigger className="p-2">
                            <Edit size={17}></Edit>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogTitle className="hidden"></DialogTitle>
                            <DialogDescription className="hidden"></DialogDescription>
                            <UpdateEmail></UpdateEmail>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              {/* PHONE NUMBER */}
              <FormField
                control={formData.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <PhoneInput
                        value={field.value}
                        onChange={field.onChange}
                        // onKeyDown={field.onKeyDown}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full flex justify-center items-center bg-[#2E5257] max-w-[500px] h-10 transition ease-in-out rounded-[9px] text-white hover:bg-[#192e31]"
          >
            <Label>
              {loading && (
                <div className="w-5">
                  <SpinnerIcon strokeColor="white"></SpinnerIcon>
                </div>
              )}
              <Edit size={15}></Edit>UPDATE INFORMATION
            </Label>
          </Button>
        </form>
      </Form>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle className={`${isFailed ? "text-red-500" : ""}`}>
            {isFailed ? "Update Failed" : "Profile Updated"}
          </DialogTitle>
          <DialogDescription>
            {isFailed
              ? "Something went wrong while saving your profile."
              : "Your profile information has been successfully updated."}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}
