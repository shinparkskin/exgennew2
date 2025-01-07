"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "../../../../../utils/supabase/client";
import { Spinner } from "@nextui-org/spinner";
import { Card, Skeleton, Spacer } from "@nextui-org/react";
import YouTube from "react-youtube";
// import ReplyText from "@/app/(main)/components/ReplyText";
import ReplyText from "../../../../(main)/components/ReplyText";
import { useRouter } from "next/navigation";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import SendReport from "../../../../(main)/components/SendReport";


function page(props) {
  const [posting, setPosting] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [email, setEmail] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [masterEmails, setMasterEmails] = useState([]);
  const pathname = usePathname();
  const pathParts = pathname.split("/");
  const postingId = pathParts[pathParts.length - 1];
  const tableName = pathParts[pathParts.length - 2];

  const supabase = createClient();
  const router = useRouter();

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("youtube")
      .select("*")
      .eq("id", postingId)
      .eq("isForbidden", false)
      .single();

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      console.log("Fetched data:", data);
    }
    setPosting(data);
    setIsCompleted(true);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const getEmail = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Error fetching user:", error);
    } else {
      console.log("User fetched successfully:", data);
      setEmail(data.user.email);
    }
  };

  const getMasterEmails = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "master");

    if (error) {
      console.error("Error fetching master emails:", error);
    } else {
      console.log("Master emails fetched successfully:", data);
      setMasterEmails(data.map((item) => item.email));
    }
  };

  useEffect(() => {
    getEmail();
    getMasterEmails();
  }, []);

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("youtube")
      .delete()
      .eq("id", postingId);
    if (error) {
      console.error("Error deleting data:", error);
    } else {
      console.log("Deleted data:", data);
      router.push("/review");
    }
  };
  const handleModify = () => {
    const pathParts = pathname.split("/");
    console.log("pathParts:", pathParts);
    const postingId = pathParts[pathParts.length - 1];
    const second = pathParts[pathParts.length - 2];
    const first = pathParts[pathParts.length - 3] || "";
    router.push(
      `/modify?first=${first}&second=${second}&postingId=${postingId}`
    );
  };
  const handleReport = async () => {
    const { data, error } = await supabase
      .from(tableName) // tableName is already derived from pathname
      .update({ isForbidden: true })
      .eq("id", postingId); // postingId is already derived from pathname

    if (error) {
      console.error("Error reporting post:", error);
    } else {
      console.log("신고가 완료되었습니다.", data);
      toast.error("신고가 완료되었습니다. 즉시 숨김처리 하였으며 24시간 내에 내용 확인하여 추가 조치 할 예정입니다.");
    }
  };

  return (
    <div class="flex-1">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">확인</ModalHeader>
              <ModalBody>
                <p>정말 삭제하시겠습니까?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  취소
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    onClose();
                    handleDelete();
                  }}
                >
                  확인
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {isCompleted ? (
        <>
          <div class="box overflow-hidden">
            <div className="flex justify-between w-full p-2 cursor-pointer">
              <MdOutlineKeyboardArrowLeft
                className="text-3xl"
                onClick={() => router.push("/review")}
              />
                            {/* <Button
                onClick={handleReport}
                color="danger"
                variant="light"
                size="sm"
              >
                신고하기
              </Button> */}
              <SendReport tableName={tableName} postingId={postingId} />
            </div>

            <div class="relative h-80">
              <YouTube
                videoId={posting.videoUrl.split("v=")[1]}
                className="mb-4 w-full h-full"
                containerClassName="w-full h-full"
                opts={{
                  width: "100%",
                  height: "100%",
                  playerVars: {
                    autoplay: 1,
                    controls: 1,
                    modestbranding: 1,
                  },
                }}
              />
            </div>
            <div class="p-6">
              <h1 class="text-xl font-semibold mt-1">{posting.title}</h1>

              <div class="flex gap-3 text-sm mt-6 flex items-center">
                <img
                  src={posting.avatarUrl}
                  alt=""
                  class="w-9 h-9 rounded-full object-contain"
                />
                <div class="flex-1 ">
                  <h4 class="text-black font-medium dark:text-white">
                    {posting.creator}
                  </h4>
                </div>
                <div class="font-normal text-gray-500 gap-1">
                  <span class="text-sm ml-auto text-gray-400">
                    {new Date(posting.regiDate).toLocaleString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </span>
                </div>
              </div>
              <div className="flex justify-end gap-x-2">
                {posting.email === email && (
                  <Button
                    color="default"
                    variant="bordered"
                    size="sm"
                    onClick={handleModify}
                  >
                    수정
                  </Button>
                )}
                {(masterEmails.includes(email) || posting.email === email) && (
                  <Button
                    color="default"
                    variant="bordered"
                    size="sm"
                    onClick={onOpen}
                  >
                    삭제
                  </Button>
                )}
              </div>

              <div class="space-y-2 text-sm font-normal mt-6 leading-6 text-black dark:text-white">
                <p className="whitespace-pre-line">{posting.description}</p>
              </div>
            </div>
          </div>
          <Spacer y={5}></Spacer>
          <ReplyText></ReplyText>
        </>
      ) : (
        <div className="flex justify-center items-center w-[100vw] h-[100vh]">
          <Spinner color="primary" />
        </div>
      )}
    </div>
  );
}

export default page;
