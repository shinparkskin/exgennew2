"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "../../../../../utils/supabase/client";
import { Spinner } from "@nextui-org/spinner";
import { Card, Skeleton, Spacer } from "@nextui-org/react";
// import ReplyText from "@/app/(main)/components/ReplyText";
import ReplyText from "../../../../(main)/components/ReplyText";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import SendReport from "../../../../(main)/components/SendReport";

function page(props) {
  const [posting, setPosting] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [masterEmails, setMasterEmails] = useState([]);
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const pathname = usePathname();
  const pathParts = pathname.split("/");
  const postingId = pathParts[pathParts.length - 1];
  const tableName = pathParts[pathParts.length - 2];

  const supabase = createClient();
  const fetchData = async () => {
    const { data, error } = await supabase
      .from(tableName)
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

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("introduction")
      .delete()
      .eq("id", postingId);
    console.log("data:", data);
    console.log("postingId:", postingId);
    if (error) {
      console.error("Error deleting data:", error);
    } else {
      console.log("Deleted data:", data);
      router.push("/notification");
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

  useEffect(() => {
    fetchData();
    getMasterEmails();
    getEmail();
  }, []);

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

  console.log("masterEmails:", masterEmails);
  console.log("email:", email);
  return (
    <div class="flex-1">
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
      />{" "}
      {isCompleted ? (
        <>
          <div class="box overflow-hidden">
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      확인
                    </ModalHeader>
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
            <div className="flex justify-between w-full p-2 cursor-pointer">
              <MdOutlineKeyboardArrowLeft
                className="text-3xl"
                onClick={() => router.push("/notification")}
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
            <div class="w-full h-[50vh]">
              <div
                class="w-full h-full relative"
                uk-slideshow="animation: push; ratio: 7:5"
              >
                <ul
                  class="uk-slideshow-items overflow-hidden rounded-xl w-full h-[50vh]"
                  uk-lightbox="animation: fade"
                >
                  {posting.totalImages.length > 0 ? (
                    posting.totalImages.map((image, index) => (
                      <li class="w-full h-full">
                        <a
                          class="inline"
                          href={image}
                          data-caption={posting.title}
                        >
                          <img
                            src={image}
                            alt=""
                            class="w-full h-[50vh] absolute object-contain"
                          />
                        </a>
                      </li>
                    ))
                  ) : (
                    <li class="w-full h-full">
                      <a
                        class="inline"
                        href="/images/product/product-3.jpg"
                        data-caption="No Image Available"
                      >
                        <img
                          src="/images/product/product-3.jpg"
                          alt="No Image Available"
                          class="w-full h-[50vh] absolute object-contain"
                        />
                      </a>
                    </li>
                  )}
                </ul>

                <div class="max-md:hidden">
                  <a class="nav-prev m-6" href="#" uk-slideshow-item="previous">
                    {" "}
                    <ion-icon
                      name="chevron-back"
                      class="text-2xl"
                    ></ion-icon>{" "}
                  </a>
                  <a class="nav-next m-6" href="#" uk-slideshow-item="next">
                    {" "}
                    <ion-icon
                      name="chevron-forward"
                      class="text-2xl"
                    ></ion-icon>
                  </a>
                </div>

                <ul class="flex justify-center gap-4 py-4 absolute w-full bottom-0">
                  {posting.totalImages.map((image, index) => (
                    <li uk-slideshow-item={index.toString()}>
                      <a href="#">
                        <img src={image} alt="" class="w-16 h-12 rounded" />{" "}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* <div class="relative h-80">
              <img
                src={posting.thumbImage}
                class="h-36 mb-4 w-full h-full object-contain"
              />
            </div> */}
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
                    })}
                  </span>
                </div>
              </div>
              <div className="flex justify-end gap-x-2">
                {masterEmails.includes(email) && (
                  <>
                    <Button
                      color="default"
                      variant="bordered"
                      size="sm"
                      onClick={handleModify}
                    >
                      수정
                    </Button>
                    <Button
                      color="default"
                      variant="bordered"
                      size="sm"
                      onClick={onOpen}
                    >
                      삭제
                    </Button>
                  </>
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
