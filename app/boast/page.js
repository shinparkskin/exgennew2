import React from "react";

function page() {
  return (
    <main
      id="site__main"
      class="2xl:ml-[--w-side]  xl:ml-[--w-side-sm] p-2.5 h-[calc(100vh-var(--m-top))] mt-[--m-top] "
    >
      <div
        class="lg:flex 2xl:gap-12 gap-10 2xl:max-w-[1220px] max-w-[1065px] mx-auto bg-[#F9FAFB]"
        id="js-oversized"
      >
        <div class="flex-1">
          <div class="lg:max-w-[680px] w-full">
            <div class="page-heading my-3"></div>
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
                  <li class="pr-3 w-1/2" uk-scrollspy-class="uk-animation-fade">
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
                          <p class="card-text block text-black mt-0.5">
                            {" "}
                            중재{" "}
                          </p>
                        </a>
                        <div class="-top-3 absolute bg-blue-100 font-medium px-2  py-0.5 right-2 rounded-full text text-blue-500 text-sm z-20">
                          $19
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="pr-3 w-1/2">
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
                          <p class="card-text block text-black mt-0.5">
                            {" "}
                            주원{" "}
                          </p>
                        </a>
                        <div class="-top-3 absolute bg-blue-100 font-medium px-2  py-0.5 right-2 rounded-full text text-blue-500 text-sm z-20">
                          $19
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="pr-3 w-1/2">
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
                  <li class="pr-3 w-1/2">
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
                  <ion-icon
                    name="chevron-back"
                    class="text-2xl"
                  ></ion-icon>{" "}
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
            </div>

            <div
              class="grid sm:grid-cols-3 grid-cols-2 gap-3"
              uk-scrollspy="target: > div; cls: uk-animation-scale-up; delay: 100 ;repeat: true"
            >
              <div class="card uk-transition-toggle">
                <a href="product-view-1.html">
                  <div class="card-media sm:aspect-[2/1.7] h-36">
                    <img src="/images/product/product-10.jpg" alt="" />
                    <div class="card-overly"></div>
                  </div>
                </a>
                <div class="card-body flex justify-between">
                  <div class="flex-1">
                    <p class="card-text text-black font-medium line-clamp-1">
                      {" "}
                      Herbel{" "}
                    </p>
                    <div class="text-xs line-clamp-1 mt-1">
                      {" "}
                      Herbal Shampoo{" "}
                    </div>
                  </div>
                  <h4 class="card-title"> 19$ </h4>
                </div>
                <div class="absolute w-full bottom-0 bg-white/20 backdrop-blur-sm uk-transition-slide-bottom-small max-xl:h-full z-[2] flex flex-col justify-center">
                  <div class="flex gap-3 py-4 px-3">
                    <button
                      type="button"
                      class="button bg-primary text-white flex-1"
                    >
                      Chat
                    </button>
                    <button
                      type="button"
                      class="button border bg-white !w-auto"
                    >
                      Veiw
                    </button>
                  </div>
                </div>
              </div>
              <div class="card uk-transition-toggle">
                <a href="product-view-1.html">
                  <div class="card-media sm:aspect-[2/1.7] h-36">
                    <img src="/images/product/product-8.jpg" alt="" />
                    <div class="card-overly"></div>
                  </div>
                </a>
                <div class="card-body flex justify-between">
                  <div class="flex-1">
                    <p class="card-text text-black font-medium line-clamp-1">
                      {" "}
                      Parfum{" "}
                    </p>
                    <div class="text-xs line-clamp-1 mt-1"> Parfum Spray </div>
                  </div>
                  <h4 class="card-title"> 20$ </h4>
                </div>
                <div class="absolute w-full bottom-0 bg-white/20 backdrop-blur-sm uk-transition-slide-bottom-small max-xl:h-full z-[2] flex flex-col justify-center">
                  <div class="flex gap-3 py-4 px-3">
                    <button
                      type="button"
                      class="button bg-primary text-white flex-1"
                    >
                      Chat
                    </button>
                    <button
                      type="button"
                      class="button border bg-white !w-auto"
                    >
                      Veiw
                    </button>
                  </div>
                </div>
              </div>
              <div class="card uk-transition-toggle">
                <a href="product-view-1.html">
                  <div class="card-media sm:aspect-[2/1.7] h-36">
                    <img src="/images/product/product-9.jpg" alt="" />
                    <div class="card-overly"></div>
                  </div>
                </a>
                <div class="card-body flex justify-between">
                  <div class="flex-1">
                    <p class="card-text text-black font-medium line-clamp-1">
                      {" "}
                      Furniture
                    </p>
                    <div class="text-xs line-clamp-1 mt-1"> Wood Chair </div>
                  </div>
                  <h4 class="card-title"> 34$ </h4>
                </div>
                <div class="absolute w-full bottom-0 bg-white/20 backdrop-blur-sm uk-transition-slide-bottom-small max-xl:h-full z-[2] flex flex-col justify-center">
                  <div class="flex gap-3 py-4 px-3">
                    <button
                      type="button"
                      class="button bg-primary text-white flex-1"
                    >
                      Chat
                    </button>
                    <button
                      type="button"
                      class="button border bg-white !w-auto"
                    >
                      Veiw
                    </button>
                  </div>
                </div>
              </div>
              <div class="card uk-transition-toggle">
                <a href="product-view-1.html">
                  <div class="card-media sm:aspect-[2/1.7] h-36">
                    <img src="/images/product/product-3.jpg" alt="" />
                    <div class="card-overly"></div>
                  </div>
                </a>
                <div class="card-body flex justify-between">
                  <div class="flex-1">
                    <p class="card-text text-black font-medium line-clamp-1">
                      {" "}
                      Electronic{" "}
                    </p>
                    <div class="text-xs line-clamp-1 mt-1"> Gaming Mouse </div>
                  </div>
                  <h4 class="card-title"> 26$ </h4>
                </div>
                <div class="absolute w-full bottom-0 bg-white/20 backdrop-blur-sm uk-transition-slide-bottom-small max-xl:h-full z-[2] flex flex-col justify-center">
                  <div class="flex gap-3 py-4 px-3">
                    <button
                      type="button"
                      class="button bg-primary text-white flex-1"
                    >
                      Chat
                    </button>
                    <button
                      type="button"
                      class="button border bg-white !w-auto"
                    >
                      Veiw
                    </button>
                  </div>
                </div>
              </div>
              <div class="card uk-transition-toggle">
                <a href="product-view-1.html">
                  <div class="card-media sm:aspect-[2/1.7] h-36">
                    <img src="/images/product/product-1.jpg" alt="" />
                    <div class="card-overly"></div>
                  </div>
                </a>
                <div class="card-body flex justify-between">
                  <div class="flex-1">
                    <p class="card-text text-black font-medium line-clamp-1">
                      {" "}
                      Shampo{" "}
                    </p>
                    <div class="text-xs line-clamp-1 mt-1"> Deep Cleanse </div>
                  </div>
                  <h4 class="card-title"> 12$ </h4>
                </div>
                <div class="absolute w-full bottom-0 bg-white/20 backdrop-blur-sm uk-transition-slide-bottom-small max-xl:h-full z-[2] flex flex-col justify-center">
                  <div class="flex gap-3 py-4 px-3">
                    <button
                      type="button"
                      class="button bg-primary text-white flex-1"
                    >
                      Chat
                    </button>
                    <button
                      type="button"
                      class="button border bg-white !w-auto"
                    >
                      Veiw
                    </button>
                  </div>
                </div>
              </div>
              <div class="card uk-transition-toggle">
                <a href="product-view-1.html">
                  <div class="card-media sm:aspect-[2/1.7] h-36">
                    <img src="/images/product/product-10.jpg" alt="" />
                    <div class="card-overly"></div>
                  </div>
                </a>
                <div class="card-body flex justify-between">
                  <div class="flex-1">
                    <p class="card-text text-black font-medium line-clamp-1">
                      {" "}
                      Herbel{" "}
                    </p>
                    <div class="text-xs line-clamp-1 mt-1">
                      {" "}
                      Herbal Shampoo{" "}
                    </div>
                  </div>
                  <h4 class="card-title"> 19$ </h4>
                </div>
                <div class="absolute w-full bottom-0 bg-white/20 backdrop-blur-sm uk-transition-slide-bottom-small max-xl:h-full z-[2] flex flex-col justify-center">
                  <div class="flex gap-3 py-4 px-3">
                    <button
                      type="button"
                      class="button bg-primary text-white flex-1"
                    >
                      Chat
                    </button>
                    <button
                      type="button"
                      class="button border bg-white !w-auto"
                    >
                      Veiw
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="2xl:w-[380px] lg:w-[330px] w-full ">
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
                    <ion-icon
                      name="chevron-forward"
                      class="text-2xl"
                    ></ion-icon>
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
      </div>
    </main>
  );
}

export default page;
