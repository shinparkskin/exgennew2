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
  const toggleVisibility = () => setIsVisible(!isVisible);
  const supabase = createClient();

  const handleLogin = async () => {
    console.log('123123')
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error(error);
      toast.error(error.message);
    } else {
      console.log("data:",data);
      router.push("/");
    }
  };
  const router = useRouter();
  const searchParams = useSearchParams();
  const registerSuccess = searchParams.get("register");
  console.log(email, password);

  useEffect(() => {
    if (registerSuccess === "success") {
      toast("회원가입이 완료되었습니다.");
    }
  }, []);

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
          <Button onClick={handleLogin} color="primary" type="button">
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
