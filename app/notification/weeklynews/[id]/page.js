"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Spinner } from "@nextui-org/spinner";
import { Card, Skeleton } from "@nextui-org/react";

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
    };

    fetchData();
  }, []);
  return (
    <div class="flex-1">
      {isCompleted ? (
        <>
          <div class="box overflow-hidden">
            <div class="relative h-80">
              <img
                src={posting.thumbImage}
                class="h-36 mb-4 w-full h-full object-cover"
              />
            </div>
            <div class="p-6">
              <h1 class="text-xl font-semibold mt-1">{posting.title}</h1>

              <div class="flex gap-3 text-sm mt-6 flex items-center">
                <img
                  src="/images/avatars/avatar-5.jpg"
                  alt=""
                  class="w-9 h-9 rounded-full"
                />
                <div class="flex-1 ">
                  <h4 class="text-black font-medium dark:text-white">
                    {posting.creator}
                  </h4>

                </div>
                <div class="font-normal text-gray-500 gap-1">
                  <span class="text-sm ml-auto text-gray-400">
                    {new Date(posting.regiDate).toLocaleString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>

              <div class="space-y-2 text-sm font-normal mt-6 leading-6 text-black dark:text-white">
                <p>
                  {posting.description}
                </p>
                  
              </div>
            </div>
          </div>

          <br />

          <div class="box p-5 px-6 relative">
            <h3 class="font-semibold text-base text-black dark:text-white">
              댓글
            </h3>

            <div class=" text-sm font-normal space-y-4 relative mt-4">
              <div class="flex items-start gap-3 relative">
                <a href="timeline.html">
                  {" "}
                  <img
                    src="/images/avatars/avatar-3.jpg"
                    alt=""
                    class="w-6 h-6 mt-1 rounded-full"
                  />{" "}
                </a>
                <div class="flex-1">
                  <a
                    href="timeline.html"
                    class="text-black font-medium inline-block dark:text-white"
                  >
                    이중재
                  </a>
                  <p class="mt-0.5">11111😍 </p>
                </div>
              </div>
              <div class="flex items-start gap-3 relative">
                <a href="timeline.html">
                  {" "}
                  <img
                    src="/images/avatars/avatar-2.jpg"
                    alt=""
                    class="w-6 h-6 mt-1 rounded-full"
                  />{" "}
                </a>
                <div class="flex-1">
                  <a
                    href="timeline.html"
                    class="text-black font-medium inline-block dark:text-white"
                  >
                    신주원
                  </a>
                  <p class="mt-0.5"> 넵 확인했습니다.😎 </p>
                </div>
              </div>
              
              <div>
                <button
                  type="button"
                  class="flex items-center gap-1.5 text-blue-500 hover:text-blue-500 my-5"
                >
                  <ion-icon
                    name="chevron-down-outline"
                    class="ml-auto duration-200 group-aria-expanded:rotate-180 md hydrated"
                    role="img"
                    aria-label="chevron down outline"
                  ></ion-icon>
                  More Comment
                </button>
              </div>
            </div>

            <div class="sm:px-4 sm:py-3 p-2.5 border-t border-gray-100 flex items-center gap-1 -m-6 mt-0 bg-secondery/60 dark:border-slate-700/40">
              <img
                src="/images/avatars/avatar-7.jpg"
                alt=""
                class="w-6 h-6 rounded-full"
              />

              <div class="flex-1 relative overflow-hidden h-10">
                <textarea
                  placeholder="Add Comment...."
                  rows="1"
                  class="w-full resize-none !bg-transparent px-4 py-2 focus:!border-transparent focus:!ring-transparent"
                  aria-haspopup="true"
                  aria-expanded="false"
                ></textarea>

                <div
                  class="!top-2 pr-2 uk-drop"
                  uk-drop="pos: bottom-right; mode: click"
                >
                  <div
                    class="flex items-center gap-2"
                    uk-scrollspy="target: > svg; cls: uk-animation-slide-right-small; delay: 100 ;repeat: true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-6 h-6 fill-sky-600"
                      style={{ opacity: 0 }}
                    >
                      <path
                        fill-rule="evenodd"
                        d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="w-5 h-5 fill-pink-600"
                      style={{ opacity: 0 }}
                    >
                      <path d="M3.25 4A2.25 2.25 0 001 6.25v7.5A2.25 2.25 0 003.25 16h7.5A2.25 2.25 0 0013 13.75v-7.5A2.25 2.25 0 0010.75 4h-7.5zM19 4.75a.75.75 0 00-1.28-.53l-3 3a.75.75 0 00-.22.53v4.5c0 .199.079.39.22.53l3 3a.75.75 0 001.28-.53V4.75z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                class="text-sm rounded-full py-1.5 px-3.5 bg-secondery"
              >
                {" "}
                Replay
              </button>
            </div>
          </div>
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
