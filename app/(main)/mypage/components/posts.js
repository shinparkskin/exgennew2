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
import { createClient } from "../../../../utils/supabase/client";
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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState("작성글");
  const supabase = createClient();
  const router = useRouter();

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Error fetching user:", error);
    } else {
      console.log("data:",data);
      setEmail(data.user.email);
    }
  };


  const getPostings = async (selectedValue) => {
    console.log("selectedValue:",selectedValue);
    if (selectedValue === "작성글") {
      const { data, error } = await supabase.rpc(
        "merge_tables_with_pagination5",
        {
          
          record_count: pageSize, // LIMIT
          page_offset: (currentPage - 1) * pageSize, // OFFSET
          search_keyword: search,
          input_email: email,
        }
      );

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        console.log("Fetched data:", data);
        setPostings(data.postings);
        setTotalPages(Math.ceil(data.count / pageSize));
      }
    } else{
      console.log("댓글모드");
      let query = supabase
        .from("reply")
        .select("*", { count: "exact" })
        .eq("email", email)
        .order("regiDate", { ascending: false });

      if (search) {
        query = query.ilike("title", `%${search}%`);
      }

      const { data, error, count } = await query;

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        console.log("Fetched data:", data);
        setPostings(data);
        setTotalPages(Math.ceil(count / pageSize));
      }
    }
  };

  
  const debouncedGetPostings = debounce(getPostings, 300); // Debounce with 300ms delay

  useEffect(() => {
    getUser();
    
  }, []);

  useEffect(() => {
    if (email) {
      debouncedGetPostings(selected);
    }
  }, [email, selected]);

  useEffect(() => {
    debouncedGetPostings(selected);
    return () => {
      debouncedGetPostings.cancel(); // Cleanup on unmount
    };
  }, [search, currentPage, pageSize,selected]);
  

  const handlePostingClick = (data) => {
    if (selected === "작성글") {
      if (data.category1 === null) {
        router.push(`${baseUrl}/boast/${data.id}`);
      } else {
        router.push(`${baseUrl}/${data.category1}/${data.category2}/${data.id}`);
      }
    } else if (selected === "댓글") {
      if(data.category1 === null){
        router.push(`${baseUrl}/boast/${data.postingNo.toString()}`);
      }else{
        router.push(`${baseUrl}/${data.category1}/${data.category2}/${data.postingNo.toString()}`);
      }
    }
  };

  return (
    <Card className={"border border-default-200 bg-transparent"} shadow="none">
      <CardBody>
        <div className="flex flex-col items-start justify-between gap-3">
          <RadioGroup
            orientation="horizontal"
            value={selected}
            onValueChange={(value) => {
              setSelected(value);
              setCurrentPage(1);
              setTotalPages(1);
            }}
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
              <TableColumn className="w-1/3 text-center truncate">
                게시판
              </TableColumn>
              <TableColumn className="w-1/3 text-center truncate">
                작성일
              </TableColumn>
              <TableColumn className="w-1/3 text-center truncate">
                제목
              </TableColumn>
            </TableHeader>
            <TableBody>
              {postings?.map((data, index) => (
                <TableRow
                  className="cursor-pointer"
                  onClick={() => handlePostingClick(data)}
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
                    {data.title.length > 20
                      ? `${data.title.substring(0, 20)}...`
                      : data.title}
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
