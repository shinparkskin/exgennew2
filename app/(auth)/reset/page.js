"use client";

import { useState, useEffect } from "react";
import { Input, Checkbox, Link, Divider } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { AcmeIcon } from "./acme";
import { createClient } from "../../../utils/supabase/client";
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

export default function Component({searchParams}) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const [registerCode, setRegisterCode] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("비밀번호 변경에 성공하였습니다.");

  const [isDisabled, setIsDisabled] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
        .from("profiles")
        .update({ nickname: nickname, email: email })
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

  const handleChange = async () => {
    // event.preventDefault(); // 폼 제출 기본 동작 방지

    if (password1 === password2) {
      if (password1.length <= 5) {
        setError("6자리 이상 비밀번호를 입력하세요");
      } else {
        console.log(searchParams.code);
        const response = supabase.auth.exchangeCodeForSession(
          searchParams.code
        );
        console.log(response);

        const { data, error } = await supabase.auth.updateUser({
          password: password2,
        });

        if (error) {
          setError("비밀번호 변경에 실패하였습니다. 다시 시도해주세요.");
        }
        onOpen();
      }
    } else {
      setError("비밀번호가 다릅니다.");
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
      <div className="mt-2 flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 py-6 shadow-small">
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">완료</ModalHeader>
                <ModalBody>
                  <p>{error}</p>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={() => {
                      onClose();
                      router.push("/");
                    }}
                  >
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <div className="flex flex-col gap-3">
          <h1 className="text-medium font-bold">비밀번호</h1>
          <Input
            label=""
            name="password"
            placeholder="비밀번호를 입력하세요"
            type={isVisible ? "text" : "password"}
            variant="bordered"
            onChange={(e) => setPassword1(e.target.value)}
            value={password1}
          />
          <h1 className="text-medium font-bold">비밀번호 확인</h1>
          <Input
            label=""
            name="password"
            placeholder="비밀번호를 입력하세요"
            type={isVisible ? "text" : "password"}
            variant="bordered"
            onChange={(e) => setPassword2(e.target.value)}
            value={password2}
          />
          <Button color="primary" type="submit" onClick={handleChange}>
            비밀번호변경
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
