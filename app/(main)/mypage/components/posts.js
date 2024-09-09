"use client";
import { useState, useEffect } from "react";
import {
  Input,
  Chip,
  User,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tabs,
  Tab,
  Card,
  CardBody,
  Spinner,
  Pagination,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { ChevronDownIcon, SearchIcon } from "@nextui-org/shared-icons";
import { useAsyncList } from "@react-stately/data";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { RadioGroup, Radio } from "@nextui-org/react";

function queries() {
  const [datas, setDatas] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [queryId, setQueryId] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [nickname, setNickname] = useState("");
  const [postings, setPostings] = useState([]);

  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState("작성글");
  const supabase = createClient();

  const getDatas = async () => {
    const { data, error, count } = await supabase
      .from("queries")
      .select("*", { count: "exact" })
      .ilike("question", `%${search}%`)
      .eq("creator", nickname)
      .order("id", { ascending: false })
      .range(pageSize * (currentPage - 1), pageSize * currentPage - 1);
    if (error) {
      console.error("Error fetching queries:", error);
    } else {
      console.log("Queries fetched successfully:", data);
      setDatas(data);
      setTotalPages(Math.ceil(count / pageSize));
    }
  };

  const debounce = (func, delay) => {
    let debounceTimer;
    return function (...args) {
      const context = this;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const debouncedGetDatas = debounce(getDatas, 500);

  useEffect(() => {
    if (nickname) {
      debouncedGetDatas();
    }
  }, [currentPage, pageSize, search, nickname]);

  const getUser = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error("Error fetching user:", userError);
    } else {
      const userEmail = userData?.user?.email;

      if (userEmail) {
        const fetchData = async () => {
          const { data, error } = await supabase
            .rpc('fetch_combined_data')  // SQL을 함수로 등록하여 호출
            .select()
        
          if (error) {
            console.error('Error fetching data:', error)
            return
          }
        
          console.log('Fetched data:', data)
        }
      } else {
        console.error("No email found for the user.");
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  console.log("postings:", postings);

  return (
    <Card className={"border border-default-200 bg-transparent"} shadow="none">
      <CardBody>
        <div className="flex flex-col items-start justify-between gap-3">
          <RadioGroup
            orientation="horizontal"
            value={selected}
            onValueChange={setSelected}
          >
            <Radio checked value="작성글">
              작성글
            </Radio>
            <Radio value="댓글">댓글</Radio>
          </RadioGroup>
          <div className="flex w-full">
            <Input
              isClearable
              className="w-full"
              placeholder="검색어를 입력하세요"
              startContent={<SearchIcon />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="my-5">
          <Table removeWrapper aria-label="Example static collection table">
            <TableHeader className="flex">
              <TableColumn className=" text-center">제목</TableColumn>
              <TableColumn className=" text-center">작성일</TableColumn>
              <TableColumn className=" text-center">답변</TableColumn>
            </TableHeader>
            <TableBody>
              {datas.map((data, index) => (
                <TableRow
                  onClick={() => {
                    onOpen1();
                    getAnswer(data.id);
                  }}
                  className="cursor-pointer"
                  key={index}
                >
                  <TableCell className="text-center ">
                    <div className="whitespace-nowrap">{data.question}</div>
                  </TableCell>
                  <TableCell className="text-center whitespace-nowrap">
                    {new Date(data.regiDate).toLocaleString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-center">
                    {data.answer ? (
                      // <Button
                      //   color=""
                      //   variant="bordered"
                      //   size="sm"
                      //   onClick={() => {
                      //     onOpen1();
                      //     getAnswer(data.id);
                      //   }}
                      // >
                      //   답변보기
                      // </Button>
                      <p className="text-green-500 font-bold">답변완료</p>
                    ) : (
                      <p className="text-yellow-500 font-bold">확인중</p>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex w-full justify-center my-5">
            <Pagination
              total={totalPages}
              initialPage={currentPage}
              onChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default queries;
