import { GeistSans } from "geist/font/sans";
import Header from "./components/Header";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-[#F9FAFB] text-foreground w-full h-full">
        <main className="">
          <div id="wrapper" className="h-full">
            <Header></Header>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
