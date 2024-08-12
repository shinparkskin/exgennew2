// components/BottomNavigationBar.js
import Image from "next/image";
import { FaPen } from "react-icons/fa";
import { RiHome6Fill } from "react-icons/ri";
export default function BottomNavigationBar() {
  return (
    <nav className="bg-gray-700 text-white fixed bottom-0 w-full block md:hidden z-50">
      <ul className="flex justify-around items-center">
        <li className="py-2">
          <a href="#" className="flex flex-col items-center">
            <span>
              <RiHome6Fill />
            </span>
            <span className="text-sm">HOME</span>
          </a>
        </li>
        {/* <li className="py-2">
          <a href="#" className="flex flex-col items-center">
            <span>🔍</span>
            <span className="text-sm">Search</span>
          </a>
        </li> */}
        <li className="py-2">
          <a href="#" className="flex flex-col items-center">
            <span>
              <FaPen />
            </span>
            <span className="text-sm">ADD</span>
          </a>
        </li>
        <li className="py-2">
          <a href="#" className="flex flex-col items-center">
            <div className="w-6 h-6 relative rounded-full overflow-hidden">
              <Image fill src="/images/avatars/avatar-2.jpg" alt="" />
            </div>
            <span className="text-sm">MY</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
