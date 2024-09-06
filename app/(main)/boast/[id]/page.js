"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Spinner } from "@nextui-org/spinner";
import { Card, Skeleton } from "@nextui-org/react";
import { data } from "autoprefixer";
import { Checkbox, Spacer } from "@nextui-org/react";
import ReplyText from "@/app/(main)/components/ReplyText";
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

function page(props) {
  const [posting, setPosting] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [bestValue, setBestValue] = useState(false);
  const [email, setEmail] = useState("");
  const pathname = usePathname();
  const pathParts = pathname.split("/");
  const postingId = pathParts[pathParts.length - 1];
  const tableName = pathParts[pathParts.length - 2];
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const router = useRouter();

  const supabase = createClient();

  const countUp = async (postingInfo) => {
    console.log("countup");
    const { data, error } = await supabase
      .from(tableName)
      .update({ viewCount: postingInfo.viewCount + 1 })
      .eq("id", postingId);
    if (error) {
      console.error("countup:", error);
    } else {
      console.log("countup:", data);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("boast")
        .select("*")
        .eq("id", postingId)
        .single();

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        console.log("Fetched data:", data);
      }
      countUp(data);
      setBestValue(data.best);
      setPosting(data);
      setIsCompleted(true);
    };

    fetchData();
  }, []);
  console.log("bestValue:", bestValue);

  const handleBest = () => {
    setBestValue(!bestValue);

    const updateBestValue = async () => {
      const { data, error } = await supabase
        .from("boast")
        .update({ best: !bestValue })
        .eq("id", postingId);

      if (error) {
        console.error("Error updating data:", error);
      } else {
        console.log("Updated data:", data);
      }
    };

    updateBestValue();
  };

  const getEmail = async () => {
    const { data, error } = await supabase.auth.getUser();
    console.log("data:", data);
    if (error) {
      console.error("Error fetching user:", error);
    } else {
      console.log("User fetched successfully:", data);
      setEmail(data.user.email);
    }
  };

  useEffect(() => {
    getEmail();
  }, []);

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("boast")
      .delete()
      .eq("id", postingId);
    if (error) {
      console.error("Error deleting data:", error);
    } else {
      console.log("Deleted data:", data);
      router.push("/boast");
    }
  };

  return (
    <div class="flex-1">
      {isCompleted ? (
        <>
          <div class="box w-full h-full">
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      확인
                    </ModalHeader>
                    <ModalBody>
                      <p>
                        정말 삭제하시겠습니까?
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        취소
                      </Button>
                      <Button color="primary" onPress={() => { onClose(); handleDelete(); }}>
                        확인
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
            <div class="w-full">
              <div class="relative" uk-slideshow="animation: push; ratio: 7:5">
                <ul
                  class="uk-slideshow-items overflow-hidden rounded-xl"
                  uk-lightbox="animation: fade"
                >
                  {posting.totalImages.map((image, index) => (
                    <li class="w-full">
                      <a
                        class="inline"
                        href={image}
                        data-caption={posting.title}
                      >
                        <img
                          src={image}
                          alt=""
                          class="w-full h-full absolute object-contain"
                        />
                      </a>
                    </li>
                  ))}
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
            <div class="p-6">
              <div className="flex justify-end">
                {email === "quizman3245@naver.com" ? (
                  <Checkbox
                    defaultSelected={bestValue}
                    onValueChange={handleBest}
                  >
                    베스트
                  </Checkbox>
                ) : (
                  <></>
                )}
              </div>

              <h1 class="text-xl font-semibold mt-1">{posting.title}</h1>
              <p className="text-xs text-gray-500">
                조회수 : {posting.viewCount}
              </p>
              {posting.email === email && (
                <div className="flex justify-end gap-x-2">
                  <Button color="default" variant="bordered" size="sm">
                    수정
                  </Button>
                  <Button color="default" variant="bordered" size="sm" onClick={onOpen}>
                    삭제
                  </Button>
                </div>
              )}

              <div class="flex gap-3 text-sm mt-6 flex items-center">
                <img
                  src={
                    posting.avatarUrl
                      ? posting.avatarUrl
                      : "/images/avatars/avatar-5.jpg"
                  }
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

              <div class="space-y-2 text-sm font-normal mt-6 leading-6 text-black dark:text-white">
                <p>{posting.description}</p>
              </div>
            </div>
          </div>

          <Spacer y={5}></Spacer>
          <ReplyText></ReplyText>
        </>
      ) : (
        <div className="flex justify-center items-center  h-[100vh] w-[100vw]">
          <Spinner color="primary" />
        </div>
      )}
    </div>
  );
}

export default page;
