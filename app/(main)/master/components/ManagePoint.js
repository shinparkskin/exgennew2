"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Icon } from "@iconify/react";
import { Button, Badge, Input, Spacer, Textarea } from "@nextui-org/react";
import { ChevronDownIcon, SearchIcon } from "@nextui-org/shared-icons";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import countries from "./countries";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

import { users } from "./data";
import { cn } from "./cn";

import { createClient } from "../../../../utils/supabase/client";

export default function ProfileSetting() {
  const variant = "flat";
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [userDatas, setUserDatas] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserPoint, setSelectedUserPoint] = useState(0);
  const [addPoint, setAddPoint] = useState(0);
  const [pointHistory, setPointHistory] = useState([]);
  const [bankName, setBankName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [withdrawPoint, setWithdrawPoint] = useState(0);
  const [withdrawPointId, setWithdrawPointId] = useState(0);
  

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const supabase = createClient();
  const rowsPerPage = 5;

  const fetchUsers = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from("profiles").select("*");
    setUserDatas(data);
  };

  const getUserPoint = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("point")
      .select("*")
      .eq("email", selectedUser);
    if (data) {
      const totalPoints = data.reduce((acc, curr) => acc + curr.point, 0);
      setSelectedUserPoint(totalPoints);
    }
  };

  const handleAddPoint = async () => {
    if (!selectedUser) {
      toast.error("아이디를 선택하세요.");
      return;
    }
    const { data, error } = await supabase
      .from("point")
      .insert({ point: addPoint, email: selectedUser, type: "적립" });

    if (!error) {
      getUserPoint();
      fetchPointHistory();
      toast("포인트가 적립되었습니다.");
    } else {
      toast("포인트 적립에 실패했습니다.");
    }
  };

  const fetchPointHistory = async () => {
    const supabase = createClient();
    const { data, error, count } = await supabase
      .from("point")
      .select("*", { count: "exact" })
      .eq("email", selectedUser)
      .order("regiDate", { ascending: false })
      .range((page - 1) * rowsPerPage, page * rowsPerPage - 1);
    if (data) {
      setPointHistory(data);
      setTotalPage(Math.ceil(count / rowsPerPage));
    }
  };
  const changeWithdrawPoint = async () => {
    const { data, error } = await supabase
      .from("point")
      .update({ withdraw: true })
      .eq("id", withdrawPointId);
    if (!error) {
      fetchPointHistory();
      toast("출금 처리 완료 완료");
    }
  };

  useEffect(() => {
    fetchUsers();
    setPage(1); // Ensure pagination starts at page 1
  }, []);

  useEffect(() => {
    getUserPoint();
    fetchPointHistory();
  }, [selectedUser, page]);

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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">내용</ModalHeader>
              <ModalBody>
                <p>계좌번호 : {bankName} / {bankAccountNumber}</p>
                <p>출금 금액 : {Math.abs(withdrawPoint)}</p>
                <p></p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  출금취소
                </Button>
                <Button color="primary" onPress={()=>{changeWithdrawPoint(); onClose();}}>
                  출금완료
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <p className="text-base font-medium text-default-700">아이디</p>
      <Spacer y={4} />

      <Autocomplete
        isRequired
        defaultItems={userDatas}
        label=""
        labelPlacement="outside"
        placeholder="아이디를 선택하세요"
        showScrollIndicators={false}
        variant={variant}
        onSelectionChange={(selected) => {
          const selectedItem = userDatas.find((item) => item.id === selected);
          setSelectedUser(selectedItem ? selectedItem.email : "");
        }}
      >
        {(item) => (
          <AutocompleteItem key={item.id} value={item.id}>
            {item.email}
          </AutocompleteItem>
        )}
      </Autocomplete>
      <Spacer y={4} />
      <p className="text-base font-medium text-default-700">보유 포인트</p>
      <Spacer y={4} />

      <Input
        type="email"
        placeholder="0"
        value={selectedUserPoint}
        isDisabled
      />
      <Spacer y={4} />
      <p className="text-base font-medium text-default-700">포인트 증감</p>
      <div className="grid grid-cols-5 gap-x-5">
        <Input
          className="col-span-4"
          type="number"
          step="100"
          placeholder="증감할 포인트를 입력하세요"
          onChange={(e) => setAddPoint(e.target.value)}
          value={addPoint}
        />
        <Button onClick={handleAddPoint} className="col-span-1" color="primary">
          적립
        </Button>
      </div>
      <Spacer y={4} />
      <p className="text-base font-medium text-default-700">히스토리</p>
      <Spacer y={4} />
      <Table
        bottomContent={
          <div className="flex justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              total={totalPage}
              page={page} // Ensure pagination reflects the current page state
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        removeWrapper
        aria-label="Example static collection table"
      >
        <TableHeader>
          <TableColumn className="w-1/4 text-center">날짜</TableColumn>
          <TableColumn className="w-1/4 text-center">증감</TableColumn>
          <TableColumn className="w-1/4 text-center">내용</TableColumn>
          <TableColumn className="w-1/4 text-center">결과</TableColumn>
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
              <TableCell
                className={`text-center font-bold ${
                  item.point > 0 ? "text-blue-500 font-bold" : "text-red-500 font-bold"
                }`}
              >
                {item.point}
              </TableCell>
              <TableCell className="text-center">{item.type}</TableCell>
              <TableCell className="text-center">
                {item.type === "인출" ? (
                  item.withdraw ? (
                    <span onClick={() => {setWithdrawPointId(item.id); setWithdrawPoint(item.point); setBankName(item.bankName); setBankAccountNumber(item.bankAccountNo); onOpen(); }} className="text-blue-500 font-bold cursor-pointer">출금완료</span>
                  ) : (
                    <span onClick={() => {setWithdrawPointId(item.id); setWithdrawPoint(item.point); setBankName(item.bankName); setBankAccountNumber(item.bankAccountNo); onOpen(); }} className="text-yellow-500 font-bold cursor-pointer">출금대기</span>
                  )
                ) : ""}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
