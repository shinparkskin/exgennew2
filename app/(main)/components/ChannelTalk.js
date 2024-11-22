"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import Script from "next/script";
function ChannelTalk() {
  return (
    <div>
      <Script id="channel-io">
        {`
          (function(){var w=window;if(w.ChannelIO){return w.console.error("ChannelIO script included twice.");}var ch=function(){ch.c(arguments);};ch.q=[];ch.c=function(args){ch.q.push(args);};w.ChannelIO=ch;function l(){if(w.ChannelIOInitialized){return;}w.ChannelIOInitialized=true;var s=document.createElement("script");s.type="text/javascript";s.async=true;s.src="https://cdn.channel.io/plugin/ch-plugin-web.js";var x=document.getElementsByTagName("script")[0];if(x.parentNode){x.parentNode.insertBefore(s,x);}}if(document.readyState==="complete"){l();}else{w.addEventListener("DOMContentLoaded",l);w.addEventListener("load",l);}})();
          ChannelIO('boot', {
            "pluginKey": "353322d4-9a31-4897-852c-27a311cef74f",
            "customLauncherSelector": ".custom-button-1",
            "hideDefaultLauncher": true
          });
        `}
      </Script>
      <div className="custom-button-1 z-50 fixed bottom-16 right-2 w-20 h-20">
        <button>
          <img
            src="/images/channeltalk/channeltalk.png"
            alt="Channel Talk"
            className="object-cover"
          />
        </button>
      </div>
    </div>
  );
}

export default ChannelTalk;
