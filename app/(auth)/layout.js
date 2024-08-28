import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Script from "next/script";
import { NextUIProvider } from "@nextui-org/react";
import { headers } from "next/headers";

export const metadata = {
  title: "체험단시대",
  description: "공생마케팅의 체험단시대 커뮤니티입니다.",
  icons: {
    icon: "/images/logo-mobile.png",
  },
};

export default function RootLayout({ children }) {
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "";

  if (pathname === "/login") {
    return <>{children}</>;
  }
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-[#F9FAFB] w-[100vw] h-[100vh] justify-center items-center flex">
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}
