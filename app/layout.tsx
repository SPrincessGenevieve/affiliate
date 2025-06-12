"use client";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";
import Logo from "./images/auth_2.jpg";
import "./globals.css";
import { UserProvider } from "./context/UserContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isDashboard = pathname.includes("/dashboard");

  return (
    <html lang="en">
      <body className="bg-[#F3F4F6] w-full h-full">
        <UserProvider>
          <div className="w-full h-full flex main-cont items-center justify-center">
            {!isDashboard && (
              <div
                className={`w-full h-screen image-bg bg-cover bg-center bg-[url(./images/auth_2.jpg)]`}
              />
            )}
            <div className="w-full h-screen flex flex-col items-center justify-center body-cont">
              {children}
              <Toaster></Toaster>
            </div>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
