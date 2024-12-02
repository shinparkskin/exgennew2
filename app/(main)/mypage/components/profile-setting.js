"use client";

import * as React from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Icon } from "@iconify/react";
import { Button, Badge, Input, Spacer, Textarea } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
// import { animals } from "./data";

import { useState, useEffect } from "react";
import { createClient } from "../../../../utils/supabase/client";
import { cn } from "./cn";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export default function ProfileSetting() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bank, setBank] = useState("");
  const [userId, setUserId] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankList, setBankList] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [selectedImages, setSelectedImages] = useState([
    "/images/product/product-3.jpg",
  ]);
  const supabase = createClient();
  const router = useRouter();
  const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || "";
  const supabaseAdmin = createSupabaseClient(supabaseURL, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Error fetching user:", error);
    } else {
      console.log("User fetched successfully:", data);
      setUserId(data.user.id);
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
        setBank(profileData.bankaccountname);
        setAccountNumber(profileData.bankaccountno);
        setAvatarUrl(profileData.avatar_url);
      }
    }
  };

  const getBankList = async () => {
    const { data, error } = await supabase.from("bank").select("*");
    if (error) {
      console.error("Error fetching bank list:", error);
    } else {
      setBankList(data);
    }
  };

  useEffect(() => {
    getUser();
    getBankList();
  }, []);
  console.log(bankList);

  // Ensure bank state is set correctly
  useEffect(() => {
    console.log("bank:", bank);
  }, [bank]);

  const uploadImages = async () => {
    const file = document.getElementById("avatarInput").files[0];
    if (file) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);
      console.log("data:", data);
      if (error) {
        console.error("Error uploading avatar:", error);
        toast("프로필 수정 실패");
        return null;
      }
      const uploadUrl =
        "https://rxgvhikbaexklehfaurw.supabase.co/storage/v1/object/public/avatars/" +
        data.path;
      console.log("uploadUrl:", uploadUrl);
      return uploadUrl;
    }
    return null;
  };

  const handleSubmit = async () => {
    const uploadUrl = await uploadImages();
    console.log("uploadUrl:", uploadUrl);
    const updateData = {
      email: email,
      phone: phone,
      bankaccountname: bank,
      bankaccountno: accountNumber,
    };

    if (uploadUrl) {
      updateData.avatar_url = uploadUrl;
    }

    const { data, error } = await supabase
      .from("profiles")
      .update(updateData)
      .eq("nickname", nickname);

    if (error) {
      console.error("Error updating profile:", error);
      toast("프로필 수정 실패");
    } else {
      console.log("Profile updated successfully:", data);
      toast("프로필 수정 성공");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

      if (error) {
        console.error("Error deleting account:", error);
        toast("계정 탈퇴 실패");
        return;
      }

      toast("계정이 성공적으로 탈퇴되었습니다.");
      router.push("/login");
    } catch (error) {
      console.error("Error during account deletion:", error);
      toast("계정 탈퇴 중 오류가 발생했습니다.");
    }
  };
  console.log("userId:", userId);

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
        <div className="flex justify-between">
          <p className="text-base font-medium text-default-700">내 정보</p>
          <Button
            // onClick={handleDeleteAccount}
            onClick={onOpen}
            variant="light"
            size="md"
            className="text-red-500"
          >
            탈퇴하기
          </Button>
        </div>

        <Card className="mt-4 bg-default-100" shadow="none">
          <CardBody>
            <div className="flex items-center gap-4">
              <div>
                <div
                  onClick={() => document.getElementById("avatarInput").click()}
                  className="w-15 h-15 relative"
                >
                  <img
                    src={avatarUrl || "/images/logo-icon-2.png"}
                    className=" w-10 h-10 rounded-full cursor-pointer object-cover"
                    alt="Profile Avatar"
                  />
                </div>
                <input
                  id="avatarInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setAvatarUrl(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>

              <div>
                <p className="text-sm font-medium text-default-600">
                  {nickname}
                </p>
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
        <div className="grid grid-cols-1 ">
          <div className="col-span-1">
            <Select
              placeholder="은행명"
              className="w-full bg-gray-100 px-5 text-gray-500"
              onChange={(e) => setBank(e.target.value)}
              value={bank}
              selectedKeys={[bank]}
            >
              {bankList.map((bankItem) => (
                <SelectItem key={bankItem.bankname} value={bankItem.bankname}>
                  {bankItem.bankname}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="col-span-4">
            <Input
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="mt-2 text-gray-500"
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                탈퇴하기
              </ModalHeader>
              <ModalBody>
                <p>탈퇴하시면 모든 정보가 삭제되며, 복구할 수 없습니다.</p>
                <p>탈퇴하시겠습니까?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  취소
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    onClose();
                    handleDeleteAccount();
                  }}
                >
                  확인
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
