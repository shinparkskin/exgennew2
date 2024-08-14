import React from "react";

function page() {
  return (
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
                      <p class="card-text block text-black mt-0.5"> 중재 </p>
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
                      <p class="card-text block text-black mt-0.5"> 주원 </p>
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
                <div class="text-xs line-clamp-1 mt-1"> Herbal Shampoo </div>
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
                <button type="button" class="button border bg-white !w-auto">
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
                <button type="button" class="button border bg-white !w-auto">
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
                <button type="button" class="button border bg-white !w-auto">
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
                <button type="button" class="button border bg-white !w-auto">
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
                <button type="button" class="button border bg-white !w-auto">
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
                <div class="text-xs line-clamp-1 mt-1"> Herbal Shampoo </div>
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
                <button type="button" class="button border bg-white !w-auto">
                  Veiw
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
