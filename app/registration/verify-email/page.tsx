// app/registration/verify-email/page.tsx
"use client";
import { Label } from "@/components/ui/label";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getCSRF } from "@/lib/services/getData";
import { postVerifyEmail } from "@/lib/services/postData";
import { useRouter } from "next/navigation";

export default function EmailVerified() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const verifyKey = searchParams.get("verify_key");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!verifyKey) return;

      try {
        const responseCSRF = await getCSRF();
        const csrfToken = responseCSRF?.data?.csrfToken;
        const response = await postVerifyEmail(verifyKey, csrfToken);
        if (response.status === 200) {
          setTimeout(() => {
            router.replace("/dashboard");
          }, 2000);
        }
      } catch (error) {
        console.error("Email verification failed:", error);
      }
    };

    verifyEmail();
  }, [verifyKey]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Label className="text-[25px]">Verification Complete</Label>
      <Label className="font-light">
        Your email address has been successfully verified.
      </Label>
      <div className="w-auto h-60">
        <DotLottieReact src="/verified_email.lottie" autoplay />
      </div>
      <Label>Redirecting to dashboard...</Label>
    </div>
  );
}
