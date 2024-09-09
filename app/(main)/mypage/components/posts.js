"use client";
import { useState, useEffect } from "react";
import { debounce } from "lodash"; // Add this import
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
import { useRouter } from "next/navigation";
function queries() {
  const [datas, setDatas] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [queryId, setQueryId] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [nickname, setNickname] = useState("");
  const [postings, setPostings] = useState([]);

  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState("작성글");
  const supabase = createClient();
  const router = useRouter();

  const getUser = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error("Error fetching user:", userError);
    } else {
      const userEmail = userData?.user?.email;

      if (userEmail) {
        const fetchData = async () => {
          const { data, error } = await supabase
            .rpc("fetch_combined_data") // SQL을 함수로 등록하여 호출
            .select();

          if (error) {
            console.error("Error fetching data:", error);
            return;
          }

          console.log("Fetched data:", data);
        };
      } else {
        console.error("No email found for the user.");
      }
    }
  };

  const getPostings = async () => {
    const { data, error } = await supabase.rpc("merge_tables_with_pagination3", {
      record_count: 10, // LIMIT
      page_offset: 0, // OFFSET
      search_keyword: search,
    });

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      console.log("Fetched data:", data);
      setPostings(data);
    }
  };

  const debouncedGetPostings = debounce(getPostings, 300); // Debounce with 300ms delay

  useEffect(() => {
    getUser();
    
  }, []);
  useEffect(() => {
    debouncedGetPostings();
    return () => {
      debouncedGetPostings.cancel(); // Cleanup on unmount
    };
  }, [search]);

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
              <TableColumn className="w-1/3 text-center">게시판</TableColumn>
              <TableColumn className="w-1/3 text-center">작성일</TableColumn>
              <TableColumn className="w-1/3 text-center">제목</TableColumn>
            </TableHeader>
            <TableBody>
              {postings.map((data, index) => (
                <TableRow
                  className="cursor-pointer"
                  onClick={() => {
                    if (data.category1 === null) {
                      router.push(`/boast/${data.id}`);
                    } else {
                      router.push(`/${data.category1}/${data.category2}/${data.id}`);
                    }
                  }}
                  key={index}
                >
                  <TableCell className="text-center ">
                    <div className="whitespace-nowrap">
                      {data.category2 === "boast" && "자랑하기"}
                      {data.category2 === "weeklynews" && "이번 주 소식"}
                      {data.category2 === "manager" && "매니저이야기"}
                      {data.category2 === "notification" && "공지사항"}
                      {data.category2 === "promotion" && "프로모션 이야기"}
                      {data.category2 === "introduction" && "회사소개"}
                      {data.category2 === "youtube" && "체험단시대 유튜브"}
                      {data.category2 === "realreview" && "리얼리뷰"}
                      {data.category2 === "thankyou" && "감사해요"}
                    </div>
                  </TableCell>
                  <TableCell className="text-center whitespace-nowrap">
                    {new Date(data.regiDate).toLocaleString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-center">
                    {data.title}
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
