import React from "react";
import Image from "next/image";

function page() {
  return (
    <div className="py-12 text-black text-sm flex justify-center items-center flex-col w-full">
      <div className="space-y-6 w-full flex justify-center items-center flex-col">
        <div className="flex justify-start items-center gap-10 w-full">
          <label className="md:w-16 text-right"> 글종류 </label>
          <div className="flex-1 max-md:mt-4">
            <select className="!border-0 !rounded-md w-full">
              <option value="1">자랑하기</option>
            </select>
          </div>
        </div>
        <div className="md:flex items-center gap-10 w-full">
          <label className="w-16 text-right"> 제목 </label>
          <div className="flex-1 max-md:mt-4 ">
            <input
              type="text"
              placeholder="제목을 입력하세요"
              className="w-full"
            />
          </div>
        </div>

        <div className="md:flex items-start gap-10 w-full">
          <label className="md:w-16 text-right"> 글내용 </label>
          <div className="flex-1 max-md:mt-4">
            <textarea
              className="w-full"
              rows="5"
              placeholder="글 내용을 입력하세요"
            ></textarea>
          </div>
        </div>
        <div className="md:flex items-start w-full gap-10">
          <div className="flex flex-col justify-center items-start">
            <div className="flex justify-center items-center">
              <label className="md:w-16 text-right"> 이미지 </label>
              {/* <button
                type="button"
                class=" p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="sr-only">Attach file</span>
              </button> */}
            </div>
          </div>

          <div className="flex flex-wrap gap-x-5 justify-center items-center gap-y-5 mt-5 md:mt-0">
            <div className="w-20 h-20 relative rounded grid grid-cols-3">
              <Image
                fill
                src="/images/product/product-3.jpg"
                alt=""
                className="rounded-2xl col-span-1"
              />
            </div>
            <div className="w-20 h-20 relative rounded grid grid-cols-3">
              <Image
                fill
                src="/images/product/product-3.jpg"
                alt=""
                className="rounded-2xl col-span-1"
              />
            </div>
            <div className="w-20 h-20 relative rounded grid grid-cols-3">
              <Image
                fill
                src="/images/product/product-3.jpg"
                alt=""
                className="rounded-2xl col-span-1"
              />
            </div>
            <div className="w-20 h-20 relative rounded grid grid-cols-3">
              <Image
                fill
                src="/images/product/product-3.jpg"
                alt=""
                className="rounded-2xl col-span-1"
              />
            </div>
            <div className="w-20 h-20 relative rounded grid grid-cols-3">
              <Image
                fill
                src="/images/product/product-3.jpg"
                alt=""
                className="rounded-2xl col-span-1"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center w-full justify-center my-5">
        <button
          type="button"
          className="button w-30 bg-secondery max-md:flex-1"
        >
          취소
        </button>
        <button
          type="button"
          className="button bg-primary w-30 text-white max-md:flex-1"
        >
          저장
        </button>
      </div>
    </div>
  );
}

export default page;
