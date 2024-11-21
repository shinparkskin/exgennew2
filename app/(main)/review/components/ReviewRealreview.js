"use client";
import React from "react";
import { useEffect, useState } from "react";
import { createClient } from "../../../../utils/supabase/client";
import InfiniteScroll from "react-infinite-scroll-component";
import { Chip } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import Link from "next/link";

function ReviewRealreview() {
  const supabase = createClient();
  const [tab, setTab] = useState("realreview");
  const [reviews, setReviews] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const limit = 6;

  useEffect(() => {
    setOffset(0);
    setHasMore(true);
    setReviews([]);
    fetchReviews();
  }, [tab]);
  useEffect(() => {
    if (offset === 0) return; // 탭 변경 시 중복 호출 방지
    fetchReviews();
  }, [offset]);

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from(tab)
      .select("*")
      .order("regiDate", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error("Error fetching Reviews:", error);
    } else {
      setReviews((prevReviews) => {
        const newReviews = [...prevReviews, ...data];
        const uniqueReviews = newReviews.filter(
          (review, index, self) =>
            index === self.findIndex((n) => n.id === review.id)
        );
        return uniqueReviews;
      });
      if (data.length < limit) {
        setHasMore(false); // No more data to load
      }
    }
  };

  const fetchMoreData = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  console.log("tab:", tab);
  console.log("reviews:", reviews);
  return (
    <>
      <div
        class="relative"
        tabindex="-1"
        uk-slider="auto play: true;finite: true"
      >
        <div class="my-6 flex-col items-center border-t pt-3 dark:border-slate-800 gap-y-5">
          <div className="flex justify-between">
            <div>
              <h2 class="text-xl font-semibold text-black">게시판</h2>
            </div>
          </div>

          <nav class="nav__underline">
            <ul
              uk-tab
              class="group"
              uk-switcher="connect: #ttabs ; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium"
            >
              <li>
                <a onClick={() => setTab("realreview")}> 리얼리뷰 </a>{" "}
              </li>
              <li>
                <a onClick={() => setTab("thankyou")}> 감사해요 </a>{" "}
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div
        className=""
        uk-scrollspy="target: > div; cls: uk-animation-scale-up; delay: 100 ;repeat: true"
      >
        <InfiniteScroll
          dataLength={reviews.length}
          next={fetchMoreData}
          hasMore={hasMore}
          // loader={<Spinner />}
          endMessage={<p className="text-center"></p>}
          className="grid sm:grid-cols-4 grid-cols-2 gap-3"
        >
          {reviews.map((review) => (
            <div key={review.id} className="cols-span-1 card uk-transition-toggle">
              <Link href={`/review/${tab}/${review.id}`}>
                <div className="card-media sm:aspect-[2/1.7] h-36 relative">
                  <img src={review.thumbImage || "/images/product/product-3.jpg"} alt="" />
                  <div className="card-overly"></div>
                </div>
              </Link>
              <div className="card-body flex justify-between">
                <div className="flex-1">
                  <Link href={`/review/${tab}/${review.id}`}>
                    <p className="card-text text-black font-medium line-clamp-1">
                      {review.title}
                    </p>
                  </Link>
                  <div className="text-xs line-clamp-1 mt-1">
                    <Link href={`/review/${tab}/${review.id}`}>{review.description}</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
}

export default ReviewRealreview;
