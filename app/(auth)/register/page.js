"use client";
import { initializeApp } from "firebase/app";
import { useState, useEffect } from "react";
import { Input, Link, Divider } from "@nextui-org/react";
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
import { Checkbox } from "@nextui-org/checkbox";
import { getMessaging, getToken } from "firebase/messaging";




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
  const [fcmToken, setFcmToken] = useState(null);



  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter();
  const supabase = createClient();

  // useEffect를 사용하여 콜백 등록 및 정리
  useEffect(() => {
    // 콜백 함수 등록
    window.onFcmInfoSuccess = (token) => {
      console.log("FCM Token received:", token);
      // toast.info(`원본 FCM 토큰: ${token}`);
      setFcmToken(token);
    };

    // 클린업 함수
    return () => {
      window.onFcmInfoSuccess = null;
    };
  }, []); // 빈 의존성 배열로 마운트 시에만 실행

  const requestFcmToken = () => {
    return new Promise((resolve) => {
      const userAgent = navigator.userAgent;
      // toast.info(`UserAgent: ${userAgent}`);
      
      if (!userAgent.includes("Mom-playground_AOS_APP") && 
          !userAgent.includes("mom-playground_IOS_APP")) {
        console.log("Not a mobile app environment");
        setFcmToken(null);
        resolve(null);
        return;
      }

      // 먼저 콜백 함수를 설정
      const newCallback = (token) => {
        resolve(token);
      };
      window.onFcmInfoSuccess = newCallback;

      // 그 다음 토큰 요청
      try {
        if (userAgent.includes("Mom-playground_AOS_APP")) {
          
          window.momPlayground.getFcmInfo();
          // toast.info("FCM 토큰 요청 중...구글");
        } else {
          window.webkit.messageHandlers.getFcmInfo.postMessage('');
          // toast.info("FCM 토큰 요청 중...애플");
        }
      } catch (error) {
        console.error("Error requesting FCM token:", error);
        toast.error("FCM 토큰 요청 중 오류 발생");
        resolve(null);
      }
    });
  };

  const handleRegister = async () => {
    if (password !== passwordConfirm) {
      console.error("Passwords do not match");
      toast("비밀번호가 일치하지 않습니다.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    try {
      // FCM 토큰이 없는 경우에만 요청하고 응답을 기다림
      let currentFcmToken = fcmToken;
      if (!currentFcmToken) {
        currentFcmToken = await requestFcmToken();
      }
      
      // FCM 토큰이 없어도 계속 진행
      // toast.success("FCM 토큰:" + currentFcmToken);
      
      // Supabase 회원가입 진행
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error?.message.toLowerCase().includes("already")) {
        toast.error("이미 가입된 이메일입니다.");
        return;
      }

      // 프로필 정보와 FCM 토큰 저장
      const userId = data.user.id;
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          nickname,
          email,
          blog,
          naver,
          fcmToken: currentFcmToken, // 로컬 변수 사용
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);

      if (updateError) {
        console.error("Profile update error:", updateError);
        toast.error("프로필 업데이트 중 오류가 발생했습니다.");
        return;
      }

      router.push("/login?register=success");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("회원가입 중 오류가 발생했습니다.");
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
    <div className="h-full w-[80vw] md:w-[50vw] flex-col items-center justify-center pb-10">
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
      <div className="mt-2 flex w-full h-full flex-col gap-4 rounded-large bg-content1 px-8 py-6 shadow-small">
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
            <Checkbox onChange={(e) => setIsDisabled(!e.target.checked)}>
              동의
            </Checkbox>{" "}
            {/* <Link href="/agree" target="_blank">
              개인정보 이용 방침
            </Link> */}
            <Button variant="light" color="primary" onClick={onOpen}>
              개인정보 이용 방침
            </Button>
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
                <h1 className="font-bold text-xl">개인정보처리방침</h1>
              </ModalHeader>
              <ModalBody>
                <div className="w-full h-[50vh] overflow-y-scroll">
                  <p>
                    본 사이트는 귀하의 개인정보보호를 매우 중요시하며,
                    『정보통신망이용촉진등에관한법률』상의 개인정보보호 규정 및
                    정보통신부가 제정한 『개인정보보호지침』을 준수하고
                    있습니다.
                  </p>
                  <p>본 방침은 2024년 09월 01일부터 시행합니다.</p>

                  <h2>제1조 총칙</h2>
                  <p>
                    본 사이트는 개인정보보호방침을 통해 귀하께서 제공하시는
                    개인정보가 어떠한 용도와 방식으로 이용되고 있으며
                    개인정보보호를 위해 어떠한 조치가 취해지고 있는지
                    알려드립니다. 개인정보보호방침은 홈페이지 첫 화면 하단에
                    공개합니다.
                  </p>

                  <h2>제2조 개인정보 수집에 대한 동의</h2>
                  <p>
                    귀하께서는 본 사이트의 개인정보보호방침 또는 이용약관의
                    내용에 대해 동의 여부를 선택할 수 있습니다. 「동의한다」
                    버튼을 클릭하면 개인정보 수집에 동의한 것으로 봅니다.
                  </p>

                  <h2>제3조 개인정보의 수집 및 이용목적</h2>
                  <ul>
                    <li>서비스 제공을 위한 계약의 성립</li>
                    <li>서비스 이행 (수익금 정산, 지급 및 세금신고 등)</li>
                    <li>회원 관리</li>
                    <li>새로운 서비스, 이벤트 정보 안내</li>
                  </ul>
                  <p>단, 민감한 개인정보는 수집하지 않습니다.</p>

                  <h2>제4조 수집하는 개인정보 항목</h2>
                  <ul>
                    <li>
                      수집항목: 이름, 생년월일, 성별, 로그인ID, 비밀번호,
                      전화번호 등
                    </li>
                    <li>수집방법: 홈페이지(회원가입)</li>
                  </ul>

                  <h2>제5조 개인정보 자동수집 장치</h2>
                  <p>
                    쿠키를 사용하여 사용자 접속 정보를 저장 및 분석합니다. 쿠키
                    설정은 웹 브라우저 옵션에서 변경 가능합니다.
                  </p>

                  <h2>제6조 목적 외 사용 및 제3자 제공</h2>
                  <p>
                    귀하의 개인정보를 제3자에게 제공하거나 공유하기 전에 사전
                    동의를 구합니. 단, 법령에 따른 경우는 예외입니다.
                  </p>

                  <h2>제7조 인정보의 열람 및 정정</h2>
                  <p>
                    귀하는 언제든지 개인정보를 열람, 정정할 수 있으며 오류 정정
                    요청 시 처리 완료 전까지 개인정보를 이용하지 않습니다.
                  </p>

                  <h2>제8조 개정보 수집, 이용, 제공에 대한 동의 철회</h2>
                  <p>동의 철회는 "마이페이지" 또는 이메일을 통해 가능합니다.</p>

                  <h2>제9조 개인정보의 보유 및 이용기간</h2>
                  <p>
                    원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는
                    파기합니다. 단, 관련 법령에 따라 일정 기간 보존합니다.
                  </p>

                  <h2>제10조 개인정보의 파기절차 및 방법</h2>
                  <p>
                    수집된 개인정보는 목적 달성 후 별도 DB로 이동 후 파기됩니다.
                  </p>

                  <h2>제11조 아동의 개인정보 보호</h2>
                  <p>
                    만14세 미만 아동의 개인정보 수집 시 법정대리인의 동의를
                    받습니다.
                  </p>

                  <h2>제12조 개인정보 보호를 위한 기술적 대책</h2>
                  <p>
                    암호화, 백신프로그램, 방화벽 등의 보안 대책을 마련하여
                    개인정보를 보호합니다.
                  </p>

                  <h2>제13조 개인정보의 위탁처리</h2>
                  <p>
                    서비스 향상을 위해 개인정보를 외부에 위탁 처리할 수 있으며,
                    사전에 고지 후 동의를 구합니다.
                  </p>

                  <h2>제14조 개인정보 관��� 책임자</h2>
                  <ul>
                    <li>책임자 성명: 신주원</li>
                    <li>전화번호: 010-9932-3659</li>
                  </ul>
                  <p>기타 개인정보 침해신고는 아래 기관에 문의하십시오:</p>
                  <ul>
                    <li>
                      개인정보 침해신고센터: 국번 없이 118 (
                      <a href="https://privacy.kisa.or.kr" target="_blank">
                        privacy.kisa.or.kr
                      </a>
                      )
                    </li>
                    <li>
                      경찰청 사이버안전국: 국번 없이 182 (
                      <a
                        href="https://cyberbureau.police.go.kr"
                        target="_blank"
                      >
                        cyberbureau.police.go.kr
                      </a>
                      )
                    </li>
                  </ul>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
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
