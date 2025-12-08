"use client";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";
import Logo from "./images/auth_2.jpg";
import "./globals.css";
import { UserProvider } from "./context/UserContext";
import { useUserContext } from "./context/UserContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isDashboard = pathname.includes("/dashboard");
  const { isLoggedIn } = useUserContext();

  return (
    <html lang="en">
      <body className="bg-[#121416] p-0 w-full h-screen">
        <UserProvider>
          <div className="w-full h-full flex">
            {!isDashboard ? (
              <>
                <div
                  className={`w-full h-full image-bg bg-cover bg-center bg-[url(./images/auth_2.jpg)]`}
                ></div>
                <div className="w-full h-full bg-[#121416] flex items-center justify-center overflow-auto">
                  <div className="w-[90%] h-[90%] overflow-auto bg-[#121416] flex items-center justify-center rounded-2xl">
                    <div className="w-[70%] h-full ">{children}</div>
                  </div>
                  <Toaster></Toaster>
                </div>
              </>
            ) : (
              <div className="bg-[#121416] p-0 m-0 w-full overflow-y-auto h-full flex flex-col items-center justify-center body-cont">
                <div className="bg-[#121416] p-0 m-0 w-full h-full">{children}</div>
                <Toaster></Toaster>
              </div>
            )}
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
