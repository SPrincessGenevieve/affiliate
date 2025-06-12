import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import QRCode from "react-qr-code";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface VerifyProps {
  onClick: () => void;
}

export default function AuthenticatorVerify({onClick} : VerifyProps) {
  const [success, setSuccess] = useState(false);
  const [hideError, setHideError] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="w-full flex flex-col gap-2">
      <div>
        <Label className="text-left text-[18px] font-normal">
          Set up two factor authentication (Required)
        </Label>
        <Label className="text-left font-light text-[14px]">
          Please scan the QR code and open it with either Google Authenticate or
          MS Authenticator.
        </Label>
        <br></br>
        <Label className="text-left font-light text-[14px]">
          You will be re-directed to Veriff to provide your ID verification
        </Label>
      </div>
      <div className="border rounded-xl py-8 flex items-center justify-center">
        <QRCode
          size={200}
          style={{ height: "100px", width: "auto" }}
          value={``}
          viewBox={`0 0 256 256`}
        />
      </div>
      <div>
        <Label className="text-center py-4 w-full flex justify-center items-center font-normal">
          {" "}
          Enter the 6 digit code
        </Label>
        <Input
          maxLength={6}
          id="token"
          name="token"
          placeholder="*** - ***"
          className="p-3 text-center"
        />
        <div className="w-full h-10 flex  flex-col">
          {hideError ? (
            <div>
              <Label className="text-[red] text-[12px]">{error}</Label>
            </div>
          ) : (
            <Label className="text-[red]"></Label>
          )}
          {success ? (
            <div>
              <Label className="text-[#2E5257] text-[12px]">
                TOTP verified successfully!
              </Label>
            </div>
          ) : (
            <Label className="text-[red]"></Label>
          )}
        </div>
        <Button onClick={onClick} className="w-full bg-[#2E5257]">Verify</Button>
      </div>
    </div>
  );
}
