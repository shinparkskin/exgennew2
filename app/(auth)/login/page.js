"use client";

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Input, Checkbox,Divider,Link } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { AcmeIcon } from "./acme";
import { createClient } from "../../../utils/supabase/client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";


export default function Component() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fcmToken, setFcmToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const registerSuccess = searchParams.get("register");
  console.log(email, password);

  useEffect(() => {
    if (registerSuccess === "success") {
      toast("회원가입이 완료되었습니다.");
    }
  }, []);

  useEffect(() => {
    window.onFcmInfoSuccess = (token) => {
      console.log("FCM Token received:", token);
      setFcmToken(token);
    };

    return () => {
      window.onFcmInfoSuccess = null;
    };
  }, []);

  const requestFcmToken = () => {
    return new Promise((resolve) => {
      const userAgent = navigator.userAgent;
      
      if (!userAgent.includes("Mom-playground_AOS_APP") && 
          !userAgent.includes("mom-playground_IOS_APP")) {
        setFcmToken(null);
        resolve(null);
        return;
      }

      const newCallback = (token) => {
        resolve(token);
      };
      window.onFcmInfoSuccess = newCallback;

      try {
        if (userAgent.includes("Mom-playground_AOS_APP")) {
          window.momPlayground.getFcmInfo();
        } else {
          window.webkit.messageHandlers.getFcmInfo.postMessage('');
        }
      } catch (error) {
        console.error("Error requesting FCM token:", error);
        resolve(null);
      }
    });
  };

  const handleLogin = async () => {
    try {
      let currentFcmToken = fcmToken;
      if (!currentFcmToken) {
        currentFcmToken = await requestFcmToken();
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error(error);
        toast.error(error.message);
        return;
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          fcmToken: currentFcmToken,
          updated_at: new Date().toISOString(),
        })
        .eq("id", data.user.id);

      if (updateError) {
        console.error("FCM token update error:", updateError);
      }

      setIsLoading(true);
      router.push("/");
    } catch (error) {
      setIsLoading(true);
      console.error("Login error:", error);
      toast.error("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex h-screen w-[80vw] md:w-[50vw] flex-col items-center justify-center">
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex flex-col items-center pb-6">
        <Link href="/">
          <Image src="/images/logo-new.png" alt="logo" width={200} height={100} />
        </Link>
      </div>
      <div className="mt-2 flex w-full flex-col gap-4 rounded-large bg-content1 px-8 py-6 shadow-small">
        <div className="flex flex-col gap-3">
          <h1 className="text-medium font-bold">이메일</h1>
          <Input
            label=""
            name="email"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h1 className="text-medium font-bold">비밀번호</h1>
          <Input
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label=""
            name="password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center justify-between px-1 py-2">
            <Link className="font-bold" href="/forgot-password" size="sm">
              비밀번호 찾기
            </Link>
          </div>
          <Button isLoading={isLoading} onClick={handleLogin} color="primary" type="button">
            로그인
          </Button>
        </div>
        <div className="flex justify-center items-center gap-x-2">
          <div className="text-center text-small">계정이 없으신가요?</div>
          <Link href="/register" size="sm" className="font-bold">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
