"use client";

import { useState, useEffect } from "react";
import { Button, Input, Checkbox, Link, Divider } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { AcmeIcon } from "./acme";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";

export default function Component() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter();
  const supabase = createClient();

  const handleRegister = async () => {
    if (password !== passwordConfirm) {
      console.error("Passwords do not match");
      toast("비밀번호가 일치하지 않습니다.");

      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      console.error(error);
    } else {
      console.log(data);
      const userId = data.user.id;
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ nickname: nickname ,email: email})
        .eq('id', userId);

      if (updateError) {
        console.error(updateError);
      } else {
        console.log("Nickname updated successfully");
      }
      router.push("/login?register=success");
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
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
        <Image src="/images/logo.png" alt="logo" width={200} height={100} />
      </div>
      <div className="mt-2 flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 py-6 shadow-small">
        <div className="flex flex-col gap-3">
          <h1 className="text-medium font-bold">이메일</h1>
          <Input
            label=""
            name="email"
            placeholder="이메일을 입력하세요"
            type="email"
            variant="bordered"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <h1 className="text-medium font-bold">닉네임</h1>
          <Input
            label=""
            name="nickname"
            placeholder="닉네임을 입력하세요"
            type="text"
            variant="bordered"
            onChange={(e) => setNickname(e.target.value)}
            value={nickname}
          />

          <h1 className="text-medium font-bold">비밀번호</h1>
          <Input
            label=""
            name="password"
            placeholder="비밀번호를 입력하세요"
            type={isVisible ? "text" : "password"}
            variant="bordered"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <h1 className="text-medium font-bold">비밀번호 확인</h1>
          <Input
            label=""
            name="password"
            placeholder="비밀번호를 입력하세요"
            type={isVisible ? "text" : "password"}
            variant="bordered"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            value={passwordConfirm}
          />
          <Button color="primary" type="submit" onClick={handleRegister}>
            회원가입
          </Button>
          <div className="w-full flex justify-center">
            <Link href="/login" size="sm" className="font-bold">
              로그인으로 이동
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
