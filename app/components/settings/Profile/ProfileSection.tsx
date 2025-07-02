"use client";
import { Label } from "@/components/ui/label";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/app/context/UserContext";
import { Edit, Save } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { getCroppedImg } from "@/lib/mock-data/utils/cropImage";
import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { getCSRF } from "@/lib/services/getData";
import { patchProfilePic } from "@/lib/services/patchData";
import SpinnerIcon from "@/app/images/Spinner";

export default function ProfileSection() {
  const { user_profile, setUserDetails } = useUserContext();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [response, setResponse] = useState(false);
  const [loading, setLoading] = useState(false);

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setCroppedImage(null); // ✅ reset previous crop
        setCrop({ x: 0, y: 0 }); // ✅ reset position
        setZoom(1); // ✅ reset zoom
        setCroppedAreaPixels(null); // ✅ reset cropped area
      };
    }
  };

  const showCroppedImage = async () => {
    try {
      const croppedImg = await getCroppedImg(imageSrc!, croppedAreaPixels);
      setCroppedImage(croppedImg as string);
    } catch (e) {
      console.error(e);
    }
  };

  function base64ToFile(base64: string, filename: string): File {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  const handleProfilePictureUpdate = async () => {
    if (!croppedImage) return;
    setLoading(true);

    try {
      const responseCSRF = await getCSRF();
      const csrfToken = responseCSRF?.data?.csrfToken;

      // Convert base64 to Blob
      const blob = await (await fetch(croppedImage)).blob();
      const file = new File([blob], "profile.jpg", { type: blob.type });

      // FormData containing ONLY profile_picture
      const formData = new FormData();
      formData.append("profile_picture", file);

      const response = await patchProfilePic(formData, csrfToken);

      console.log(response.data);

      setUserDetails({ user_profile: response.data });
      setImageSrc(null);
      setCroppedImage(null);
      setOpen(false);
      setResponse(true);
      setIsSuccess(true);
    } catch (err) {
      setResponse(true);
      setIsSuccess(false);
      console.error("Error updating profile picture:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col w-full items-center justify-center">
        <Label className="text-[14px] text-center w-full max-w-[200px]">
          {user_profile.first_name} {user_profile.middle_name}{" "}
          {user_profile.last_name}
        </Label>
        <Label className="text-[12px] text-gray-400 font-normal">
          {user_profile.email}
        </Label>
      </div>

      <div className="relative w-50 h-50 flex justify-center items-center">
        {user_profile.profile_picture === null ||
        user_profile.profile_picture === "" ? (
          <div className="w-100 h-100">
            <DotLottieReact src="/profile.lottie" autoplay />
          </div>
        ) : (
          <Image
            width={400}
            height={400}
            className="w-full max-w-50 max-h-50 h-full rounded-full shadow border"
            src={user_profile.profile_picture || ""}
            alt=""
          ></Image>
        )}

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <div className="cursor-pointer rounded-full absolute top-0 right-0">
              <Edit size={15}></Edit>
            </div>
          </DialogTrigger>
          <DialogContent className="space-y-4">
            <div className="flex flex-col gap-2">
              <DialogTitle>Update Profile Picture</DialogTitle>
              <DialogDescription>
                Choose a clear photo of yourself. PNG or JPG, max 5MB.
              </DialogDescription>
            </div>

            {imageSrc === null && croppedImage === null && (
              <div>
                <div className="w-auto h-70">
                  <DotLottieReact src="/profile.lottie" autoplay />
                </div>
              </div>
            )}
            {croppedImage && (
              <div className="w-full flex items-center justify-center">
                <div className="relative w-55 h-55 rounded-full overflow-hidden border">
                  <Image
                    src={croppedImage}
                    alt="Cropped"
                    fill
                    objectFit="cover"
                  />
                </div>
              </div>
            )}

            <Input type="file" accept="image/*" onChange={handleFileChange} />

            {imageSrc && !croppedImage && (
              <div className="relative w-full h-64 bg-black">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>
            )}

            {imageSrc && !croppedImage ? (
              <Button className="bg-[#2E5257]" onClick={showCroppedImage}>
                Crop & Preview
              </Button>
            ) : (
              <div className="flex items-center justify-center">
                <Button
                  onClick={handleProfilePictureUpdate}
                  disabled={croppedImage ? false : true}
                  className="bg-[#2E5257]"
                >
                  {loading && <SpinnerIcon strokeColor="white"></SpinnerIcon>}
                  <Save></Save>UPDATE PROFILE PICTURE
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <Label className="text-[14px]">{user_profile.level.name}</Label>
      </div>
      <Dialog open={response} onOpenChange={setResponse}>
        <DialogContent>
          <DialogTitle
            className={`${isSuccess ? "text-[#055E45]" : "text-[#8B1D24]"}`}
          >
            {isSuccess
              ? "Profile Picture Updated"
              : "Profile Picture Update Failed"}
          </DialogTitle>
          <DialogDescription>
            {isSuccess
              ? "Your profile picture has been changed successfully."
              : "Something went wrong while updating your profile picture. Please try again."}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}
