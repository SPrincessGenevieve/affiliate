import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { CalendarForm } from "../CalendarComponent";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";

export default function Profile() {
  const [isFailed, setIsFailed] = useState(false);
  return (
    <div className="w-full py-4 gap-8 flex flex-col">
      <div className="">
        <div className="mb-4 pb-2 border-b">
          <Label className="mb-4 text-neutral-400">PERSONAL INFORMATION</Label>
        </div>
        <div className="w-full max-w-[500px] gap-2 flex flex-col">
          <div className="flex flex-col gap-2">
            <Label>First Name</Label>
            <Input></Input>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Middle Name</Label>
            <Input></Input>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Last Name</Label>
            <Input></Input>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Birthdate</Label>
            <CalendarForm></CalendarForm>
          </div>
        </div>
      </div>

      <div className="">
        <div className="mb-4 pb-2 border-b">
          <Label className="mb-4 text-neutral-400">CONTACT INFORMATION</Label>
        </div>
        <div className="w-full max-w-[500px] gap-2 flex flex-col">
          <div className="flex flex-col gap-2">
            <Label>Email</Label>
            <Input></Input>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Phone Number</Label>
            <Input></Input>
          </div>
        </div>
      </div>
      <Dialog>
        <DialogTrigger className="w-full flex justify-center items-center bg-[#2E5257] max-w-[500px] h-10 transition ease-in-out rounded-[9px] text-white hover:bg-[#192e31]">
          <Label>
            <Edit size={15}></Edit>UPDATE INFORMATION
          </Label>
        </DialogTrigger>
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
