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

import { createClient } from "@/utils/supabase/client";

export default function ProfileSetting() {
  const variant = "flat";
  const [page, setPage] = useState(1);
  const [userDatas, setUserDatas] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserPoint, setSelectedUserPoint] = useState(0);
  const [addPoint, setAddPoint] = useState(0);
  const [pointHistory, setPointHistory] = useState([]);
  const [pointHistoryPage, setPointHistoryPage] = useState(1);
  const [pointHistoryTotalPage, setPointHistoryTotalPage] = useState(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const supabase = createClient();
  const rowsPerPage = 5;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);

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
      console.log("data:", data);
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
      .insert({ point: addPoint, email: selectedUser, type: "add" });

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
      .order("created_at", { ascending: false })
      .range((pointHistoryPage - 1) * rowsPerPage, pointHistoryPage * rowsPerPage - 1);
    setPointHistory(data);
    setPointHistoryTotalPage(Math.ceil(count / rowsPerPage));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    getUserPoint();
    fetchPointHistory();
  }, [selectedUser, pointHistoryPage]);



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
                <p>계좌번호 : 농협 / 123-1230-23923 / 이중재</p>
                <p></p>
                <p></p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  출금취소
                </Button>
                <Button color="primary" onPress={onClose}>
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
          <AutocompleteItem
            key={item.id}
            // startContent={
            //   <Avatar
            //     alt="Country Flag"
            //     className="h-6 w-6"
            //     src={`https://flagcdn.com/${item.code.toLowerCase()}.svg`}
            //   />
            // }
            value={item.id}
          >
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
        {/* <Button color="danger" variant="light">
          감소
        </Button> */}
      </div>
      <Spacer y={4} />
      <p className="text-base font-medium text-default-700">히스토리</p>
      <Spacer y={4} />

      <Table
        aria-label="Example table with client side pagination "
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={pointHistoryPage}
              total={pages}
              onChange={(page) => setPointHistoryPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px] overflow-x-scroll",
        }}
      >
        <TableHeader>
          <TableColumn className="w-1/5 text-center" key="type">
            내용
          </TableColumn>
          <TableColumn className="w-1/5 text-center" key="point">
            증감
          </TableColumn>
          <TableColumn className="w-1/5 text-center" key="created_at">
            날짜
          </TableColumn>
          <TableColumn className="w-1/5 text-center" key="result">
            결과
          </TableColumn>
        </TableHeader>
        <TableBody items={pointHistory}>
          {(item) => (
            <TableRow className="" key={item.name}>
              {(columnKey) => (
                <TableCell style={{ textAlign: "center" }}>
                  {columnKey === "type" ? (
                    getKeyValue(item, columnKey) === "add" ? "적립" : "출금"
                  ) : columnKey === "created_at" ? (
                    new Date(getKeyValue(item, columnKey)).toLocaleDateString("ko-KR")
                  ) : columnKey === "result" ? (
                    getKeyValue(item, columnKey) ? (
                      <Button onClick={onOpen} variant="ghost">
                        {getKeyValue(item, columnKey)}
                      </Button>
                    ) : null
                  ) : (
                    getKeyValue(item, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
