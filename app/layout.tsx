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
      <body className="bg-[#F3F4F6] w-full h-screen">
        <UserProvider>
          <div className="w-full h-full flex">
            {!isDashboard ? (
              <>
                <div
                  className={`w-full h-full image-bg bg-cover bg-center bg-[url(./images/auth_2.jpg)]`}
                ></div>
                <div className="w-full h-full bg-[#F3F4F6] flex items-center justify-center overflow-auto">
                  <div className="w-[90%] h-[90%] overflow-auto bg-[white] flex items-center justify-center rounded-2xl">
                    <div className="w-[70%] h-full ">{children}</div>
                  </div>
                  <Toaster></Toaster>
                </div>
              </>
            ) : (
              <div className="w-full overflow-y-auto h-full flex flex-col items-center justify-center body-cont">
                {children}
                <Toaster></Toaster>
              </div>
            )}
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
