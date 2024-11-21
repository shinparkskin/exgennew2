"use client";
import { useEffect, useState } from "react";
import { createClient } from "../../../utils/supabase/client";
import Link from "next/link";
import { Chip } from "@nextui-org/react";
function HomeBoast() {
  const [boastTypes, setBoastTypes] = useState([]);
  const supabase = createClient();
  const [tab, setTab] = useState("전체");

  useEffect(() => {
    const fetchBoastTypes = async () => {
      const { data, error } = await supabase
        .from("boastType")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.log(error);
      } else {
        setBoastTypes(data);
      }
    };

    fetchBoastTypes();
  }, []);

  const [boastList, setBoastList] = useState([]);

  useEffect(() => {
    fetchBoasts();
  }, [tab]);

  const fetchBoasts = async () => {
    const { data, error } = await supabase
      .from("boast")
      .select("*")
      .order("regiDate", { ascending: false })
      .ilike("boastType", tab === "전체" ? "%" : tab)
      .limit(12);

    if (error) {
      console.error("Error fetching Boasts:", error);
    } else {
      setBoastList(data);
    }
  };

  return (
    <div
      className="relative"
      tabindex="-1"
      uk-slider="auto play: true;finite: true"
    >
      <div className="my-6 flex-col items-center border-t pt-3 dark:border-slate-800 gap-y-5">
        <div className="flex justify-between">
          <div className="page-heading">
            <h2 className="page-title my-3"> 자랑하기 </h2>
          </div>
          <div className="flex items-center gap-2 [&:has(a.uk-invisible)][&*>a]:bg-red-600">
            <a href="/boast" className="text-blue-500 sm:block hidden text-sm">
              더보기
            </a>
          </div>
        </div>
        <div className="my-5 ">
          <ul
            uk-tab
            className="flex gap-2 flex-wrap text-sm text-center text-gray-600 capitalize font-semibold dark:text-white/80"
            uk-switcher="connect: #ttabs ; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium"
          >
            {boastTypes.map((boastType) => (
              <li>
                <button
                  className="inline-flex items-center gap-2 py-2 px-2.5 pr-3 bg-slate-200/60 rounded-full aria-expanded:bg-black aria-expanded:text-white aria-expanded:dark:text-white aria-expanded:dark:border-white"
                  onClick={() => setTab(boastType.name)}
                >
                  #{boastType.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="grid gap-4 auto-rows-min">
          {boastList.slice(0, 3).map((boast, index) => (
            <div key={index} className="relative group aspect-square">
              <Link href={`/boast/${boast.id}`} className="relative h-full">
                <img
                  className="h-full max-w-full rounded-lg object-cover"
                  src={boast.thumbImage || "/images/product/product-3.jpg"}
                  alt={boast.title}
                />
                <Chip
                color={
                  boast.boastType === "택배자랑"
                    ? "primary"
                    : boast.boastType === "부업자랑"
                    ? "secondary"
                    : boast.boastType === "입금인증"
                    ? "success"
                    : boast.boastType === "맛집인증"
                    ? "warning"
                    : boast.boastType === "당첨자랑"
                    ? "danger"
                    : "default"
                }
                  className="absolute top-0 left-0 m-2 z-10"
                >
                  #{boast.boastType}
                </Chip>
                <div className="absolute bottom-0 left-0 w-full h-0 opacity-0 group-hover:h-10 group-hover:opacity-50 bg-black transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-sm">{boast.title}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="grid gap-4">
          {boastList.slice(3, 6).map((boast, index) => (
            <div key={index} className="relative group">
              <Link href={`/boast/${boast.id}`} className="relative">
                <img
                  className="h-full max-w-full rounded-lg object-cover"
                  src={boast.thumbImage || "/images/product/product-3.jpg"}
                  alt={boast.title}
                />
                <Chip
                  color={
                    boast.boastType === "택배자랑"
                      ? "primary"
                      : boast.boastType === "부업자랑"
                      ? "secondary"
                      : boast.boastType === "입금인증"
                      ? "success"
                      : boast.boastType === "맛집인증"
                      ? "warning"
                      : boast.boastType === "당첨자랑"
                      ? "danger"
                      : "default"
                  }
                  className="absolute top-0 left-0 m-2 z-10"
                >
                  #{boast.boastType}
                </Chip>
                <div className="absolute bottom-0 left-0 w-full h-0 opacity-0 group-hover:h-10 group-hover:opacity-50 bg-black transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-sm">{boast.title}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="hidden md:grid gap-4">
          {boastList.slice(6, 9).map((boast, index) => (
            <div key={index} className="relative group">
              <Link href={`/boast/${boast.id}`} className="relative">
                <img
                  className="h-full max-w-full rounded-lg object-cover"
                  src={boast.thumbImage || "/images/product/product-3.jpg"}
                  alt={boast.title}
                />
                <Chip
                  color={
                    boast.boastType === "택배자랑"
                      ? "primary"
                      : boast.boastType === "부업자랑"
                      ? "secondary"
                      : boast.boastType === "입금인증"
                      ? "success"
                      : boast.boastType === "맛집인증"
                      ? "warning"
                      : boast.boastType === "당첨자랑"
                      ? "danger"
                      : "default"
                  }
                  className="absolute top-0 left-0 m-2 z-10"
                >
                  #{boast.boastType}
                </Chip>
                <div className="absolute bottom-0 left-0 w-full h-0 opacity-0 group-hover:h-10 group-hover:opacity-50 bg-black transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-sm">{boast.title}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="hidden md:grid gap-4">
          {boastList.slice(9, 12).map((boast, index) => (
            <div key={index} className="relative group">
              <Link href={`/boast/${boast.id}`} className="relative">
                <img
                  className="h-full max-w-full rounded-lg object-cover"
                  src={boast.thumbImage || "/images/product/product-3.jpg"}
                  alt={boast.title}
                />
                <Chip
                  color={
                    boast.boastType === "택배자랑"
                      ? "primary"
                      : boast.boastType === "부업자랑"
                      ? "secondary"
                      : boast.boastType === "입금인증"
                      ? "success"
                      : boast.boastType === "맛집인증"
                      ? "warning"
                      : boast.boastType === "당첨자랑"
                      ? "danger"
                      : "default"
                  }
                  className="absolute top-0 left-0 m-2 z-1"
                >
                  #{boast.boastType}
                </Chip>
                <div className="absolute bottom-0 left-0 w-full h-0 opacity-0 group-hover:h-10 group-hover:opacity-50 bg-black transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-sm">{boast.title}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeBoast;
