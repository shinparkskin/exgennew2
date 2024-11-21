"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "../../../utils/supabase/client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
export default function LoginInfo() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [nickname, setNickname] = useState("");
  const [session, setSession] = useState(null);
  const [posts, setPosts] = useState([]);
  const [alarmCount, setAlarmCount] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const fetchUser = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error(error);
      setIsComplete(true);
    } else {
      setUser(data.user);

      const { data: nicknameData, error: nicknameError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (nicknameData) {
        setNickname(nicknameData.nickname);
        setIsComplete(true);
        setAvatar(nicknameData.avatar_url);
      }
    }
  };

  const fetchPosts = async () => {
    const supabase = createClient();
    const fetchFromTable = async (tableName) => {
      const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .order("regiDate", { ascending: false })
        .gte(
          "regiDate",
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        );

      if (error) {
        console.error(`Error fetching data from ${tableName}:`, error);
        return [];
      }

      // Add category2 based on tableName
      return data.map((item) => ({ ...item, category2: tableName }));
    };

    const notifications = await fetchFromTable("notification");
    const managers = await fetchFromTable("manager");
    const promotions = await fetchFromTable("promotion");
    const combinedPosts = [...notifications, ...managers, ...promotions];

    const { data: noticheckData, error: noticheckError } = await supabase
      .from("noticheck")
      .select("category2, postingId")
      .eq("userId", user.id);

    if (noticheckError) {
      console.error("Error fetching data from noticheck:", noticheckError);
    } else {
      const filteredPosts = combinedPosts
        .filter(
          (post) =>
            !noticheckData.some(
              (noticheck) =>
                noticheck.category2 === post.category2 &&
                noticheck.postingId === post.id
            )
        )
        .sort((a, b) => new Date(b.regiDate) - new Date(a.regiDate));
      setPosts(filteredPosts);
      setAlarmCount(filteredPosts.length);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  useEffect(() => {
    if (user && user.id) {
      fetchPosts();
    }
  }, [user]);

  console.log("user:", user);
  console.log("avatar:", avatar);

  if (!isComplete) {
    return <div></div>;
  }

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
    router.refresh(); // Force a refresh of the current page
  };

  return (
    <div className="flex w-full">
      {user ? (
        <div className="flex items-center sm:gap-4 gap-2 absolute right-5 top-1/2 -translate-y-1/2 text-black">
          <div
            className="hidden bg-white p-4 rounded-lg overflow-hidden drop-shadow-xl dark:bg-slate-700 md:w-[324px] w-screen border2"
            uk-drop="offset:6;pos: bottom-right; mode: click; animate-out: true; animation: uk-animation-scale-up uk-transform-origin-top-right "
          >
            <h3 className="font-bold text-md"> Create </h3>

            <div
              className="mt-4"
              tabindex="-1"
              uk-slider="finite:true;sets: true"
            >
              <div className="uk-slider-container pb-1">
                <ul
                  className="uk-slider-items grid-small"
                  uk-scrollspy="target: > li; cls: uk-animation-scale-up , uk-animation-slide-right-small; delay: 20 ;repeat: true"
                >
                  <li
                    className="w-28"
                    uk-scrollspy-className="uk-animation-fade"
                  >
                    <div className="p-3 px-4 rounded-lg bg-teal-100/60 text-teal-600 dark:text-white dark:bg-dark4">
                      <ion-icon
                        name="book"
                        className="text-2xl drop-shadow-md"
                      ></ion-icon>
                      <div className="mt-1.5 text-sm font-medium"> Story </div>
                    </div>
                  </li>
                  <li className="w-28">
                    <div className="p-3 px-4 rounded-lg bg-sky-100/60 text-sky-600 dark:text-white dark:bg-dark4">
                      <ion-icon
                        name="camera"
                        className="text-2xl drop-shadow-md"
                      ></ion-icon>
                      <div className="mt-1.5 text-sm font-medium"> Post </div>
                    </div>
                  </li>
                  <li className="w-28">
                    <div className="p-3 px-4 rounded-lg bg-purple-100/60 text-purple-600 dark:text-white dark:bg-dark4">
                      <ion-icon
                        name="videocam"
                        className="text-2xl drop-shadow-md"
                      ></ion-icon>
                      <div className="mt-1.5 text-sm font-medium"> Reel </div>
                    </div>
                  </li>
                  <li className="w-28">
                    <div className="p-3 px-4 rounded-lg bg-pink-100/60 text-pink-600 dark:text-white dark:bg-dark4">
                      <ion-icon
                        name="location"
                        className="text-2xl drop-shadow-md"
                      ></ion-icon>
                      <div className="mt-1.5 text-sm font-medium">
                        {" "}
                        location{" "}
                      </div>
                    </div>
                  </li>
                  <li className="w-28">
                    <div className="p-3 px-4 rounded-lg bg-sky-100/70 text-sky-600 dark:text-white dark:bg-dark4">
                      <ion-icon
                        name="happy"
                        className="text-2xl  drop-shadow-md"
                      ></ion-icon>
                      <div className="mt-1.5 text-sm font-medium"> Status </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="dark:hidden">
                <a
                  className="absolute -translate-y-1/2 top-1/2 -left-4 flex items-center w-8 h-full px-1.5 justify-start bg-gradient-to-r from-white via-white dark:from-slate-600 dark:via-slate-500 dark:from-transparent dark:via-transparent"
                  href="#"
                  uk-slider-item="previous"
                >
                  {" "}
                  <ion-icon
                    name="chevron-back"
                    className="text-xl dark:text-white"
                  ></ion-icon>{" "}
                </a>
                <a
                  className="absolute -translate-y-1/2 top-1/2 -right-4 flex items-center w-8 h-full px-1.5 justify-end bg-gradient-to-l from-white via-white dark:from-transparent dark:via-transparent"
                  href="#"
                  uk-slider-item="next"
                >
                  {" "}
                  <ion-icon
                    name="chevron-forward"
                    className="text-xl dark:text-white"
                  ></ion-icon>{" "}
                </a>
              </div>

              <div className="justify-center mt-2 -mb-2 hidden dark:flex">
                <ul className="inline-flex flex-wrap justify-center gap-1 uk-dotnav uk-slider-nav">
                  {" "}
                </ul>
              </div>
            </div>

            <ul
              className="-m-1 mt-4 pb-1 text-xs text-gray-500 dark:text-white"
              uk-scrollspy="target: > li; cls: uk-animation-scale-up , uk-animation-slide-bottom-small ;repeat: true"
            >
              <li className="flex items-center gap-4 hover:bg-secondery rounded-md p-1.5 cursor-pointer dark:hover:bg-white/10">
                <img src="/images/icons/group.png" alt="" className="w-7" />
                <div className="flex-1">
                  <a href="timeline.html">
                    <h4 className="font-medium text-sm text-black dark:text-white">
                      {" "}
                      Groups{" "}
                    </h4>
                  </a>
                  <div className="mt-1 text-xs text-gray-500 dark:text-white">
                    {" "}
                    Meet people with similar interests.{" "}
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-4 hover:bg-secondery rounded-md p-1.5 cursor-pointer dark:hover:bg-white/10">
                <img src="/images/icons/page.png" alt="" className="w-7" />
                <div className="flex-1">
                  <a href="timeline.html">
                    <h4 className="font-medium text-sm text-black dark:text-white">
                      {" "}
                      Pages{" "}
                    </h4>
                  </a>
                  <div className="mt-1"> Find and connect with businesses.</div>
                </div>
              </li>
              <li className="flex items-center gap-4 hover:bg-secondery rounded-md p-1.5 cursor-pointer dark:hover:bg-white/10">
                <img src="/images/icons/event.png" className="w-7" />
                <div className="flex-1">
                  <a href="timeline.html">
                    <h4 className="font-medium text-sm text-black dark:text-white">
                      {" "}
                      Event{" "}
                    </h4>
                  </a>
                  <div className="mt-1">Discover fun activities near you .</div>
                </div>
              </li>
              <li className="flex items-center gap-4 hover:bg-secondery rounded-md p-1.5 cursor-pointer dark:hover:bg-white/10">
                <img src="/images/icons/market.png" className="w-8 -ml-1" />
                <div className="flex-1">
                  <a href="timeline.html">
                    <h4 className="font-medium text-sm text-black dark:text-white">
                      {" "}
                      Event{" "}
                    </h4>
                  </a>
                  <div className="mt-1">Find local buyers and sellers .</div>
                </div>
              </li>
              <li className="flex items-center gap-4 hover:bg-secondery rounded-md p-1.5 cursor-pointer dark:hover:bg-white/10">
                <img src="/images/icons/game.png" alt="" className="w-7" />
                <div className="flex-1">
                  <a href="timeline.html">
                    <h4 className="font-medium text-sm text-black dark:text-white">
                      {" "}
                      Games{" "}
                    </h4>
                  </a>
                  <div className="mt-1"> play game with friends have fun. </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="flex flex-row gap-x-5 ">
            <button
              type="button"
              className="sm:p-2 p-1 rounded-full relative sm:bg-secondery dark:text-white"
              uk-tooltip="title: Notification; pos: bottom; offset:6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M5.85 3.5a.75.75 0 00-1.117-1 9.719 9.719 0 00-2.348 4.876.75.75 0 001.479.248A8.219 8.219 0 015.85 3.5zM19.267 2.5a.75.75 0 10-1.118 1 8.22 8.22 0 011.987 4.124.75.75 0 001.48-.248A9.72 9.72 0 0019.266 2.5z" />
                <path
                  fill-rule="evenodd"
                  d="M12 2.25A6.75 6.75 0 005.25 9v.75a8.217 8.217 0 01-2.119 5.52.75.75 0 00.298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 107.48 0 24.583 24.583 0 004.83-1.244.75.75 0 00.298-1.205 8.217 8.217 0 01-2.118-5.52V9A6.75 6.75 0 0012 2.25zM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 004.496 0l.002.1a2.25 2.25 0 11-4.5 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <div className="absolute top-0 right-0 -m-1 bg-red-600 text-white text-xs px-1 rounded-full">
                {alarmCount}
              </div>
            </button>
            <div
              className="hidden bg-white pr-1.5 rounded-lg drop-shadow-xl  w-screen border2 md:w-[30vw]"
              uk-drop="offset:6;pos: bottom-right; mode: click; animate-out: true; animation: uk-animation-scale-up uk-transform-origin-top-right "
            >
              <div className="flex items-center justify-center gap-2 p-4 pb-2">
                <p className="font-bold text-center text-xl"> 신규 알림 </p>
              </div>
              <hr className="border-gray-200 mx-5 my-2" />

              <div className="text-sm h-[400px] w-full overflow-y-auto pr-2">
                <div className="pl-2 p-1 text-sm font-normal dark:text-white">
                  {posts.map((post) => (
                    <>
                      <a
                        href={`/notification/${post.category2}/${post.id}`}
                        className="mx-5 relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery hover:bg-primary/10 "
                      >
                        <div className="flex-1 ">
                          <p>
                            <b className="font-bold mr-1"> {post.title}</b>
                          </p>
                          <div className="text-xs text-gray-500 mt-1.5 dark:text-white/80">
                            {(() => {
                              const postDate = new Date(post.regiDate);
                              const now = new Date();
                              const diffInSeconds = Math.floor(
                                (now - postDate) / 1000
                              );
                              const diffInMinutes = Math.floor(
                                diffInSeconds / 60
                              );
                              const diffInHours = Math.floor(
                                diffInMinutes / 60
                              );
                              const diffInDays = Math.floor(diffInHours / 24);

                              if (diffInDays > 0) {
                                return `${diffInDays}일 전`;
                              } else if (diffInHours > 0) {
                                return `${diffInHours}시간 전`;
                              } else if (diffInMinutes > 0) {
                                return `${diffInMinutes}분 전`;
                              } else {
                                return `${diffInSeconds}초 전`;
                              }
                            })()}
                          </div>
                          <div className="w-2.5 h-2.5 rounded-full absolute right-3 top-5"></div>
                        </div>
                      </a>
                      {/* <hr  className="border-gray-200"/> */}
                    </>
                  ))}
                </div>
              </div>
            </div>

            {/* <div
              className="hidden bg-white pr-1.5 rounded-lg drop-shadow-xl dark:bg-slate-700 md:w-[360px] w-screen border2"
              uk-drop="offset:6;pos: bottom-right; mode: click; animate-out: true; animation: uk-animation-scale-up uk-transform-origin-top-right "
            >
              <div className="flex items-center justify-between gap-2 p-4 pb-1">
                <h3 className="font-bold text-xl"> Chats </h3>

                <div className="flex gap-2.5 text-lg text-slate-900 dark:text-white">
                  <ion-icon name="expand-outline"></ion-icon>
                  <ion-icon name="create-outline"></ion-icon>
                </div>
              </div>

              <div className="relative w-full p-2 px-3 ">
                <input
                  type="text"
                  className="w-full !pl-10 !rounded-lg dark:!bg-white/10"
                  placeholder="Search"
                />
                <ion-icon
                  name="search-outline"
                  className="dark:text-white absolute left-7 -translate-y-1/2 top-1/2"
                ></ion-icon>
              </div>

              <div className="h-80 overflow-y-auto pr-2">
                <div className="p-2 pt-0 pr-1 dark:text-white/80">
                  <a
                    href="#"
                    className="relative flex items-center gap-4 p-2 py-3 duration-200 rounded-lg hover:bg-secondery dark:hover:bg-white/10"
                  >
                    <div className="relative w-10 h-10 shrink-0">
                      <img
                        src="/images/avatars/avatar-2.jpg"
                        alt=""
                        className="object-cover w-full h-full rounded-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="mr-auto text-sm text-black dark:text-white font-medium">
                          Jesse Steeve
                        </div>
                        <div className="text-xs text-gray-500 dark:text-white/80">
                          {" "}
                          09:40AM{" "}
                        </div>
                        <div className="w-2.5 h-2.5 bg-blue-600 rounded-full dark:bg-slate-700"></div>
                      </div>
                      <div className="font-normal overflow-hidden text-ellipsis text-xs whitespace-nowrap">
                        Love your photos 😍
                      </div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="relative flex items-center gap-4 p-2 py-3 duration-200 rounded-lg hover:bg-secondery dark:hover:bg-white/10"
                  >
                    <div className="relative w-10 h-10 shrink-0">
                      <img
                        src="/images/avatars/avatar-4.jpg"
                        alt=""
                        className="object-cover w-full h-full rounded-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="mr-auto text-sm text-black dark:text-white font-medium">
                          Martin Gray
                        </div>
                        <div className="text-xs text-gray-500 dark:text-white/80">
                          {" "}
                          02:40AM{" "}
                        </div>
                      </div>
                      <div className="font-normal overflow-hidden text-ellipsis text-xs whitespace-nowrap">
                        Product photographer wanted? 📷
                      </div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="relative flex items-center gap-4 p-2 py-3 duration-200 rounded-lg hover:bg-secondery dark:hover:bg-white/10"
                  >
                    <div className="relative w-10 h-10 shrink-0">
                      <img
                        src="/images/avatars/avatar-5.jpg"
                        alt=""
                        className="object-cover w-full h-full rounded-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="mr-auto text-sm text-black dark:text-white font-medium">
                          Jesse Steeve
                        </div>
                        <div className="text-xs text-gray-500 dark:text-white/80">
                          {" "}
                          2 day{" "}
                        </div>
                      </div>
                      <div className="font-normal overflow-hidden text-ellipsis text-xs whitespace-nowrap">
                        Want to buy landscape photo? 🌄
                      </div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="relative flex items-center gap-4 p-2 py-3 duration-200 rounded-lg hover:bg-secondery dark:hover:bg-white/10"
                  >
                    <div className="relative w-10 h-10 shrink-0">
                      <img
                        src="/images/avatars/avatar-3.jpg"
                        alt=""
                        className="object-cover w-full h-full rounded-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="mr-auto text-sm text-black dark:text-white font-medium">
                          Monroe Parker
                        </div>
                        <div className="text-xs text-gray-500 dark:text-white/80">
                          {" "}
                          4 week{" "}
                        </div>
                        <div className="w-2.5 h-2.5 bg-blue-600 rounded-full dark:bg-slate-700"></div>
                      </div>
                      <div className="font-normal overflow-hidden text-ellipsis text-xs whitespace-nowrap">
                        I’m glad you like it.😊
                      </div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="relative flex items-center gap-4 p-2 py-3 duration-200 rounded-lg hover:bg-secondery dark:hover:bg-white/10"
                  >
                    <div className="relative w-10 h-10 shrink-0">
                      <img
                        src="/images/avatars/avatar-7.jpg"
                        alt=""
                        className="object-cover w-full h-full rounded-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="mr-auto text-sm text-black dark:text-white font-medium">
                          Alex Dolve
                        </div>
                        <div className="text-xs text-gray-500 dark:text-white/80">
                          {" "}
                          2 month{" "}
                        </div>
                      </div>
                      <div className="font-normal overflow-hidden text-ellipsis text-xs whitespace-nowrap">
                        Photo editor needed. Fix photos? 🛠️
                      </div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="relative flex items-center gap-4 p-2 py-3 duration-200 rounded-lg hover:bg-secondery dark:hover:bg-white/10"
                  >
                    <div className="relative w-10 h-10 shrink-0">
                      <img
                        src="/images/avatars/avatar-4.jpg"
                        alt=""
                        className="object-cover w-full h-full rounded-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="mr-auto text-sm text-black dark:text-white font-medium">
                          Jesse Steeve
                        </div>
                        <div className="text-xs text-gray-500 dark:text-white/80">
                          {" "}
                          09:40AM{" "}
                        </div>
                      </div>
                      <div className="font-normal overflow-hidden text-ellipsis text-xs whitespace-nowrap">
                        Love your photos 😍
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <a href="#">
                <div className="text-center py-4 border-t border-slate-100 text-sm font-medium text-blue-600 dark:text-white dark:border-gray-600">
                  {" "}
                  See all Messages{" "}
                </div>
              </a>

              <div className="w-3 h-3 absolute -top-1.5 right-3 bg-white border-l border-t rotate-45 max-md:hidden dark:bg-dark3 dark:border-transparent"></div>
            </div> */}

            <div className="rounded-full relative bg-secondery cursor-pointer shrink-0">
              <img
                src={avatar || "/images/avatars/avatar-2.jpg"}
                alt=""
                className="sm:w-9 sm:h-9 w-7 h-7 rounded-full shadow shrink-0"
              />
            </div>

            <div
              className="hidden bg-white rounded-lg drop-shadow-xl dark:bg-slate-700 w-64 border2"
              uk-drop="offset:6;pos: bottom-right;animate-out: true; animation: uk-animation-scale-up uk-transform-origin-top-right "
            >
              <a href="/mypage">
                <div className="p-4 py-5 flex items-center gap-4">
                  <img
                    src={avatar || "/images/avatars/avatar-2.jpg"}
                    alt=""
                    className="w-10 h-10 rounded-full shadow"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-black">
                      {nickname}님
                    </h4>
                    <div className="text-sm mt-1 text-blue-600 font-light dark:text-white/70">
                      {user.email}
                    </div>
                  </div>
                </div>
              </a>

              <hr className="dark:border-gray-600/60" />

              <nav className="p-2 text-sm text-black font-normal dark:text-white">
                <Button
                  onClick={() => {
                    signOut();
                    getSession();
                  }}
                >
                  <div className="flex items-center gap-2.5 hover:bg-secondery p-2 px-2.5 rounded-md dark:hover:bg-white/10">
                    <svg
                      className="w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      ></path>
                    </svg>
                    Log Out
                  </div>
                </Button>
              </nav>
            </div>

            <div className="flex items-center gap-2 hidden">
              <img
                src="/images/avatars/avatar-2.jpg"
                alt=""
                className="w-9 h-9 rounded-full shadow"
              />

              <div className="w-20 font-semibold text-gray-600"> Hamse </div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full justify-end">
          <Button
            color="primary"
            size="sm"
            onClick={() => {
              router.push("/login");
            }}
          >
            로그인
          </Button>
        </div>
      )}
    </div>
  );
}
