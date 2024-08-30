import { GeistSans } from "geist/font/sans";
import Header from "./components/Header";
import "./globals.css";
import Script from "next/script";
import RightSideBar from "./components/RightSideBar";
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
      <body className="bg-[#F9FAFB] text-foreground w-full h-full">
        <div id="wrapper" className="h-full">
          <Header></Header>
          <main
            id="site__main"
            class="2xl:ml-[--w-side]  xl:ml-[--w-side-sm] p-2.5 h-[calc(100vh-var(--m-top))] mt-[--m-top] "
          >
            <NextUIProvider>
              <div
                class="flex 2xl:gap-12 gap-10 bg-[#F9FAFB] justify-center items-start w-full"
                id="js-oversized"
              >
                {children}

                <RightSideBar></RightSideBar>
              </div>
            </NextUIProvider>
          </main>
        </div>

        <Script id="channel-io">
          {`
    (function(){var w=window;if(w.ChannelIO){return w.console.error("ChannelIO script included twice.");}var ch=function(){ch.c(arguments);};ch.q=[];ch.c=function(args){ch.q.push(args);};w.ChannelIO=ch;function l(){if(w.ChannelIOInitialized){return;}w.ChannelIOInitialized=true;var s=document.createElement("script");s.type="text/javascript";s.async=true;s.src="https://cdn.channel.io/plugin/ch-plugin-web.js";var x=document.getElementsByTagName("script")[0];if(x.parentNode){x.parentNode.insertBefore(s,x);}}if(document.readyState==="complete"){l();}else{w.addEventListener("DOMContentLoaded",l);w.addEventListener("load",l);}})();
    ChannelIO('boot', {
      "pluginKey": "353322d4-9a31-4897-852c-27a311cef74f",

    });
  `}
        </Script>

      </body>
    </html>
  );
}
