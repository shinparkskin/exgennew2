"use client";
import { useState, useEffect } from "react";
import { Spacer } from "@nextui-org/spacer";
import { createClient } from "@/utils/supabase/client";
import { usePathname } from "next/navigation";

export default function ReplyText() {
  const [contents, setContents] = useState("");
  const [replies, setReplies] = useState([]);
  const [seeMore, setSeeMore] = useState(1);
  const supabase = createClient();
  const pathname = usePathname();
  const pathParts = pathname.split("/");

  const handleReplySubmit = async () => {
    const tableName = "reply";

    const { data, error } = await supabase
      .from(tableName)
      .insert([
        {
          postingNo: pathParts[pathParts.length - 1],
          nickName: "관리자",
          email: "",
          reply: contents,
          category1: pathParts[pathParts.length - 2],
          category2: pathParts[pathParts.length - 3],
        },
      ]);

    if (error) {
      console.error("Error inserting data:", error);
    } else {
      console.log("Data inserted successfully:", data);
      setContents(""); // Clear the input field after successful submission
      fetchReplies();
    }
  };

  const fetchReplies = async () => {
    const tableName = "reply";
    const { data, error } = await supabase
      .from(tableName)
      .select("*")
      .eq("category1", pathParts[pathParts.length - 2])
      .eq("category2", pathParts[pathParts.length - 3])
      .limit(5*seeMore);

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      console.log("Data fetched successfully:", data);
      setReplies(data);
      // You can set the fetched data to a state if needed
    }
  };

  useEffect(() => {
    fetchReplies();
  }, [seeMore]);


  const handleSeeMore = () => {
    setSeeMore(seeMore + 1);
  };
  console.log('replies:',replies)
  return (
    <div class="box p-5 px-6 relative">
      <h3 class="font-semibold text-base text-black dark:text-white">댓글</h3>

      <div class=" text-sm font-normal space-y-4 relative mt-4">
        {replies.map((reply) => (
          <div class="flex items-start gap-3 relative">
            {" "}
            <img
              src="/images/avatars/avatar-2.jpg"
              alt=""
              class="w-6 h-6 mt-1 rounded-full"
            />{" "}
            <div class="flex-1">
              <p class="text-black font-medium inline-block dark:text-white">
                {reply.nickName}
              </p>
              <p class="mt-0.5"> {reply.reply}</p>
            </div>
          </div>
        ))}

        <div>
          <button
            type="button"
            class="flex items-center gap-1.5 text-blue-500 hover:text-blue-500 my-5"
            onClick={handleSeeMore}
          >
            <ion-icon
              name="chevron-down-outline"
              class="ml-auto duration-200 group-aria-expanded:rotate-180 md hydrated"
              role="img"
              aria-label="chevron down outline"
            ></ion-icon>
            더보기
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
            value={contents}
            onChange={(e) => setContents(e.target.value)}
          ></textarea>
        </div>

        <button
          type="button"
          onClick={handleReplySubmit}
          class="text-sm rounded-full py-1.5 px-3.5 bg-secondery"
          
        >
          작성
        </button>
      </div>
      <Spacer y={20}></Spacer>
    </div>
  );
}
