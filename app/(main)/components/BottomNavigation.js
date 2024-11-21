"use client";
// components/BottomNavigationBar.js
import Image from "next/image";
import { FaPen } from "react-icons/fa";
import { RiHome6Fill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { RiPencilFill } from "react-icons/ri";
import { IoHomeSharp } from "react-icons/io5";
import { BsFillPersonFill } from "react-icons/bs";

export default function BottomNavigationBar() {
  const router = useRouter();

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600 block md:hidden">
      <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          onClick={() => router.push("/")}
        >
<IoHomeSharp className="text-3xl text-gray-500"/>

          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            홈
          </span>
        </button>

        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          onClick={() => router.push("/write")}
        >
<RiPencilFill className="text-3xl text-gray-500"/>
<span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            글쓰기
          </span>
        </button>
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          onClick={() => router.push("/mypage")}
        >
<BsFillPersonFill  className="text-3xl text-gray-500"/>

          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            마이페이지
          </span>
        </button>
      </div>
    </div>

    // <nav className="bg-gray-700 text-white fixed bottom-0 w-full block md:hidden z-50">
    //   <ul className="flex justify-around items-center">
    //     <li className="py-2">
    //       <a href="#" className="flex flex-col items-center">
    //         <span>
    //           <RiHome6Fill />
    //         </span>
    //         <span className="text-sm">HOME</span>
    //       </a>
    //     </li>
    //     {/* <li className="py-2">
    //       <a href="#" className="flex flex-col items-center">
    //         <span>🔍</span>
    //         <span className="text-sm">Search</span>
    //       </a>
    //     </li> */}
    //     <li className="py-2">
    //       <a href="#" className="flex flex-col items-center">
    //         <span>
    //           <FaPen />
    //         </span>
    //         <span className="text-sm">ADD</span>
    //       </a>
    //     </li>
    //     <li className="py-2">
    //       <a href="#" className="flex flex-col items-center">
    //         <div className="w-6 h-6 relative rounded-full overflow-hidden">
    //           <Image fill src="/images/avatars/avatar-2.jpg" alt="" />
    //         </div>
    //         <span className="text-sm">MY</span>
    //       </a>
    //     </li>
    //   </ul>
    // </nav>
  );
}
