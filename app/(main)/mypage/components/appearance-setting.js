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
} from "@nextui-org/react";
import { createClient } from "@/utils/supabase/client";

export default function AppearanceSetting() {
  const [point, setPoint] = useState(10000);
  const [contact, setContact] = useState("010-1234-5678");
  const [bank, setBank] = useState("671-418-4848");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bankaccountname, setBankaccountname] = useState("");
  const [bankaccountno, setBankaccountno] = useState("");
  const [avatar_url, setAvatar_url] = useState("");
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
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="">
      <Spacer y={4} />
      {/* Title */}
      <div>
        <div className="flex items-center gap-x-5">
          <p className="text-base font-bold text-default-7000">내 포인트</p>
          <Button color="default" variant="bordered" size="sm">
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
            <TableColumn className=" text-center">날짜</TableColumn>
            <TableColumn className=" text-center">내용</TableColumn>
            <TableColumn className=" text-center">포인트</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell className="text-center">2024년8월12일</TableCell>
              <TableCell className="text-center">적립</TableCell>
              <TableCell className="text-center text-blue-500 font-bold">
                +200
              </TableCell>
            </TableRow>
            <TableRow key="1">
              <TableCell className="text-center">2024년8월11일</TableCell>
              <TableCell className="text-center">출금</TableCell>
              <TableCell className="text-center text-red-500 font-bold">
                -300
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <Spacer y={4} />
    </div>
  );
}
