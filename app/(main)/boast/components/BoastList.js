"use client";
import React from "react";
import { useEffect, useState } from "react";
import { createClient } from "../../../../utils/supabase/client";
import InfiniteScroll from "react-infinite-scroll-component";
import { Chip } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { LuPencil } from "react-icons/lu";
import { useRouter } from "next/navigation";

function BoastList() {
  const [isComplete, setIsComplete] = useState(false);
  const supabase = createClient();
  const [boastTypes, setBoastTypes] = useState([]);
  const [tab, setTab] = useState("전체");
  const [boastList, setBoastList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();
  const limit = 6;

  useEffect(() => {
    setOffset(0);
    setBoastList([]);
    setHasMore(true);
    fetchBoasts();
  }, [tab]);
  useEffect(() => {
    if (offset === 0) return; // 탭 변경 시 중복 호출 방지
    fetchBoasts();
  }, [offset]);

  const fetchBoasts = async () => {
    const { data, error } = await supabase
      .from("boast")
      .select("*")
      .order("regiDate", { ascending: false })
      .range(offset, offset + limit - 1)
      .ilike("boastType", tab === "전체" ? "%" : tab);

    if (error) {
      console.error("Error fetching Boasts:", error);
    } else {
      setBoastList((prevBoasts) => {
        const newBoasts = [...prevBoasts, ...data];
        const uniqueBoasts = newBoasts.filter(
          (boast, index, self) =>
            index === self.findIndex((n) => n.id === boast.id)
        );
        return uniqueBoasts;
      });

      if (data.length < limit) {
        setHasMore(false); // No more data to load
      }
    }
  };

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

  const fetchMoreData = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  return (
    <>
      <div
        className="relative"
        tabindex="-1"
        uk-slider="auto play: true;finite: true"
      >
        <div className="my-6 flex-col items-center border-t pt-3 dark:border-slate-800 gap-y-5">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="page-title my-3"> 자랑하기 </h1>
            </div>
            <div>
              <Button
                onClick={() => router.push("/write")}
                size="sm"
                color="default"
                variant="bordered"
                startContent={<LuPencil className="text-gray-500" />}
              >
                글작성
              </Button>
            </div>
          </div>
          <div className="my-5">
            <ul
              uk-tab
              className="flex gap-2 flex-wrap text-sm text-center text-gray-600 capitalize font-semibold dark:text-white/80"
              uk-switcher="connect: #ttabs ; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium"
            >
              {boastTypes.map((boastType) => (
                <li>
                  <button
                    onClick={() => setTab(boastType.name)}
                    className="inline-flex items-center gap-2 py-2 px-2.5 pr-3 bg-slate-200/60 rounded-full aria-expanded:bg-black aria-expanded:text-white aria-expanded:dark:text-white aria-expanded:dark:border-white"
                  >
                    #{boastType.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div
        className=""
        uk-scrollspy="target: > div; cls: uk-animation-scale-up; delay: 100 ;repeat: true"
      >
        <InfiniteScroll
          dataLength={boastList.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<Spinner />}
          endMessage={<p className="text-center"></p>}
          className="grid sm:grid-cols-4 grid-cols-2 gap-3"
        >
          {boastList.map((boast) => (
            <div className="cols-span-1 card uk-transition-toggle">
              <Link href={`/boast/${boast.id}`}>
                <div className="card-media sm:aspect-[2/1.7] h-36 relative">
                  <img
                    className="object-contain"
                    src={boast.thumbImage || "/images/product/product-3.jpg"}
                    alt=""
                  />
                  <div className="card-overly"></div>
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
                    className="z-50 absolute top-2 left-2"
                  >
                    #{boast.boastType}
                  </Chip>
                </div>
              </Link>
              <div className="card-body flex justify-between">
                <div className="flex-1">
                  <div className="flex gap-x-2 text-xs line-clamp-1 mt-1">
                    <img src={boast.avatarUrl} alt=""  className="w-5 h-5 rounded-full"/>
                    <div className="text-xs ">{boast.creator}</div>
                  </div>
                  <hr className="border-gray-300 border-0.5 my-2"/>
                  <Link href={`/boast/${boast.id}`}>
                    <p className="card-text font-bold text-black line-clamp-1">
                      {boast.title}
                    </p>
                  </Link>
                  <div className="text-xs line-clamp-1 mt-1">
                    <Link href={`/boast/${boast.id}`}>{boast.description}</Link>
                  </div>
                  <p className="text-xs text-gray-500 text-right">
                    {new Date(boast.regiDate).toLocaleString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
}

export default BoastList;
