"use client";

import { useState, useEffect } from "react";
import { Input, Link, Divider } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { AcmeIcon } from "./acme";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Checkbox } from "@nextui-org/checkbox";

export default function Component() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [registerCode, setRegisterCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [blog, setBlog] = useState("");
  const [naver, setNaver] = useState("");

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
    if (error.message.toLowerCase().includes("already")) {
      toast.error("이미 가입된 이메일입니다.");
      return;
    } else {
      console.log(data);
      const userId = data.user.id;
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          nickname: nickname,
          email: email,
          blog: blog,
          naver: naver,
        })
        .eq("id", userId);

      if (updateError) {
        console.error(updateError);
      } else {
        console.log("Nickname updated successfully");
      }
      router.push("/login?register=success");
    }
  };

  const handleRegisterCodeCheck = async () => {
    const { data, error } = await supabase
      .from("registerCode")
      .select("registerCode")
      .single();

    if (error) {
      console.error("Error fetching register code:", error);
      return;
    }

    if (data.registerCode === registerCode) {
      setIsDisabled(false);
      toast.success("가입코드가 일치합니다.");
    } else {
      toast.error("가입코드가 일치하지 않습니다.");
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
        <Image src="/images/logo-new.png" alt="logo" width={200} height={100} />
      </div>
      <div className="mt-2 flex w-full h-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 py-6 shadow-small">
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
          <h1 className="text-medium font-bold">블로그 주소</h1>
          <Input
            label=""
            name="nickname"
            placeholder="블로그주 소를 입력하세요"
            type="text"
            variant="bordered"
            onChange={(e) => setBlog(e.target.value)}
            value={blog}
          />
          <h1 className="text-medium font-bold">네이버아이디</h1>
          <Input
            label=""
            name="nickname"
            placeholder="네이버 아이디를 입력하세요"
            type="text"
            variant="bordered"
            onChange={(e) => setNaver(e.target.value)}
            value={naver}
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
          <div className="flex items-center gap-2">
            <Checkbox
              onChange={(e) => setIsDisabled(!e.target.checked)}
            >
              동의
            </Checkbox>{" "}
            <Link href="/agree" target="_blank">
              개인정보 이용 방침
            </Link>
          </div>

          <Button
            isDisabled={isDisabled}
            color="primary"
            type="submit"
            onClick={handleRegister}
          >
            회원가입
          </Button>
          <div className="w-full flex justify-center">
            <Link href="/login" size="sm" className="font-bold">
              로그인으로 이동
            </Link>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
