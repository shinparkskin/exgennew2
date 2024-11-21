"use client";

import { useState } from "react";
import { Input, Checkbox, Link, Divider } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { AcmeIcon } from "./acme";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { createClient } from "../../../utils/supabase/client";
import { useRouter } from "next/navigation";
export default function Component() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [email, setEmail] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const supabase = createClient();

  const toggleVisibility = () => setIsVisible(!isVisible);
  const handleSend = async () => {
    setIsDisabled(true);
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    console.log(error);
    if (!error) {
      onOpen();
    }
  };
  const handleConfirm = async () => {
    router.push("/login");
    setIsDisabled(false);
  };
  
  return (
    <div className="h-full w-[80vw] md:w-[50vw] flex-col items-center justify-center">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                비밀번호 변경 메일 전송
              </ModalHeader>
              <ModalBody>
                <p>가입하신 메일로 비밀번호 변경 메일이 전송되었습니다.</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    onClose();
                    handleConfirm();
                  }}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="flex flex-col items-center justify-center h-screen w-full">
        <div className="flex flex-col items-center pb-6">
          <Image
            src="/images/logo-new.png"
            alt="logo"
            width={200}
            height={100}
          />
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
            <Button
              isDisabled={isDisabled}
              color="primary"
              type="button"
              onClick={handleSend}
            >
              비밀번호 찾기
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
    </div>
  );
}
