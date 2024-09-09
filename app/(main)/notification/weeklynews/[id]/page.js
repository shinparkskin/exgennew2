"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Spinner } from "@nextui-org/spinner";
import { Card, Skeleton, Spacer } from "@nextui-org/react";
import ReplyText from "@/app/(main)/components/ReplyText";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import {useRouter} from "next/navigation";
function page(props) {
  const [posting, setPosting] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const pathname = usePathname();
  const pathParts = pathname.split("/");
  const postingId = pathParts[pathParts.length - 1];
  const tableName = pathParts[pathParts.length - 2];
  const supabase = createClient();
  const router = useRouter();


  console.log("tableName:", tableName);
  const fetchData = async () => {
    const { data, error } = await supabase
      .from(tableName)
      .select("*")
      .eq("id", postingId)
      .single();

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      console.log("Fetched data:", data);
    }
    setPosting(data);
    setIsCompleted(true);
    countUp(data);
  };

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
    fetchData();
  }, []);
  return (
    <div class="flex-1">
      {isCompleted ? (
        <>
          <div key={posting.id} class="box overflow-hidden">
            <div className="flex justify-start w-full p-2 cursor-pointer">
              <MdOutlineKeyboardArrowLeft
                className="text-3xl"
                onClick={() => router.push("/notification")}
              />
            </div>
            <div class="relative h-80">
              <img
                src={posting.thumbImage}
                class="h-36 mb-4 w-full h-full object-contain"
              />
            </div>
            <div class="p-6 w-full">
              <h1 class="text-xl font-semibold mt-1">{posting.title}</h1>
              <p className="text-xs text-gray-500">
                조회수 : {posting.viewCount}
              </p>

              <div class="flex gap-3 text-sm mt-6 items-center">
                <img
                  src="/images/logo.png"
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

              <div class="space-y-2 text-sm font-normal mt-6 leading-6 text-black dark:text-white">
                <p>{posting.description}</p>
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
