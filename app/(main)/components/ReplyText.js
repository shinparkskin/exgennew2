"use client";
import { useState, useEffect } from "react";
import { Spacer } from "@nextui-org/spacer";
import { createClient } from "../../../utils/supabase/client";
import { usePathname } from "next/navigation";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ReplyText() {
  const [contents, setContents] = useState("");
  const [changeContents, setChangeContents] = useState("");
  const [replies, setReplies] = useState([]);
  const [totalReplies, setTotalReplies] = useState(0);
  const [seeMore, setSeeMore] = useState(1);
  const [isChange, setIsChange] = useState("");
  const [myAvatarUrl, setMyAvatarUrl] = useState("");
  const supabase = createClient();
  const pathname = usePathname();
  const pathParts = pathname.split("/");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user data:", error);
      } else {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.user.id)
          .single();

        if (profileError) {
          console.error("Error fetching profile data:", profileError);
        } else {
          setNickname(profileData.nickname);
          setEmail(profileData.email);
          setMyAvatarUrl(profileData.avatar_url);
        }
      }
    };

    fetchUser();
  }, []);

  const handleReplySubmit = async () => {
    if (contents.length < 1) {
      toast.error("댓글 내용을 입력해주세요");
      return;
    }
    const tableName = "reply";

    const { data: existingReplies, error: existingRepliesError } = await supabase
      .from(tableName)
      .select("id")
      .eq("postingNo", pathParts[pathParts.length - 1])
      .eq("nickName", nickname)
      .eq("title", contents);

    if (existingRepliesError) {
      console.error("Error fetching existing replies:", existingRepliesError);
      return;
    }

    if (existingReplies.length > 2) {
      toast.error("같은 내용의 댓글이 이미 3개 이상 존재합니다.");
      return;
    }


    const { data, error } = await supabase.from(tableName).insert([
      {
        postingNo: pathParts[pathParts.length - 1],
        nickName: nickname,
        email: email,
        title: contents,
        category2: pathParts[pathParts.length - 2],
        category1: pathParts[pathParts.length - 3],
        avatarUrl: myAvatarUrl,
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
    const { data, error, count } = await supabase
      .from(tableName)
      .select("*", { count: "exact" })
      .eq("category2", pathParts[pathParts.length - 2])
      .eq("category1", pathParts[pathParts.length - 3])
      .eq("postingNo", pathParts[pathParts.length - 1])
      .order("regiDate", { ascending: false })
      .limit(5 * seeMore);

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      console.log("Data fetched successfully:", data);
      setTotalReplies(count);
      setReplies(data);
      // You can set the fetched data to a state if needed
    }
  };
  const handleReplyChange = async (replyId) => {
    const tableName = "reply";
    const { data, error } = await supabase
      .from(tableName)
      .update({ reply: changeContents })
      .eq("id", replyId);

    if (error) {
      console.error("Error updating data:", error);
    } else {
      console.log("Data updated successfully:", data);
      setContents(""); // Clear the input field after successful update
      fetchReplies(); // Refresh the replies after update
      setIsChange("");
      setChangeContents("");
    }
  };

  const handleDelete = async (replyId) => {
    const tableName = "reply";
    const { data, error } = await supabase
      .from(tableName)
      .delete()
      .eq("id", replyId);

    if (error) {
      console.error("Error deleting data:", error);
    } else {
      console.log("Data deleted successfully:", data);
      fetchReplies(); // Refresh the replies after deletion
    }
  };
  const handleChange = async (replyId) => {
    setIsChange(replyId);
  };

  useEffect(() => {
    fetchReplies();
  }, [seeMore]);

  const handleSeeMore = () => {
    setSeeMore(seeMore + 1);
  };
  return (
    <div class="box p-5 px-6 relative">
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
      />
      <h3 class="font-semibold text-base text-black dark:text-white">댓글</h3>

      <div class="w-full text-sm font-normal space-y-4 relative mt-4">
        {replies.map((reply) => (
          <div class="flex items-center gap-x-3 justify-center relative w-full">
            <div className="w-full flex flex-col">
              <div className="flex gap-x-2 w-full justify-between items-center">
                <div className="flex gap-x-2">
                  <img
                    src={reply.avatarUrl || "/images/avatars/avatar-2.jpg"}
                    alt=""
                    class="w-6 h-6 mt-1 rounded-full"
                  />
                  <div className="flex flex-col">
                    <p class="text-black font-medium inline-block dark:text-white">
                      {reply.nickName}
                    </p>
                    <p class="text-gray-400 font-medium inline-block text-xs">
                      {new Date(reply.regiDate).toLocaleString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
                {(email === "quizman3245@naver.com" ||
                  reply.nickName === nickname) && (
                  <div className="flex gap-x-2">
                    <Button
                      onClick={() => {
                        handleChange(reply.id);
                      }}
                      color=""
                      size="sm"
                      variant="bordered"
                    >
                      수정
                    </Button>

                    <Button
                      onClick={() => {
                        handleDelete(reply.id);
                      }}
                      color=""
                      size="sm"
                      variant="bordered"
                    >
                      삭제
                    </Button>
                  </div>
                )}
              </div>
              <div>
                <p class="my-2"> {reply.title}</p>
              </div>

              {isChange === reply.id && (
                <div>
                  <div class="flex-1 relative overflow-hidden h-10">
                    <textarea
                      placeholder="내용을 입력하세요"
                      rows="1"
                      class="w-full resize-none !bg-transparent px-4 py-2 focus:!border-transparent focus:!ring-transparent"
                      aria-haspopup="true"
                      aria-expanded="false"
                      value={changeContents}
                      onChange={(e) => setChangeContents(e.target.value)}
                    ></textarea>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      handleReplyChange(reply.id);
                    }}
                    class="text-sm rounded-full py-1.5 px-3.5 bg-secondery"
                  >
                    수정
                  </button>
                </div>
              )}
            </div>

            {/* 수정자리 */}
          </div>
        ))}

        <div>
          {totalReplies > replies.length ? (
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
          ) : (
            <></>
          )}
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
            placeholder="내용을 입력하세요"
            rows="1"
            class="w-full resize-none !bg-transparent px-4 py-2 focus:!border-transparent focus:!ring-transparent"
            aria-haspopup="true"
            aria-expanded="false"
            value={contents}
            onChange={(e) => setContents(e.target.value)}
          ></textarea>
        </div>
        {nickname ? (
          <button
            type="button"
            onClick={handleReplySubmit}
            class="text-sm rounded-full py-1.5 px-3.5 bg-secondery"
          >
            작성
          </button>
        ) : (
          <Link href="/login" className="text-xs text-primary underline ">
            로그인 후 이용해주세요
          </Link>
        )}
      </div>
      <Spacer y={20}></Spacer>
    </div>
  );
}
