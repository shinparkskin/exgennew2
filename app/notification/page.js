import React from "react";

function page() {
  return (
    <>
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
                <li class="pr-3 w-full" uk-scrollspy-class="uk-animation-fade">
                  <div class="card">
                    <a href="product-view-1.html">
                      <div class="card-media sm:aspect-[2/1.7] h-72">
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
                <li class="pr-3 w-full">
                  <div class="card">
                    <a href="product-view-1.html">
                      <div class="card-media sm:aspect-[2/1.7] h-72">
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
                <li class="pr-3 w-full">
                  <div class="card">
                    <a href="product-view-1.html">
                      <div class="card-media sm:aspect-[2/1.7] h-72">
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
                <li class="pr-3 w-full">
                  <div class="card">
                    <a href="product-view-1.html">
                      <div class="card-media sm:aspect-[2/1.7] h-72">
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

          <div class="page-heading">
            <h1 class="page-title"> 이벤트 </h1>

            <nav class="nav__underline">
              <ul
                uk-tab
                class="group"
                uk-switcher="connect: #ttabs ; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium"
              >
                <li>
                  {" "}
                  <a href="#"> 공지사항 </a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#"> 프로모션 이벤트 </a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#"> 매니저 이야기 </a>{" "}
                </li>
              </ul>
            </nav>
          </div>

          <div class="relative" tabindex="-1" uk-slider="finite:true">
            <div class="uk-slider-container pb-1">
              <ul class="uk-slider-items grid-small">
                <li class="lg:w-1/4 sm:w-1/3 w-1/2">
                  <div class="card">
                    <a href="timeline-event.html">
                      <div class="card-media h-32">
                        <img src="/images/events/img-3.jpg" alt="" />
                        <div class="card-overly"></div>
                      </div>
                    </a>
                    <div class="card-body">
                      <p class="text-xs font-medium text-blue-600 mb-1">
                        {" "}
                        Next week{" "}
                      </p>
                      <a href="timeline-event.html">
                        <h4 class="card-title text-sm">
                          {" "}
                          About Safety and Flight{" "}
                        </h4>{" "}
                      </a>
                      <a href="#">
                        {" "}
                        <p class="card-text text-black mt-2"> Dubai </p>{" "}
                      </a>
                      <div class="card-list-info text-xs mt-1">
                        <div> 26 Intersted</div>
                        <div class="md:block hidden">·</div>
                        <div> 8 Going</div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="lg:w-1/4 sm:w-1/3 w-1/2">
                  <div class="card">
                    <a href="timeline-event.html">
                      <div class="card-media h-32">
                        <img src="/images/events/img-2.jpg" alt="" />
                        <div class="card-overly"></div>
                      </div>
                    </a>
                    <div class="card-body">
                      <p class="text-xs font-semibold text-teal-600 mb-1">
                        Opening
                      </p>
                      <a href="timeline-event.html">
                        <h4 class="card-title text-sm">
                          {" "}
                          Wedding trend Ideas{" "}
                        </h4>{" "}
                      </a>
                      <a href="#">
                        {" "}
                        <p class="card-text text-black mt-2"> Turkey </p>
                      </a>
                      <div class="card-list-info text-xs mt-1">
                        <div> 20 Intersted</div>
                        <div class="md:block hidden">·</div>
                        <div> 16 Going</div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="lg:w-1/4 sm:w-1/3 w-1/2">
                  <div class="card">
                    <a href="timeline-event.html">
                      <div class="card-media h-32">
                        <img src="/images/events/img-1.jpg" alt="" />
                        <div class="card-overly"></div>
                      </div>
                    </a>
                    <div class="card-body">
                      <p class="text-xs font-medium text-red-600 mb-1">
                        {" "}
                        WED JUL 10,2024 AT 10PM{" "}
                      </p>
                      <a href="timeline-event.html">
                        <h4 class="card-title text-sm">
                          {" "}
                          The global creative{" "}
                        </h4>{" "}
                      </a>
                      <a href="#">
                        {" "}
                        <p class="card-text text-black mt-2"> Japan </p>{" "}
                      </a>
                      <div class="card-list-info text-xs mt-1">
                        <div> 15 Intersted</div>
                        <div class="md:block hidden">·</div>
                        <div> 2 Going</div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="lg:w-1/4 sm:w-1/3 w-1/2">
                  <div class="card">
                    <a href="timeline-event.html">
                      <div class="card-media h-32">
                        <img src="/images/events/img-4.jpg" alt="" />
                        <div class="card-overly"></div>
                      </div>
                    </a>
                    <div class="card-body">
                      <p class="text-xs font-semibold text-teal-600 mb-1">
                        Opening
                      </p>
                      <a href="timeline-event.html">
                        <h4 class="card-title text-sm">
                          {" "}
                          Perspective is everything{" "}
                        </h4>{" "}
                      </a>
                      <a href="#">
                        {" "}
                        <p class="card-text text-black mt-2"> London </p>
                      </a>
                      <div class="card-list-info text-xs mt-1">
                        <div> 20 Intersted</div>
                        <div class="md:block hidden">·</div>
                        <div> 16 Going</div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="lg:w-1/4 sm:w-1/3 w-1/2">
                  <div class="card">
                    <a href="timeline-event.html">
                      <div class="card-media h-32">
                        <img src="/images/events/img-3.jpg" alt="" />
                        <div class="card-overly"></div>
                      </div>
                    </a>
                    <div class="card-body">
                      <p class="text-xs font-medium text-blue-600 mb-1">
                        {" "}
                        Next week{" "}
                      </p>
                      <a href="timeline-event.html">
                        <h4 class="card-title text-sm">
                          {" "}
                          About Safety and Flight{" "}
                        </h4>{" "}
                      </a>
                      <a href="#">
                        {" "}
                        <p class="card-text text-black mt-2"> Dubai </p>{" "}
                      </a>
                      <div class="card-list-info text-xs mt-1">
                        <div> 26 Intersted</div>
                        <div class="md:block hidden">·</div>
                        <div> 8 Going</div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <a class="nav-prev !top-20" href="#" uk-slider-item="previous">
              {" "}
              <ion-icon name="chevron-back" class="text-2xl"></ion-icon>{" "}
            </a>
            <a class="nav-next !top-20" href="#" uk-slider-item="next">
              {" "}
              <ion-icon name="chevron-forward" class="text-2xl"></ion-icon>
            </a>
          </div>

          <div class="sm:my-6 my-3 flex items-center justify-between border-t pt-3 dark:border-slate-800">
            <div>
              <h2 class="text-xl font-semibold text-black"> 이번 주 소식 </h2>
            </div>
            <a href="#" class="text-blue-500 sm:block hidden text-sm">
              더보기
            </a>
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
    </>
  );
}

export default page;
