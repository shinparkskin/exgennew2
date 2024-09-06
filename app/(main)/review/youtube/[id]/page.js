"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Spinner } from "@nextui-org/spinner";
import { Card, Skeleton, Spacer } from "@nextui-org/react";
import YouTube from "react-youtube";
import ReplyText from "@/app/(main)/components/ReplyText";
function page(props) {
  const [posting, setPosting] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const pathname = usePathname();
  const pathParts = pathname.split("/");
  const postingId = pathParts[pathParts.length - 1];
  const tableName = pathParts[pathParts.length - 2];

  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("youtube")
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
    };

    fetchData();
  }, []);
  return (
    <div class="flex-1">
      {isCompleted ? (
        <>
          <div class="box overflow-hidden">
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
                      second: "2-digit",
                    })}
                  </span>
                </div>
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
