"use client";
import React from "react";
import Script from "next/script";
import BottomNavigation from "@/app/components/BottomNavigation";
import { usePathname } from "next/navigation";
import { FcSupport } from "react-icons/fc";
import { FcBusinessman } from "react-icons/fc";
import Link from "next/link";
function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isNotification = pathname === "/notification";
  const isBoast = pathname === "/boast";
  const isReview = pathname === "/review";
  const isWrite = pathname === "/write";
  const isMypage = pathname === "/mypage";

  return (
    <>
      <header class="z-[100] h-[--m-top] fixed top-0 left-0 w-full flex items-center bg-white/80 sky-50 backdrop-blur-xl border-b border-slate-200 dark:bg-dark2 dark:border-slate-800">
        <div class="flex items-center w-full xl:px-6 px-2 max-lg:gap-10">
          <div class="w-[50vw] 2xl:w-[--w-side] lg:w-[--w-side-sm]">
            <div class="flex items-center gap-1 w-full">
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
                    src="/images/logo.png"
                    alt=""
                    class="w-28 md:block hidden dark:!hidden"
                  />
                  <img
                    src="/images/logo-light.png"
                    alt=""
                    class="dark:md:block hidden"
                  />
                  <img
                    src="/images/logo.png"
                    class="hidden max-md:block w-20 dark:!hidden"
                    alt=""
                  />
                  <img
                    src="/images/logo-mobile-light.png"
                    class="hidden dark:max-md:block w-20"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
          <div class="flex-1 relative">
            <div class="max-w-[1220px] mx-auto flex items-center">
              {/* <div id="search--box" class="xl:w-[680px] sm:w-96 sm:relative rounded-xl overflow-hidden z-20 bg-secondery max-md:hidden w-screen left-0 max-sm:fixed max-sm:top-2 dark:!bg-white/5">
                        <ion-icon name="search" class="absolute left-4 top-1/2 -translate-y-1/2"></ion-icon>
                        <input type="text" placeholder="Search Friends, videos .." class="w-full !pl-10 !font-normal !bg-transparent h-12 !text-sm"/>
                    </div>   */}
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

              <div class="flex items-center sm:gap-4 gap-2 absolute right-5 top-1/2 -translate-y-1/2 text-black">
                <div
                  class="hidden bg-white p-4 rounded-lg overflow-hidden drop-shadow-xl dark:bg-slate-700 md:w-[324px] w-screen border2"
                  uk-drop="offset:6;pos: bottom-right; mode: click; animate-out: true; animation: uk-animation-scale-up uk-transform-origin-top-right "
                >
                  <h3 class="font-bold text-md"> Create </h3>

                  <div
                    class="mt-4"
                    tabindex="-1"
                    uk-slider="finite:true;sets: true"
                  >
                    <div class="uk-slider-container pb-1">
                      <ul
                        class="uk-slider-items grid-small"
                        uk-scrollspy="target: > li; cls: uk-animation-scale-up , uk-animation-slide-right-small; delay: 20 ;repeat: true"
                      >
                        <li class="w-28" uk-scrollspy-class="uk-animation-fade">
                          <div class="p-3 px-4 rounded-lg bg-teal-100/60 text-teal-600 dark:text-white dark:bg-dark4">
                            <ion-icon
                              name="book"
                              class="text-2xl drop-shadow-md"
                            ></ion-icon>
                            <div class="mt-1.5 text-sm font-medium">
                              {" "}
                              Story{" "}
                            </div>
                          </div>
                        </li>
                        <li class="w-28">
                          <div class="p-3 px-4 rounded-lg bg-sky-100/60 text-sky-600 dark:text-white dark:bg-dark4">
                            <ion-icon
                              name="camera"
                              class="text-2xl drop-shadow-md"
                            ></ion-icon>
                            <div class="mt-1.5 text-sm font-medium"> Post </div>
                          </div>
                        </li>
                        <li class="w-28">
                          <div class="p-3 px-4 rounded-lg bg-purple-100/60 text-purple-600 dark:text-white dark:bg-dark4">
                            <ion-icon
                              name="videocam"
                              class="text-2xl drop-shadow-md"
                            ></ion-icon>
                            <div class="mt-1.5 text-sm font-medium"> Reel </div>
                          </div>
                        </li>
                        <li class="w-28">
                          <div class="p-3 px-4 rounded-lg bg-pink-100/60 text-pink-600 dark:text-white dark:bg-dark4">
                            <ion-icon
                              name="location"
                              class="text-2xl drop-shadow-md"
                            ></ion-icon>
                            <div class="mt-1.5 text-sm font-medium">
                              {" "}
                              location{" "}
                            </div>
                          </div>
                        </li>
                        <li class="w-28">
                          <div class="p-3 px-4 rounded-lg bg-sky-100/70 text-sky-600 dark:text-white dark:bg-dark4">
                            <ion-icon
                              name="happy"
                              class="text-2xl  drop-shadow-md"
                            ></ion-icon>
                            <div class="mt-1.5 text-sm font-medium">
                              {" "}
                              Status{" "}
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div class="dark:hidden">
                      <a
                        class="absolute -translate-y-1/2 top-1/2 -left-4 flex items-center w-8 h-full px-1.5 justify-start bg-gradient-to-r from-white via-white dark:from-slate-600 dark:via-slate-500 dark:from-transparent dark:via-transparent"
                        href="#"
                        uk-slider-item="previous"
                      >
                        {" "}
                        <ion-icon
                          name="chevron-back"
                          class="text-xl dark:text-white"
                        ></ion-icon>{" "}
                      </a>
                      <a
                        class="absolute -translate-y-1/2 top-1/2 -right-4 flex items-center w-8 h-full px-1.5 justify-end bg-gradient-to-l from-white via-white dark:from-transparent dark:via-transparent"
                        href="#"
                        uk-slider-item="next"
                      >
                        {" "}
                        <ion-icon
                          name="chevron-forward"
                          class="text-xl dark:text-white"
                        ></ion-icon>{" "}
                      </a>
                    </div>

                    <div class="justify-center mt-2 -mb-2 hidden dark:flex">
                      <ul class="inline-flex flex-wrap justify-center gap-1 uk-dotnav uk-slider-nav">
                        {" "}
                      </ul>
                    </div>
                  </div>

                  <ul
                    class="-m-1 mt-4 pb-1 text-xs text-gray-500 dark:text-white"
                    uk-scrollspy="target: > li; cls: uk-animation-scale-up , uk-animation-slide-bottom-small ;repeat: true"
                  >
                    <li class="flex items-center gap-4 hover:bg-secondery rounded-md p-1.5 cursor-pointer dark:hover:bg-white/10">
                      <img src="/images/icons/group.png" alt="" class="w-7" />
                      <div class="flex-1">
                        <a href="timeline.html">
                          <h4 class="font-medium text-sm text-black dark:text-white">
                            {" "}
                            Groups{" "}
                          </h4>
                        </a>
                        <div class="mt-1 text-xs text-gray-500 dark:text-white">
                          {" "}
                          Meet people with similar interests.{" "}
                        </div>
                      </div>
                    </li>
                    <li class="flex items-center gap-4 hover:bg-secondery rounded-md p-1.5 cursor-pointer dark:hover:bg-white/10">
                      <img src="/images/icons/page.png" alt="" class="w-7" />
                      <div class="flex-1">
                        <a href="timeline.html">
                          <h4 class="font-medium text-sm text-black dark:text-white">
                            {" "}
                            Pages{" "}
                          </h4>
                        </a>
                        <div class="mt-1">
                          {" "}
                          Find and connect with businesses.
                        </div>
                      </div>
                    </li>
                    <li class="flex items-center gap-4 hover:bg-secondery rounded-md p-1.5 cursor-pointer dark:hover:bg-white/10">
                      <img src="/images/icons/event.png" class="w-7" />
                      <div class="flex-1">
                        <a href="timeline.html">
                          <h4 class="font-medium text-sm text-black dark:text-white">
                            {" "}
                            Event{" "}
                          </h4>
                        </a>
                        <div class="mt-1">
                          Discover fun activities near you .
                        </div>
                      </div>
                    </li>
                    <li class="flex items-center gap-4 hover:bg-secondery rounded-md p-1.5 cursor-pointer dark:hover:bg-white/10">
                      <img src="/images/icons/market.png" class="w-8 -ml-1" />
                      <div class="flex-1">
                        <a href="timeline.html">
                          <h4 class="font-medium text-sm text-black dark:text-white">
                            {" "}
                            Event{" "}
                          </h4>
                        </a>
                        <div class="mt-1">Find local buyers and sellers .</div>
                      </div>
                    </li>
                    <li class="flex items-center gap-4 hover:bg-secondery rounded-md p-1.5 cursor-pointer dark:hover:bg-white/10">
                      <img src="/images/icons/game.png" alt="" class="w-7" />
                      <div class="flex-1">
                        <a href="timeline.html">
                          <h4 class="font-medium text-sm text-black dark:text-white">
                            {" "}
                            Games{" "}
                          </h4>
                        </a>
                        <div class="mt-1">
                          {" "}
                          play game with friends have fun.{" "}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                
                
                <div className="flex flex-row gap-x-5 ">
                  <button
                    type="button"
                    class="sm:p-2 p-1 rounded-full relative sm:bg-secondery dark:text-white"
                    uk-tooltip="title: Notification; pos: bottom; offset:6"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-6 h-6 max-sm:hidden"
                    >
                      <path d="M5.85 3.5a.75.75 0 00-1.117-1 9.719 9.719 0 00-2.348 4.876.75.75 0 001.479.248A8.219 8.219 0 015.85 3.5zM19.267 2.5a.75.75 0 10-1.118 1 8.22 8.22 0 011.987 4.124.75.75 0 001.48-.248A9.72 9.72 0 0019.266 2.5z" />
                      <path
                        fill-rule="evenodd"
                        d="M12 2.25A6.75 6.75 0 005.25 9v.75a8.217 8.217 0 01-2.119 5.52.75.75 0 00.298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 107.48 0 24.583 24.583 0 004.83-1.244.75.75 0 00.298-1.205 8.217 8.217 0 01-2.118-5.52V9A6.75 6.75 0 0012 2.25zM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 004.496 0l.002.1a2.25 2.25 0 11-4.5 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <div class="absolute top-0 right-0 -m-1 bg-red-600 text-white text-xs px-1 rounded-full">
                      6
                    </div>
                    <ion-icon
                      name="notifications-outline"
                      class="sm:hidden text-2xl"
                    ></ion-icon>
                  </button>
                  <div
                    class="hidden bg-white pr-1.5 rounded-lg drop-shadow-xl dark:bg-slate-700 md:w-[365px] w-screen border2"
                    uk-drop="offset:6;pos: bottom-right; mode: click; animate-out: true; animation: uk-animation-scale-up uk-transform-origin-top-right "
                  >
                    <div class="flex items-center justify-between gap-2 p-4 pb-2">
                      <h3 class="font-bold text-xl"> Notifications </h3>

                      <div class="flex gap-2.5">
                        <button
                          type="button"
                          class="p-1 flex rounded-full focus:bg-secondery dark:text-white"
                        >
                          {" "}
                          <ion-icon
                            class="text-xl"
                            name="ellipsis-horizontal"
                          ></ion-icon>{" "}
                        </button>
                        <div
                          class="w-[280px] group"
                          uk-dropdown="pos: bottom-right; animation: uk-animation-scale-up uk-transform-origin-top-right; animate-out: true; mode: click; offset:5"
                        >
                          <nav class="text-sm">
                            <a href="#">
                              {" "}
                              <ion-icon
                                class="text-xl shrink-0"
                                name="checkmark-circle-outline"
                              ></ion-icon>{" "}
                              Mark all as read
                            </a>
                            <a href="#">
                              {" "}
                              <ion-icon
                                class="text-xl shrink-0"
                                name="settings-outline"
                              ></ion-icon>{" "}
                              Notification setting
                            </a>
                            <a href="#">
                              {" "}
                              <ion-icon
                                class="text-xl shrink-0"
                                name="notifications-off-outline"
                              ></ion-icon>{" "}
                              Mute Notification{" "}
                            </a>
                          </nav>
                        </div>
                      </div>
                    </div>

                    <div class="text-sm h-[400px] w-full overflow-y-auto pr-2">
                      <div class="pl-2 p-1 text-sm font-normal dark:text-white">
                        <a
                          href="#"
                          class="relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery dark:hover:bg-white/10 bg-teal-500/5"
                        >
                          <div class="relative w-12 h-12 shrink-0">
                            {" "}
                            <img
                              src="/images/avatars/avatar-3.jpg"
                              alt=""
                              class="object-cover w-full h-full rounded-full"
                            />
                          </div>
                          <div class="flex-1 ">
                            <p>
                              {" "}
                              <b class="font-bold mr-1"> Alexa Gray</b> started
                              following you. Welcome him to your profile. 👋{" "}
                            </p>
                            <div class="text-xs text-gray-500 mt-1.5 dark:text-white/80">
                              {" "}
                              4 hours ago{" "}
                            </div>
                            <div class="w-2.5 h-2.5 bg-teal-600 rounded-full absolute right-3 top-5"></div>
                          </div>
                        </a>
                        <a
                          href="#"
                          class="relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery dark:hover:bg-white/10"
                        >
                          <div class="relative w-12 h-12 shrink-0">
                            {" "}
                            <img
                              src="/images/avatars/avatar-7.jpg"
                              alt=""
                              class="object-cover w-full h-full rounded-full"
                            />
                          </div>
                          <div class="flex-1 ">
                            <p>
                              {" "}
                              <b class="font-bold mr-1">Jesse Steeve</b>{" "}
                              mentioned you in a story. Check it out and reply.
                              📣{" "}
                            </p>
                            <div class="text-xs text-gray-500 mt-1.5 dark:text-white/80">
                              {" "}
                              8 hours ago{" "}
                            </div>
                          </div>
                        </a>
                        <a
                          href="#"
                          class="relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery dark:hover:bg-white/10"
                        >
                          <div class="relative w-12 h-12 shrink-0">
                            {" "}
                            <img
                              src="/images/avatars/avatar-6.jpg"
                              alt=""
                              class="object-cover w-full h-full rounded-full"
                            />
                          </div>
                          <div class="flex-1 ">
                            <p>
                              {" "}
                              <b class="font-bold mr-1"> Alexa stella</b>{" "}
                              commented on your photo “Wow, stunning shot!” 💬{" "}
                            </p>
                            <div class="text-xs text-gray-500 mt-1.5 dark:text-white/80">
                              {" "}
                              8 hours ago{" "}
                            </div>
                          </div>
                        </a>
                        <a
                          href="#"
                          class="relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery dark:hover:bg-white/10"
                        >
                          <div class="relative w-12 h-12 shrink-0">
                            {" "}
                            <img
                              src="/images/avatars/avatar-2.jpg"
                              alt=""
                              class="object-cover w-full h-full rounded-full"
                            />
                          </div>
                          <div class="flex-1 ">
                            <p>
                              {" "}
                              <b class="font-bold mr-1"> John Michael</b> who
                              you might know, is on socialite.
                            </p>
                            <div class="text-xs text-gray-500 mt-1.5 dark:text-white/80">
                              {" "}
                              2 hours ago{" "}
                            </div>
                          </div>
                          <button
                            type="button"
                            class="button text-white bg-primary"
                          >
                            fallow
                          </button>
                        </a>
                        <a
                          href="#"
                          class="relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery dark:hover:bg-white/10 bg-teal-500/5"
                        >
                          <div class="relative w-12 h-12 shrink-0">
                            {" "}
                            <img
                              src="/images/avatars/avatar-3.jpg"
                              alt=""
                              class="object-cover w-full h-full rounded-full"
                            />
                          </div>
                          <div class="flex-1 ">
                            <p>
                              {" "}
                              <b class="font-bold mr-1"> Sarah Gray</b> sent you
                              a message. He wants to chat with you. 💖{" "}
                            </p>
                            <div class="text-xs text-gray-500 mt-1.5 dark:text-white/80">
                              {" "}
                              4 hours ago{" "}
                            </div>
                            <div class="w-2.5 h-2.5 bg-teal-600 rounded-full absolute right-3 top-5"></div>
                          </div>
                        </a>
                        <a
                          href="#"
                          class="relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery dark:hover:bg-white/10"
                        >
                          <div class="relative w-12 h-12 shrink-0">
                            {" "}
                            <img
                              src="/images/avatars/avatar-4.jpg"
                              alt=""
                              class="object-cover w-full h-full rounded-full"
                            />
                          </div>
                          <div class="flex-1 ">
                            <p>
                              {" "}
                              <b class="font-bold mr-1"> Jesse Steeve</b> sarah
                              tagged you <br /> in a photo of your birthday
                              party. 📸{" "}
                            </p>
                            <div class="text-xs text-gray-500 mt-1.5 dark:text-white/80">
                              {" "}
                              8 hours ago{" "}
                            </div>
                          </div>
                        </a>
                        <a
                          href="#"
                          class="relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery dark:hover:bg-white/10"
                        >
                          <div class="relative w-12 h-12 shrink-0">
                            {" "}
                            <img
                              src="/images/avatars/avatar-2.jpg"
                              alt=""
                              class="object-cover w-full h-full rounded-full"
                            />
                          </div>
                          <div class="flex-1 ">
                            <p>
                              {" "}
                              <b class="font-bold mr-1"> Lewis Lewis</b>{" "}
                              mentioned you in a story. Check it out and reply.
                              📣{" "}
                            </p>
                            <div class="text-xs text-gray-500 mt-1.5 dark:text-white/80">
                              {" "}
                              8 hours ago{" "}
                            </div>
                          </div>
                        </a>
                        <a
                          href="#"
                          class="relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery dark:hover:bg-white/10"
                        >
                          <div class="relative w-12 h-12 shrink-0">
                            {" "}
                            <img
                              src="/images/avatars/avatar-7.jpg"
                              alt=""
                              class="object-cover w-full h-full rounded-full"
                            />
                          </div>
                          <div class="flex-1 ">
                            <p>
                              {" "}
                              <b class="font-bold mr-1"> Martin Gray</b> liked
                              your photo of the Eiffel Tower. 😍{" "}
                            </p>
                            <div class="text-xs text-gray-500 mt-1.5 dark:text-white/80">
                              {" "}
                              8 hours ago{" "}
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>

                    <Link href="/notification">
                      <div class="text-center py-4 border-t border-slate-100 text-sm font-medium text-blue-600 dark:text-white dark:border-gray-600">
                        {" "}
                        View Notifications{" "}
                      </div>
                    </Link>

                    <div class="w-3 h-3 absolute -top-1.5 right-3 bg-white border-l border-t rotate-45 max-md:hidden dark:bg-dark3 dark:border-transparent"></div>
                  </div>

                  <div
                    class="hidden bg-white pr-1.5 rounded-lg drop-shadow-xl dark:bg-slate-700 md:w-[360px] w-screen border2"
                    uk-drop="offset:6;pos: bottom-right; mode: click; animate-out: true; animation: uk-animation-scale-up uk-transform-origin-top-right "
                  >
                    <div class="flex items-center justify-between gap-2 p-4 pb-1">
                      <h3 class="font-bold text-xl"> Chats </h3>

                      <div class="flex gap-2.5 text-lg text-slate-900 dark:text-white">
                        <ion-icon name="expand-outline"></ion-icon>
                        <ion-icon name="create-outline"></ion-icon>
                      </div>
                    </div>

                    <div class="relative w-full p-2 px-3 ">
                      <input
                        type="text"
                        class="w-full !pl-10 !rounded-lg dark:!bg-white/10"
                        placeholder="Search"
                      />
                      <ion-icon
                        name="search-outline"
                        class="dark:text-white absolute left-7 -translate-y-1/2 top-1/2"
                      ></ion-icon>
                    </div>

                    <div class="h-80 overflow-y-auto pr-2">
                      <div class="p-2 pt-0 pr-1 dark:text-white/80">
                        <a
                          href="#"
                          class="relative flex items-center gap-4 p-2 py-3 duration-200 rounded-lg hover:bg-secondery dark:hover:bg-white/10"
                        >
                          <div class="relative w-10 h-10 shrink-0">
                            <img
                              src="/images/avatars/avatar-2.jpg"
                              alt=""
                              class="object-cover w-full h-full rounded-full"
                            />
                          </div>
                          <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-2 mb-1">
                              <div class="mr-auto text-sm text-black dark:text-white font-medium">
                                Jesse Steeve
                              </div>
                              <div class="text-xs text-gray-500 dark:text-white/80">
                                {" "}
                                09:40AM{" "}
                              </div>
                              <div class="w-2.5 h-2.5 bg-blue-600 rounded-full dark:bg-slate-700"></div>
                            </div>
                            <div class="font-normal overflow-hidden text-ellipsis text-xs whitespace-nowrap">
                              Love your photos 😍
                            </div>
                          </div>
                        </a>
                        <a
                          href="#"
                          class="relative flex items-center gap-4 p-2 py-3 duration-200 rounded-lg hover:bg-secondery dark:hover:bg-white/10"
                        >
                          <div class="relative w-10 h-10 shrink-0">
                            <img
                              src="/images/avatars/avatar-4.jpg"
                              alt=""
                              class="object-cover w-full h-full rounded-full"
                            />
                          </div>
                          <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-2 mb-1">
                              <div class="mr-auto text-sm text-black dark:text-white font-medium">
                                Martin Gray
                              </div>
                              <div class="text-xs text-gray-500 dark:text-white/80">
                                {" "}
                                02:40AM{" "}
                              </div>
                            </div>
                            <div class="font-normal overflow-hidden text-ellipsis text-xs whitespace-nowrap">
                              Product photographer wanted? 📷
                            </div>
                          </div>
                        </a>
                        <a
                          href="#"
                          class="relative flex items-center gap-4 p-2 py-3 duration-200 rounded-lg hover:bg-secondery dark:hover:bg-white/10"
                        >
                          <div class="relative w-10 h-10 shrink-0">
                            <img
                              src="/images/avatars/avatar-5.jpg"
                              alt=""
                              class="object-cover w-full h-full rounded-full"
                            />
                          </div>
                          <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-2 mb-1">
                              <div class="mr-auto text-sm text-black dark:text-white font-medium">
                                Jesse Steeve
                              </div>
                              <div class="text-xs text-gray-500 dark:text-white/80">
                                {" "}
                                2 day{" "}
                              </div>
                            </div>
                            <div class="font-normal overflow-hidden text-ellipsis text-xs whitespace-nowrap">
                              Want to buy landscape photo? 🌄
                            </div>
                          </div>
                        </a>
                        <a
                          href="#"
                          class="relative flex items-center gap-4 p-2 py-3 duration-200 rounded-lg hover:bg-secondery dark:hover:bg-white/10"
                        >
                          <div class="relative w-10 h-10 shrink-0">
                            <img
                              src="/images/avatars/avatar-3.jpg"
                              alt=""
                              class="object-cover w-full h-full rounded-full"
                            />
                          </div>
                          <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-2 mb-1">
                              <div class="mr-auto text-sm text-black dark:text-white font-medium">
                                Monroe Parker
                              </div>
                              <div class="text-xs text-gray-500 dark:text-white/80">
                                {" "}
                                4 week{" "}
                              </div>
                              <div class="w-2.5 h-2.5 bg-blue-600 rounded-full dark:bg-slate-700"></div>
                            </div>
                            <div class="font-normal overflow-hidden text-ellipsis text-xs whitespace-nowrap">
                              I’m glad you like it.😊
                            </div>
                          </div>
                        </a>
                        <a
                          href="#"
                          class="relative flex items-center gap-4 p-2 py-3 duration-200 rounded-lg hover:bg-secondery dark:hover:bg-white/10"
                        >
                          <div class="relative w-10 h-10 shrink-0">
                            <img
                              src="/images/avatars/avatar-7.jpg"
                              alt=""
                              class="object-cover w-full h-full rounded-full"
                            />
                          </div>
                          <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-2 mb-1">
                              <div class="mr-auto text-sm text-black dark:text-white font-medium">
                                Alex Dolve
                              </div>
                              <div class="text-xs text-gray-500 dark:text-white/80">
                                {" "}
                                2 month{" "}
                              </div>
                            </div>
                            <div class="font-normal overflow-hidden text-ellipsis text-xs whitespace-nowrap">
                              Photo editor needed. Fix photos? 🛠️
                            </div>
                          </div>
                        </a>
                        <a
                          href="#"
                          class="relative flex items-center gap-4 p-2 py-3 duration-200 rounded-lg hover:bg-secondery dark:hover:bg-white/10"
                        >
                          <div class="relative w-10 h-10 shrink-0">
                            <img
                              src="/images/avatars/avatar-4.jpg"
                              alt=""
                              class="object-cover w-full h-full rounded-full"
                            />
                          </div>
                          <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-2 mb-1">
                              <div class="mr-auto text-sm text-black dark:text-white font-medium">
                                Jesse Steeve
                              </div>
                              <div class="text-xs text-gray-500 dark:text-white/80">
                                {" "}
                                09:40AM{" "}
                              </div>
                            </div>
                            <div class="font-normal overflow-hidden text-ellipsis text-xs whitespace-nowrap">
                              Love your photos 😍
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>

                    <a href="#">
                      <div class="text-center py-4 border-t border-slate-100 text-sm font-medium text-blue-600 dark:text-white dark:border-gray-600">
                        {" "}
                        See all Messages{" "}
                      </div>
                    </a>

                    <div class="w-3 h-3 absolute -top-1.5 right-3 bg-white border-l border-t rotate-45 max-md:hidden dark:bg-dark3 dark:border-transparent"></div>
                  </div>

                  <div class="rounded-full relative bg-secondery cursor-pointer shrink-0">
                    <img
                      src="/images/avatars/avatar-2.jpg"
                      alt=""
                      class="sm:w-9 sm:h-9 w-7 h-7 rounded-full shadow shrink-0"
                    />
                  </div>
                  <div
                    class="hidden bg-white rounded-lg drop-shadow-xl dark:bg-slate-700 w-64 border2"
                    uk-drop="offset:6;pos: bottom-right;animate-out: true; animation: uk-animation-scale-up uk-transform-origin-top-right "
                  >
                    <a href="/mypage">
                      <div class="p-4 py-5 flex items-center gap-4">
                        <img
                          src="/images/avatars/avatar-2.jpg"
                          alt=""
                          class="w-10 h-10 rounded-full shadow"
                        />
                        <div class="flex-1">
                          <h4 class="text-sm font-medium text-black">
                            Stell johnson
                          </h4>
                          <div class="text-sm mt-1 text-blue-600 font-light dark:text-white/70">
                            @mohnson
                          </div>
                        </div>
                      </div>
                    </a>

                    <hr class="dark:border-gray-600/60" />

                    <nav class="p-2 text-sm text-black font-normal dark:text-white">
                      <a href="form-login.html">
                        <div class="flex items-center gap-2.5 hover:bg-secondery p-2 px-2.5 rounded-md dark:hover:bg-white/10">
                          <svg
                            class="w-6"
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
                      </a>
                    </nav>
                  </div>

                  <div class="flex items-center gap-2 hidden">
                    <img
                      src="/images/avatars/avatar-2.jpg"
                      alt=""
                      class="w-9 h-9 rounded-full shadow"
                    />

                    <div class="w-20 font-semibold text-gray-600"> Hamse </div>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      class="w-5 h-5"
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

            {/* <div class="font-medium text-sm text-black border-t pt-3 mt-2 dark:text-white dark:border-slate-800">
              <div class="px-3 pb-2 text-sm font-medium">
                <div class="text-black dark:text-white">Shortcut</div>
              </div>
              <a href="#">
                <div class="flex items-center gap-2 p-3 px-4 rounded-xl hover:bg-secondery">
                  <img
                    src="/images/avatars/avatar-2.jpg"
                    alt=""
                    class="w-6 rounded-full object-cover"
                  />
                  <div> Marin Gray</div>
                </div>
              </a>
              <a href="#">
                <div class="flex items-center gap-2 p-3 px-4 rounded-xl hover:bg-secondery">
                  <img
                    src="/images/avatars/avatar-7.jpg"
                    alt=""
                    class="w-6 rounded-full object-cover"
                  />
                  <div> Alexa Stella</div>
                </div>
              </a>
              <a href="#">
                <div class="flex items-center gap-2 p-3 px-4 rounded-xl hover:bg-secondery">
                  <img
                    src="/images/avatars/avatar-3.jpg"
                    alt=""
                    class="w-6 rounded-full object-cover"
                  />
                  <div> Sarah Ali</div>
                </div>
              </a>
            </div> */}

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
                <li class>
                  <a href="/master">
                    <FcBusinessman />
                    <span className="font-bold">관리자</span>
                  </a>
                </li>
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
