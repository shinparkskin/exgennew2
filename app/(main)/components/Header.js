"use client";
import { useState, useEffect,useRef } from "react";
import Script from "next/script";
// import BottomNavigation from "@/app/(main)/components/BottomNavigation";
import BottomNavigation from "../../../app/(main)/components/BottomNavigation";
import { usePathname } from "next/navigation";
import { FcSupport } from "react-icons/fc";
import { FcBusinessman } from "react-icons/fc";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import LoginInfo from "./LoginInfo";
import { createClient } from "../../../utils/supabase/client";
function Header() {
  const [isReloaded, setIsReloaded] = useState(false);
  const [user, setUser] = useState(null);
  const roleRef = useRef(null);
  const pathname = usePathname();
  
  const isHomePage = pathname === "/";
  const isNotification = pathname === "/notification";
  const isBoast = pathname === "/boast";
  const isReview = pathname === "/review";
  const isWrite = pathname === "/write";
  const isMypage = pathname === "/mypage";
  const supabase = createClient();
  const fetchUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Error fetching user data:", error);
    } else {
      console.log("User data fetched successfully:", data);
      const userId = data.user.id;
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (profileError) {
        console.error("Error fetching profile data:", profileError);
      } else {
        console.log('profileData:',profileData)
        roleRef.current = profileData.role;
        setIsReloaded(true);        }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  console.log('role:',roleRef.current)

  return (
    <>
      <header class="z-[100] h-[--m-top] fixed top-0 left-0 w-full flex items-center bg-white border-b border-slate-200 dark:bg-dark2 dark:border-slate-800">
      <div class="flex items-center w-full xl:px-6 px-2 max-lg:gap-10 ">
          <div class="w-[50vw] 2xl:w-[--w-side] lg:w-[--w-side-sm] ">
            <div class="flex items-center gap-3 w-full">
              <button
                uk-toggle="target: #site__sidebar ; cls :!-translate-x-0"
                class="flex items-center justify-center w-8 h-8 text-xl rounded-full hover:bg-gray-100 xl:hidden dark:hover:bg-slate-600 group"
              >
                <ion-icon
                  name="menu-outline"
                  class="text-2xl group-aria-expanded:hidden"
                ></ion-icon>
                <ion-icon
                  name="close-outline"
                  class="hidden text-2xl group-aria-expanded:block"
                ></ion-icon>
              </button>
              <div
                id="logo"
                className="w-full h-auto md:w-1/2 md:h-auto relative"
              >
                <a href="/">
                  <img
                    src="/images/logo-new.png"
                    class="block w-10 md:w-15 md:ml-5"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
          <div class="flex-1 relative">
            <div class="max-w-[1220px] mx-auto flex items-center">

              <div
                class="hidden uk- open z-10"
                uk-drop="pos: bottom-center ; animation: uk-animation-slide-bottom-small;mode:click "
              >
                <div class="xl:w-[694px] sm:w-96 bg-white dark:bg-dark3 w-screen p-2 rounded-lg shadow-lg -mt-14 pt-14">
                  <div class="flex justify-between px-2 py-2.5 text-sm font-medium">
                    <div class=" text-black dark:text-white">Recent</div>
                    <button type="button" class="text-blue-500">
                      Clear
                    </button>
                  </div>
                  <nav class="text-sm font-medium text-black dark:text-white">
                    <a
                      href="#"
                      class=" relative px-3 py-1.5 flex items-center gap-4 hover:bg-secondery rounded-lg dark:hover:bg-white/10"
                    >
                      {" "}
                      <img
                        src="/images/avatars/avatar-2.jpg"
                        class="w-9 h-9 rounded-full"
                      />{" "}
                      <div>
                        {" "}
                        <div> Jesse Steeve </div>{" "}
                        <div class="text-xs text-blue-500 font-medium mt-0.5">
                          {" "}
                          Friend{" "}
                        </div>{" "}
                      </div>{" "}
                      <ion-icon
                        name="close"
                        class="text-base absolute right-3 top-1/2 -translate-y-1/2 "
                      ></ion-icon>{" "}
                    </a>
                    <a
                      href="#"
                      class=" relative px-3 py-1.5 flex items-center gap-4 hover:bg-secondery rounded-lg dark:hover:bg-white/10"
                    >
                      {" "}
                      <img
                        src="/images/avatars/avatar-2.jpg"
                        class="w-9 h-9 rounded-full"
                      />{" "}
                      <div>
                        {" "}
                        <div> Martin Gray </div>{" "}
                        <div class="text-xs text-blue-500 font-medium mt-0.5">
                          {" "}
                          Friend{" "}
                        </div>{" "}
                      </div>{" "}
                      <ion-icon
                        name="close"
                        class="text-base absolute right-3 top-1/2 -translate-y-1/2 "
                      ></ion-icon>{" "}
                    </a>
                    <a
                      href="#"
                      class=" relative px-3 py-1.5 flex items-center gap-4 hover:bg-secondery rounded-lg dark:hover:bg-white/10"
                    >
                      {" "}
                      <img
                        src="/images/group/group-2.jpg"
                        class="w-9 h-9 rounded-full"
                      />{" "}
                      <div>
                        {" "}
                        <div> Delicious Foods </div>{" "}
                        <div class="text-xs text-rose-500 font-medium mt-0.5">
                          {" "}
                          Group{" "}
                        </div>{" "}
                      </div>{" "}
                      <ion-icon
                        name="close"
                        class="text-base absolute right-3 top-1/2 -translate-y-1/2 "
                      ></ion-icon>{" "}
                    </a>
                    <a
                      href="#"
                      class=" relative px-3 py-1.5 flex items-center gap-4 hover:bg-secondery rounded-lg dark:hover:bg-white/10"
                    >
                      {" "}
                      <img
                        src="/images/group/group-1.jpg"
                        class="w-9 h-9 rounded-full"
                      />{" "}
                      <div>
                        {" "}
                        <div> Delicious Foods </div>{" "}
                        <div class="text-xs text-yellow-500 font-medium mt-0.5">
                          {" "}
                          Page{" "}
                        </div>{" "}
                      </div>{" "}
                      <ion-icon
                        name="close"
                        class="text-base absolute right-3 top-1/2 -translate-y-1/2 "
                      ></ion-icon>{" "}
                    </a>
                    <a
                      href="#"
                      class=" relative px-3 py-1.5 flex items-center gap-4 hover:bg-secondery rounded-lg dark:hover:bg-white/10"
                    >
                      {" "}
                      <img
                        src="/images/avatars/avatar-6.jpg"
                        class="w-9 h-9 rounded-full"
                      />{" "}
                      <div>
                        {" "}
                        <div> John Welim </div>{" "}
                        <div class="text-xs text-blue-500 font-medium mt-0.5">
                          {" "}
                          Friend{" "}
                        </div>{" "}
                      </div>{" "}
                      <ion-icon
                        name="close"
                        class="text-base absolute right-3 top-1/2 -translate-y-1/2 "
                      ></ion-icon>{" "}
                    </a>
                    <a
                      href="#"
                      class="hidden relative  px-3 py-1.5 flex items-center gap-4 hover:bg-secondery rounded-lg dark:hover:bg-white/10"
                    >
                      {" "}
                      <ion-icon
                        class="text-2xl"
                        name="search-outline"
                      ></ion-icon>{" "}
                      Creative ideas about Business{" "}
                    </a>
                    <a
                      href="#"
                      class="hidden relative  px-3 py-1.5 flex items-center gap-4 hover:bg-secondery rounded-lg dark:hover:bg-white/10"
                    >
                      {" "}
                      <ion-icon
                        class="text-2xl"
                        name="search-outline"
                      ></ion-icon>{" "}
                      8 Facts About Writting{" "}
                    </a>
                  </nav>
                  <hr class="-mx-2 mt-2 hidden" />
                  <div class="flex justify-end pr-2 text-sm font-medium text-red-500 hidden">
                    <a
                      href="#"
                      class="flex hover:bg-red-50 dark:hover:bg-slate-700 p-1.5 rounded"
                    >
                      {" "}
                      <ion-icon
                        name="trash"
                        class="mr-2 text-lg"
                      ></ion-icon>{" "}
                      Clear your history
                    </a>
                  </div>
                </div>
              </div>
              <LoginInfo></LoginInfo>
            </div>
          </div>
        </div>
        <Script src="/js/uikit.min.js" />
        <Script src="/js/simplebar.js" />
        <Script src="/js/script.js" />
        <Script
          type="module"
          src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
        />
        <Script
          noModule
          src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
        />
      </header>
      <div
        id="site__sidebar"
        class="fixed top-0 left-0 z-[99] pt-[--m-top] overflow-hidden transition-transform xl:duration-500 max-xl:w-full max-xl:-translate-x-full"
      >
        <div class="p-2 max-xl:bg-white shadow-sm 2xl:w-72 sm:w-64 w-[80%] h-[calc(100vh-64px)] relative z-30 max-lg:border-r dark:max-xl:!bg-slate-700 dark:border-slate-700">
          <div class="pr-4" data-simplebar>
            <nav id="side">
              <ul>
                <li className={isHomePage ? "active" : ""}>
                  <a href="/">
                    <img src="/images/icons/home.png" alt="feeds" class="w-6" />
                    <span className="font-bold"> 홈 </span>
                  </a>
                </li>
                {/* <li>
                                <a href="messages.html">
                                    <img src="/images/icons/message.png" alt="messages" class="w-5"/>
                                    <span> messages </span> 
                                </a>
                            </li> 
                            <li>
                                <a href="video.html">
                                    <img src="/images/icons/video.png" alt="messages" class="w-6"/>
                                    <span> video </span> 
                                </a>
                            </li> */}
                <li className={isNotification ? "active" : ""}>
                  <a href="/notification">
                    <img
                      src="/images/icons/event.png"
                      alt="messages"
                      class="w-6"
                    />
                    <span className="font-bold"> 공지사항 </span>
                  </a>
                </li>
                {/* <li>
                                <a href="pages.html">
                                    <img src="/images/icons/page.png" alt="pages" class="w-6"/>
                                    <span> Pages </span> 
                                </a>
                            </li> */}
                <li className={isBoast ? "active" : ""}>
                  <a href="/boast">
                    <img
                      src="/images/icons/group.png"
                      alt="groups"
                      class="w-6"
                    />
                    <span className="font-bold"> 자랑하기 </span>
                  </a>
                </li>

                <li className={isReview ? "active" : ""}>
                  <a href="/review">
                    <img src="/images/icons/blog.png" alt="blog" class="w-6" />
                    <span className="font-bold"> 리얼리뷰 </span>
                  </a>
                </li>
                <li className={isWrite ? "active" : ""}>
                  <a href="/write">
                    <img src="/images/icons/write.png" alt="blog" class="w-6" />
                    <span className="font-bold"> 글작성 </span>
                  </a>
                </li>
              </ul>

              {/* <button type="button" class="flex items-center gap-4 py-2 px-4 w-full font-medium text-sm text-black dark:text-white" uk-toggle="target: #show__more; cls: !hidden uk-animation-fade"> 
                            <svg class="bg-gray-200 rounded-full w-6 h-6 dark:bg-slate-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg> 
                            <span id="show__more"> See More </span> 
                            <span class="!hidden" id="show__more"> See Less </span> 
                        </button> */}
            </nav>

            <nav
              id="side"
              class="font-medium text-sm text-black border-t  dark:text-white dark:border-slate-800"
            >
              <div class="px-3 pb-2 text-sm font-medium">
                <div class="text-black dark:text-white"></div>
              </div>

              <ul class="mt-2 -space-y-2" uk-nav="multiple: true">
                <li class>
                  <a href="/mypage">
                    <FcSupport />
                    <span className="font-bold">마이페이지</span>
                  </a>
                </li>
                {isReloaded && roleRef.current == "master" && (
                  <li class>
                    <a href="/master">
                      <FcBusinessman />
                      <span className="font-bold">관리자</span>
                    </a>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>

        <div
          id="site__sidebar__overly"
          class="absolute top-0 left-0 z-20 w-screen h-screen xl:hidden backdrop-blur-sm"
          uk-toggle="target: #site__sidebar ; cls :!-translate-x-0"
        ></div>
      </div>
      <BottomNavigation></BottomNavigation>
    </>
  );
}

export default Header;
