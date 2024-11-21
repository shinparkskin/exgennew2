"use client";
import { useState, useEffect } from "react";
import { RadioGroup, Select, SelectItem } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/card";
import { Button, Badge, Input, Spacer, Textarea } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { cn } from "./cn";
import { ThemeCustomRadio } from "./theme-custom-radio";
import { Avatar } from "@nextui-org/avatar";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import { createClient } from "../../../../utils/supabase/client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyPoint() {
  const [point, setPoint] = useState(10000);
  const [contact, setContact] = useState("010-1234-5678");
  const [bank, setBank] = useState("671-418-4848");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bankaccountname, setBankaccountname] = useState("");
  const [bankaccountno, setBankaccountno] = useState("");
  const [avatar_url, setAvatar_url] = useState("");
  const [pointHistory, setPointHistory] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const rowsPerPage = 5;

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
        setBankaccountname(profileData.bankaccountname);
        setBankaccountno(profileData.bankaccountno);
        setAvatar_url(profileData.avatar_url);
      }
    }
  };

  const getMyPoint = async () => {
    // Fetch total points
    const { data: totalData, error: totalError } = await supabase
      .from("point")
      .select("point", { count: "exact" })
      .eq("email", email);

    if (totalError) {
      console.error("Error fetching total points:", totalError);
      return;
    }

    const totalPoints = totalData.reduce((acc, curr) => acc + curr.point, 0);
    setPoint(totalPoints);

    // Fetch paginated point history
    const { data, error, count } = await supabase
      .from("point")
      .select("*", { count: "exact" })
      .eq("email", email)
      .order("regiDate", { ascending: false })
      .range((page - 1) * rowsPerPage, page * rowsPerPage - 1);

    if (error) {
      console.error("Error fetching point history:", error);
    } else {
      setPointHistory(data);
      setTotalPage(Math.ceil(count / rowsPerPage));
    }
  };
  const handleWithdrawal = () => {
    if (point == 0) {
      toast.error("출금 신청 실패");
      return;
    }
    const withdrawPoints = async () => {
      const { data, error } = await supabase.from("point").insert([
        {
          email: email,
          point: -point,
          type: "인출",
          bankName:bankaccountname,
          bankAccountNo:bankaccountno,
        },
      ]);

      if (error) {
        console.error("Error requesting withdrawal:", error);
        toast("출금 신청 실패");
      } else {
        console.log("Withdrawal requested successfully:", data);
        toast("출금 신청 성공");
      }
    };

    withdrawPoints();
    getMyPoint();
  };

  useEffect(() => {
    getUser();
    getMyPoint();
  }, [email,page]);

  const requestWithdrawal = () => {
    if (point == 0) {
      toast.error("10,000원 이상 포인트 보유 시 출금 신청 가능합니다.");
      return;
    }
    onOpen();
  };

  return (
    <div className="">
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                출금신청
              </ModalHeader>
              <ModalBody className="flex flex-col gap-2">
                <p className="text-center">
                  <span className="font-bold text-red-600">{point}P</span>를
                  출금 신청 하시겠습니까?
                </p>
                <p className="text-center">계좌번호 : {bankaccountno}</p>
                <p className="text-center">예금주 :{bankaccountname}</p>
                <p>*익월 10일에 지급됩니다.</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  닫기
                </Button>
                <Button
                  onClick={handleWithdrawal}
                  color="primary"
                  onPress={onClose}
                >
                  확인
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Spacer y={4} />
      <div className="my-3 text-sm text-default-500">
        <p>
        포인트 지급 정책
        <p>* 이번달 출금신청하신 포인트는 다음달 10일 회원님의 계좌로 자동 지급됩니다. (원천징수 3.3%공제)</p>
        <p>예) 6/1~6/30일까지 출금신청한 포인트는 7/10일 지급(공휴일 등 예외시 공지)</p>
        <p>* 출금 신청은 10,000원 이상 포인트 보유 시 신청 가능합니다.</p>
        <p>* 약관 및 공지된 패널티 사항에 해당하는 경우, 포인트 환수 및 미지급 처리됩니다.</p>

        </p>
      </div>
      <div>
        <div className="flex items-center gap-x-5">
          <p className="text-base font-bold text-default-7000">내 포인트</p>
          <Button onPress={requestWithdrawal} color="default" variant="bordered" size="sm">
            출금신청
          </Button>
        </div>
        <Spacer y={4} />

        <Input
          className=""
          placeholder="내 포인트를 입력해주세요."
          readOnly
          value={point}
          onChange={(e) => setPoint(e.target.value)}
        />
      </div>
      <Spacer y={4} />
      <div>
        <p className="text-base font-bold text-default-7000">출금계좌</p>
        <Spacer y={4} />
        <Input
          className=""
          placeholder="출금계좌를 입력해주세요."
          value={bankaccountname}
          onChange={(e) => setBankaccountname(e.target.value)}
          readOnly
        />
        <Spacer y={4} />
        <Input
          className=""
          placeholder="출금계좌를 입력해주세요."
          value={bankaccountno}
          onChange={(e) => setBankaccountno(e.target.value)}
          readOnly
        />
      </div>
      <Spacer y={4} />
      {/* Biography */}
      <div>
        <p className="text-base font-bold text-default-7000">내역</p>
        <Spacer y={4} />

        <Table removeWrapper aria-label="Example static collection table">
          <TableHeader>
            <TableColumn className="w-1/4 text-center">날짜</TableColumn>
            <TableColumn className="w-1/4 text-center">내용</TableColumn>
            <TableColumn className="w-1/4 text-center">포인트</TableColumn>
            <TableColumn className="w-1/4 text-center">비고</TableColumn>
          </TableHeader>
          <TableBody>
            {pointHistory.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-center">
                  {new Date(item.regiDate).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </TableCell>
                <TableCell className="text-center">{item.type}</TableCell>
                <TableCell
                  className={`text-center font-bold ${
                    item.point > 0 ? "text-blue-500" : "text-red-500"
                  }`}
                >
                  {item.point}
                </TableCell>
                <TableCell className="text-center">
                  {item.type === "인출"
                    ? item.withdraw
                      ? "출금완료"
                      : "신청완료"
                    : item.withdraw}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={totalPage}
            onChange={(page) => setPage(page)}
          />
        </div>
      </div>
      <Spacer y={4} />
    </div>
  );
}
