"use client";

import SpinnerIcon from "@/app/images/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCSRF } from "@/lib/services/getData";
import { postResetEmail } from "@/lib/services/postData";
import React, { useEffect, useState } from "react";
import { useUserContext } from "@/app/context/UserContext";
import { putConfirmEmailChange } from "@/lib/services/putData";

export default function UpdateEmail() {
  const [isVerifiedContent, setIsVerifiedContent] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [verifLoading, setVerifLoading] = useState(false);
  const [sendCodeLoading, setSendCodeLoading] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [emailIsBlank, setEmailIsBlank] = useState<boolean | null>(null);
  const [codeIsBlank, setCodeIsBlank] = useState<boolean | null>(null);

  const { setUserDetails, user_profile } = useUserContext();

  const handleVerif = async () => {
    setSendCodeLoading(true);

    if (newEmail === "") {
      setEmailIsBlank(true);
      setSendCodeLoading(false);
      setError("This field is required");
      return;
    }

    try {
      setEmailIsBlank(false);
      setError("");
      const responseCSRF = getCSRF();
      console.log(responseCSRF);
      const csrfToken = (await responseCSRF).data.csrfToken;
      const emailResponse = postResetEmail(newEmail, csrfToken);
      if ((await emailResponse).status === 200) {
        setIsVerifiedContent(true);
      }
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.email[0]);
    } finally {
      setSendCodeLoading(false);
    }
  };

  const handleVerifEmail = async () => {
    setVerifLoading(true);

    if (newEmail === "") {
      setCodeIsBlank(true);
      setVerifLoading(false);
      setError("This field is required");
      return;
    }
    try {
      setCodeIsBlank(false);
      setError("");
      const responseCSRF = getCSRF();
      console.log(responseCSRF);
      const csrfToken = (await responseCSRF).data.csrfToken;
      const emailVerifResponse = putConfirmEmailChange(
        code,
        newEmail,
        csrfToken
      );
      if ((await emailVerifResponse).status === 200) {
        setIsSuccess(true);
        setTimeout(() => {
          location.reload();
        }, 3000);
      }
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.detail);
      // setError(error.response.data.new_email);
    } finally {
      setVerifLoading(false);
    }
  };

  console.log("ERROR: ", error);

  return (
    <div className="flex flex-col gap-4">
      {isSuccess ? (
        <>
          <h2 className="text-lg font-semibold">Email Updated Successfully</h2>
          <p className="text-sm text-muted-foreground">
            Your email address has been changed and saved.
          </p>
        </>
      ) : (
        <>
          {isVerifiedContent ? (
            <>
              <h2 className="text-lg font-semibold">Enter Verification Code</h2>
              <p className="text-sm text-muted-foreground">
                Type the code we sent to your current email.
              </p>
              <Label className="font-normal">New Email Address</Label>
              <Input
                disabled
                className={`${
                  emailIsBlank === true ? "border border-red-700" : ""
                }`}
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <Label className="font-normal">Input Code</Label>
              <Input
                className={`${
                  codeIsBlank === true ? "border border-red-700" : ""
                }`}
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <Label className="text-red-700">{error}</Label>
              <Button onClick={handleVerifEmail}>
                {verifLoading && (
                  <SpinnerIcon strokeColor="white"></SpinnerIcon>
                )}
                Verify Current Email
              </Button>
            </>
          ) : (
            <>
              <h2 className="text-lg font-semibold">
                Verify Your Current Email
              </h2>
              <p className="text-sm text-muted-foreground">
                A verification code will be sent to your current email address..
              </p>
              <Label className="font-normal">New Email Address</Label>
              <Input
                className={`${
                  emailIsBlank === true ? "border border-red-700" : ""
                }`}
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <Label className="text-red-700">{error}</Label>
              <Button onClick={handleVerif}>
                {sendCodeLoading && (
                  <SpinnerIcon strokeColor="white"></SpinnerIcon>
                )}
                Send Verification Code
              </Button>
            </>
          )}
        </>
      )}
    </div>
  );
}
