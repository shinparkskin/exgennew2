"use client";

import React from "react";
import { Button, Input, Checkbox, Link, Divider } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { AcmeIcon } from "./acme";

export default function Component() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center pb-6">
        <Image src="/images/logo-new.png" alt="logo" width={200} height={100} />
      </div>
      <div className="mt-2 flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 py-6 shadow-small">
        <div className="flex flex-col gap-3">
          <h1 className="text-medium font-bold">이메일</h1>
          <Input
            label=""
            name="email"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
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
          />

          <div className="flex items-center justify-between px-1 py-2">
            <Link className="font-bold" href="/forgot-password" size="sm">
              비밀번호 찾기
            </Link>
          </div>
          <Button color="primary" type="submit">
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
