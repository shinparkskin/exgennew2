import React from "react";

function RightSideBar() {
  return (
    <div class="2xl:w-[380px] lg:w-[330px] w-full">
      <div
        class="lg:space-y-6 space-y-4 lg:pb-8 max-lg:grid sm:grid-cols-2 max-lg:gap-6"
        uk-sticky="media: 1024; end: #js-oversized; offset: 80"
      >
        <div class="box p-5 px-6 border1 dark:bg-dark2">
          <div class="flex justify-between text-black dark:text-white">
            <h3 class="font-bold text-base"> 주요뉴스 </h3>
            <button type="button">
              {" "}
              <ion-icon name="sync-outline" class="text-xl"></ion-icon>{" "}
            </button>
          </div>

          <div
            class="relative capitalize font-medium text-sm text-center mt-4 mb-2"
            tabindex="-1"
            uk-slider="autoplay: true;finite: true"
          >
            <div class="overflow-hidden uk-slider-container">
              <ul class="-ml-2 uk-slider-items w-[calc(100%+0.5rem)]">
                <li class="w-1/2 pr-2">
                  <a href="#">
                    <div class="relative overflow-hidden rounded-lg">
                      <div class="relative w-full h-40">
                        <img
                          src="/images/product/product-1.jpg"
                          alt=""
                          class="object-cover w-full h-full inset-0"
                        />
                      </div>
                      <div class="absolute right-0 top-0 m-2 bg-white/60 rounded-full py-0.5 px-2 text-sm font-semibold dark:bg-slate-800/60">
                        {" "}
                        $12{" "}
                      </div>
                    </div>
                    <div class="mt-3 w-full"> Chill Lotion </div>
                  </a>
                </li>
                <li class="w-1/2 pr-2">
                  <a href="#">
                    <div class="relative overflow-hidden rounded-lg">
                      <div class="relative w-full h-40">
                        <img
                          src="/images/product/product-3.jpg"
                          alt=""
                          class="object-cover w-full h-full inset-0"
                        />
                      </div>
                      <div class="absolute right-0 top-0 m-2 bg-white/60 rounded-full py-0.5 px-2 text-sm font-semibold dark:bg-slate-800/60">
                        {" "}
                        $18{" "}
                      </div>
                    </div>
                    <div class="mt-3 w-full"> Gaming mouse </div>
                  </a>
                </li>
                <li class="w-1/2 pr-2">
                  <a href="#">
                    <div class="relative overflow-hidden rounded-lg">
                      <div class="relative w-full h-40">
                        <img
                          src="/images/product/product-5.jpg"
                          alt=""
                          class="object-cover w-full h-full inset-0"
                        />
                      </div>
                      <div class="absolute right-0 top-0 m-2 bg-white/60 rounded-full py-0.5 px-2 text-sm font-semibold dark:bg-slate-800/60">
                        {" "}
                        $12{" "}
                      </div>
                    </div>
                    <div class="mt-3 w-full"> Herbal Shampoo </div>
                  </a>
                </li>
              </ul>

              <button
                type="button"
                class="absolute bg-white rounded-full top-16 -left-4 grid w-9 h-9 place-items-center shadow dark:bg-dark3"
                uk-slider-item="previous"
              >
                {" "}
                <ion-icon name="chevron-back" class="text-2xl"></ion-icon>
              </button>
              <button
                type="button"
                class="absolute -right-4 bg-white rounded-full top-16 grid w-9 h-9 place-items-center shadow dark:bg-dark3"
                uk-slider-item="next"
              >
                {" "}
                <ion-icon name="chevron-forward" class="text-2xl"></ion-icon>
              </button>
            </div>
          </div>
        </div>

        <div class="box p-5 px-6 border1 dark:bg-dark2">
          <div class="flex justify-between text-black dark:text-white">
            <h3 class="font-bold text-base"> 인기 자랑하기</h3>
            <button type="button">
              {" "}
              <ion-icon name="sync-outline" class="text-xl"></ion-icon>{" "}
            </button>
          </div>

          <div class="space-y-3.5 capitalize text-xs font-normal mt-5 mb-2 text-gray-600 dark:text-white/80">
            <a href="#">
              <div class="flex items-center gap-3 my-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 -mt-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                  />
                </svg>
                <div class="flex-1">
                  <h4 class="font-semibold text-black dark:text-white text-sm">
                    상품권
                  </h4>
                  <div class="mt-0.5"> 123 likes </div>
                </div>
              </div>
            </a>
            <a href="#">
              <div class="flex items-center gap-3 my-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 -mt-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                  />
                </svg>
                <div class="flex-1">
                  <h4 class="font-semibold text-black dark:text-white text-sm">
                    제품
                  </h4>
                  <div class="mt-0.5"> 84 likes </div>
                </div>
              </div>
            </a>
            <a href="#">
              <div class="flex items-center gap-3 my-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 -mt-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                  />
                </svg>
                <div class="flex-1">
                  <h4 class="font-semibold text-black dark:text-white text-sm">
                    스벅쿠폰
                  </h4>
                  <div class="mt-0.5"> 74 likes </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightSideBar;
