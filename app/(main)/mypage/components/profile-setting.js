"use client";

import * as React from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Icon } from "@iconify/react";
import { Button, Badge, Input, Spacer, Textarea } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { cn } from "./cn";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProfileSetting() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const supabase = createClient();

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Error fetching user:", error);
    } else {
      console.log("User fetched successfully:", data);
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();
      if (profileError) {
        console.error("Error fetching profile:", profileError);
      } else {
        console.log(profileData);
        setNickname(profileData.nickname);
        setEmail(profileData.email);
        setPhone(profileData.phone);
        setBank(profileData.bank);
        setAccountNumber(profileData.accountNumber);
        setAvatarUrl(profileData.avatar_url);
      }
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .update({
        email: email,
        phone: phone,
        bankaccountname: bank,
        bankaccountno: accountNumber,
      })
      .eq("nickname", nickname);

    if (error) {
      console.error("Error updating profile:", error);
      toast("프로필 수정 실패");
    } else {
      console.log("Profile updated successfully:", data);
      toast("프로필 수정 성공");
    }
  };

  return (
    <div className="p2">
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
      <div>
        <p className="text-base font-medium text-default-700">내 정보</p>
        <p className="mt-1 text-sm font-normal text-default-400"></p>
        <Card className="mt-4 bg-default-100" shadow="none">
          <CardBody>
            <div className="flex items-center gap-4">
              <Badge
                disableOutline
                classNames={{
                  badge: "w-5 h-5",
                }}
                content={
                  <Button
                    isIconOnly
                    className="h-5 w-5 min-w-5 bg-background p-0 text-default-500"
                    radius="full"
                    size="sm"
                    variant="bordered"
                  >
                    <Icon className="h-[9px] w-[9px]" icon="solar:pen-linear" />
                  </Button>
                }
                placement="bottom-right"
                shape="circle"
              >
                <Avatar
                  className="h-16 w-16"
                  src="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatars/e1b8ec120710c09589a12c0004f85825.jpg"
                />
              </Badge>
              <div>
                <p className="text-sm font-medium text-default-600">이중재</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <Spacer y={4} />
      {/* Title */}
      <div>
        <p className="text-base font-medium text-default-700">이메일</p>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2"
          placeholder="이메일 주소를 입력해주세요."
        />
      </div>
      <Spacer y={2} />
      {/* Location */}
      <div>
        <p className="text-base font-medium text-default-700">연락처</p>
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-2"
          placeholder="연락처를 입력해주세요."
        />
      </div>
      <Spacer y={4} />
      <div>
        <p className="text-base font-medium text-default-700">출금계좌</p>
        <div className="grid grid-cols-5">
          <div className="col-span-1">
            <Input
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              className="mt-2"
              placeholder="은행명"
            />
          </div>
          <div className="col-span-4">
            <Input
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="mt-2"
              placeholder="계좌번호"
            />
          </div>
        </div>
      </div>
      <Spacer y={4} />
      {/* Biography */}

      <Button onClick={handleSubmit} color="primary" size="sm">
        수정
      </Button>
    </div>
  );
}
