import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";
import Link from "next/link";
import axios from "axios";
import HomeNotification from "./components/HomeNotification";
import HomeWeeklyNews from "./components/HomeWeeklyNews";

export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <>
      <div class="flex-1">
        <div class="lg:max-w-[680px] w-full">
          <HomeNotification></HomeNotification>
          <HomeWeeklyNews></HomeWeeklyNews>

          <div
            class="relative"
            tabindex="-1"
            uk-slider="auto play: true;finite: true"
          >
            <div class="my-6 flex-col items-center border-t pt-3 dark:border-slate-800 gap-y-5">
              <div className="flex justify-between">
                <div>
                  <h2 class="text-xl font-semibold text-black"> 자랑하기 </h2>
                </div>
                <div class="flex items-center gap-2 [&:has(a.uk-invisible)][&*>a]:bg-red-600">
                  <a
                    href="/boast"
                    class="text-blue-500 sm:block hidden text-sm"
                  >
                    더보기
                  </a>
                </div>
              </div>
              <div className="my-5">
                <ul
                  uk-tab
                  class="flex gap-2 flex-wrap text-sm text-center text-gray-600 capitalize font-semibold dark:text-white/80"
                  uk-switcher="connect: #ttabs ; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium"
                >
                  <li>
                    <a
                      href="#"
                      class="inline-flex items-center gap-2 py-2 px-2.5 pr-3 bg-slate-200/60 rounded-full aria-expanded:bg-black aria-expanded:text-white aria-expanded:dark:text-white aria-expanded:dark:border-white"
                    >
                      #상품권
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="inline-flex items-center gap-2 py-2 px-2.5 pr-3 bg-slate-200/60 rounded-full aria-expanded:bg-black aria-expanded:text-white aria-expanded:dark:text-white aria-expanded:dark:border-white"
                    >
                      #현금
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="inline-flex items-center gap-2 py-2 px-2.5 pr-3 bg-slate-200/60 rounded-full aria-expanded:bg-black aria-expanded:text-white aria-expanded:dark:text-white aria-expanded:dark:border-white"
                    >
                      #식사권
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="inline-flex items-center gap-2 py-2 px-2.5 pr-3 bg-slate-200/60 rounded-full aria-expanded:bg-black aria-expanded:text-white aria-expanded:dark:text-white aria-expanded:dark:border-white"
                    >
                      #방청권
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="inline-flex items-center gap-2 py-2 px-2.5 pr-3 bg-slate-200/60 rounded-full aria-expanded:bg-black aria-expanded:text-white aria-expanded:dark:text-white aria-expanded:dark:border-white"
                    >
                      #제품
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="grid gap-4">
                <div>
                  <img
                    className="h-auto max-w-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    className="h-auto max-w-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    className="h-auto max-w-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div className="grid gap-4">
                <div>
                  <img
                    className="h-auto max-w-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    className="h-auto max-w-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    className="h-auto max-w-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div className="hidden md:grid gap-4">
                <div>
                  <img
                    className="h-auto max-w-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    className="h-auto max-w-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    className="h-auto max-w-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div className="hidden md:grid gap-4">
                <div>
                  <img
                    className="h-auto max-w-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    className="h-auto max-w-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    className="h-auto max-w-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            class="relative"
            tabindex="-1"
            uk-slider="auto play: true;finite: true"
          >
            <div class="sm:my-6 my-3 flex items-center justify-between border-t pt-3 dark:border-slate-800">
              <div>
                <h2 class="text-xl font-semibold text-black">
                  {" "}
                  BEST 리얼리뷰{" "}
                </h2>
              </div>
              <div class="flex items-center gap-2 [&:has(a.uk-invisible)][&*>a]:bg-red-600">
                <a
                  href="#"
                  class="!block [&:has(.uk-invisible)]:opacity-20"
                  uk-slider-item="previous"
                >
                  <ion-icon name="chevron-back-outline"></ion-icon>{" "}
                </a>
                <a href="#" class="!block" uk-slider-item="next">
                  <ion-icon name="chevron-forward-outline"></ion-icon>{" "}
                </a>
                <a href="/review" class="text-blue-500 sm:block hidden text-sm">
                  더보기
                </a>
              </div>
            </div>

            <div class="uk-slider-container pb-1">
              <ul
                class="uk-slider-items w-[calc(100%+14px)]"
                uk-scrollspy="target: > li; cls: uk-animation-scale-up; delay: 1;repeat:true;"
              >
                <li
                  class="pr-4 sm:w-1/2 w-full"
                  uk-scrollspy-class="uk-animation-fade"
                >
                  <div class="card flex gap-1">
                    <a href="product-view-2.html">
                      <div class="card-media w-32 max-h-full h-full shrink-0">
                        <img src="/images/product/product-9.jpg" alt="" />
                        <div class="card-overly"></div>
                      </div>
                    </a>
                    <div class="card-body flex-1 py-4">
                      <a href="product-view-2.html">
                        {" "}
                        <h4 class="card-title"> Wood Chair </h4>{" "}
                      </a>
                      <a href="#">
                        {" "}
                        <p class="card-text"> Furniture </p>
                      </a>
                      <div class="text-xl flex items-center justify-between mt-2">
                        <h4 class="card-title"> 26$ </h4>
                        <button
                          type="button"
                          class="button bg-secondery !w-auto rounded-fulld hidden"
                        >
                          View
                        </button>
                      </div>
                      <div class="flex gap-2"></div>
                    </div>
                  </div>
                </li>
                <li class="pr-4 sm:w-1/2 w-full">
                  <div class="card flex gap-1">
                    <a href="product-view-2.html">
                      <div class="card-media w-32 max-h-full h-full shrink-0">
                        <img src="/images/product/product-1.jpg" alt="" />
                        <div class="card-overly"></div>
                      </div>
                    </a>
                    <div class="card-body flex-1 py-4">
                      <a href="product-view-2.html">
                        {" "}
                        <h4 class="card-title"> Chill Lotion</h4>{" "}
                      </a>
                      <a href="#">
                        {" "}
                        <p class="card-text"> Herbel </p>
                      </a>
                      <div class="text-xl flex items-center justify-between mt-2">
                        <h4 class="card-title"> 39$ </h4>
                        <button
                          type="button"
                          class="button bg-secondery !w-auto rounded-fulld hidden"
                        >
                          View
                        </button>
                      </div>
                      <div class="flex gap-2"></div>
                    </div>
                  </div>
                </li>
                <li class="pr-4 sm:w-1/2 w-full">
                  <div class="card flex gap-1">
                    <a href="product-view-2.html">
                      <div class="card-media w-32 max-h-full h-full shrink-0">
                        <img src="/images/product/product-3.jpg" alt="" />
                        <div class="card-overly"></div>
                      </div>
                    </a>
                    <div class="card-body flex-1 py-4">
                      <a href="product-view-2.html">
                        {" "}
                        <h4 class="card-title"> Gaming Mouse </h4>{" "}
                      </a>
                      <a href="#">
                        {" "}
                        <p class="card-text"> Electronic </p>
                      </a>
                      <div class="text-xl flex items-center justify-between mt-2">
                        <h4 class="card-title"> 14$ </h4>
                        <button
                          type="button"
                          class="button bg-secondery !w-auto rounded-fulld hidden"
                        >
                          View
                        </button>
                      </div>
                      <div class="flex gap-2"></div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div class="page-heading my-3">
            <h1 class="text-xl font-bold"> 체험단시대 YOUTUBE </h1>
          </div>
          <div
            class="relative"
            tabindex="-1"
            uk-slider="autoplay: true;finite: false;autoplayInterval:2000"
          >
            <div class="uk-slider-container pb-1">
              <ul
                class="uk-slider-items w-[calc(100%+14px)]"
                uk-scrollspy="target: > li; cls: uk-animation-scale-up; delay: 20;repeat:true"
              >
                <li
                  class="pr-3 md:w-1/3 w-1/2"
                  uk-scrollspy-class="uk-animation-fade"
                >
                  <div class="card">
                    <a href="product-view-1.html">
                      <div class="card-media sm:aspect-[2/1.7] h-36">
                        <img src="/images/product/product-1.jpg" alt="" />
                        <div class="card-overly"></div>
                      </div>
                    </a>
                    <div class="card-body relative">
                      <a href="#">
                        <span class="text-teal-600 font-semibold text-xs">
                          {" "}
                          미남
                        </span>
                      </a>
                      <a href="product-view-1.html">
                        <p class="card-text block text-black mt-0.5"> 중재 </p>
                      </a>
                      <div class="-top-3 absolute bg-blue-100 font-medium px-2  py-0.5 right-2 rounded-full text text-blue-500 text-sm z-20">
                        $19
                      </div>
                    </div>
                  </div>
                </li>
                <li class="pr-3 md:w-1/3 w-1/2">
                  <div class="card">
                    <a href="product-view-1.html">
                      <div class="card-media sm:aspect-[2/1.7] h-36">
                        <img src="/images/product/product-3.jpg" alt="" />
                        <div class="card-overly"></div>
                      </div>
                    </a>
                    <div class="card-body relative">
                      <a href="#">
                        <span class="text-teal-600 font-semibold text-xs">
                          {" "}
                          미남{" "}
                        </span>
                      </a>
                      <a href="product-view-1.html">
                        <p class="card-text block text-black mt-0.5"> 주원 </p>
                      </a>
                      <div class="-top-3 absolute bg-blue-100 font-medium px-2  py-0.5 right-2 rounded-full text text-blue-500 text-sm z-20">
                        $19
                      </div>
                    </div>
                  </div>
                </li>
                <li class="pr-3 md:w-1/3 w-1/2">
                  <div class="card">
                    <a href="product-view-1.html">
                      <div class="card-media sm:aspect-[2/1.7] h-36">
                        <img src="/images/product/product-6.jpg" alt="" />
                        <div class="card-overly"></div>
                      </div>
                    </a>
                    <div class="card-body relative">
                      <a href="#">
                        <span class="text-teal-600 font-semibold text-xs">
                          {" "}
                          Fruit{" "}
                        </span>
                      </a>
                      <a href="product-view-1.html">
                        <p class="card-text block text-black mt-0.5">
                          {" "}
                          Strawbery Fresh{" "}
                        </p>
                      </a>
                      <div class="-top-3 absolute bg-blue-100 font-medium px-2  py-0.5 right-2 rounded-full text text-blue-500 text-sm z-20">
                        $19
                      </div>
                    </div>
                  </div>
                </li>
                <li class="pr-3 md:w-1/3 w-1/2">
                  <div class="card">
                    <a href="product-view-1.html">
                      <div class="card-media sm:aspect-[2/1.7] h-36">
                        <img src="/images/product/product-5.jpg" alt="" />
                        <div class="card-overly"></div>
                      </div>
                    </a>
                    <div class="card-body relative">
                      <a href="#">
                        <span class="text-teal-600 font-semibold text-xs">
                          {" "}
                          Herbel{" "}
                        </span>
                      </a>
                      <a href="product-view-1.html">
                        <p class="card-text block text-black mt-0.5">
                          {" "}
                          Chill Lotion{" "}
                        </p>
                      </a>
                      <div class="-top-3 absolute bg-blue-100 font-medium px-2  py-0.5 right-2 rounded-full text text-blue-500 text-sm z-20">
                        $19
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div class="max-md:hidden">
              <a
                class="nav-prev !bottom-1/2 !top-auto"
                href="#"
                uk-slider-item="previous"
              >
                {" "}
                <ion-icon name="chevron-back" class="text-2xl"></ion-icon>{" "}
              </a>
              <a
                class="nav-next !bottom-1/2 !top-auto"
                href="#"
                uk-slider-item="next"
              >
                {" "}
                <ion-icon name="chevron-forward" class="text-2xl"></ion-icon>
              </a>
            </div>

            <div class="flex justify-center">
              <ul class="inline-flex flex-wrap justify-center my-5 gap-2 uk-dotnav uk-slider-nav">
                {" "}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
