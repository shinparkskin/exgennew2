"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../../utils/supabase/client";
import Link from "next/link";
function HomeRealReview() {
  const supabase = createClient();
  const [realReviewList, setRealReviewList] = useState([]);
  useEffect(() => {
    const fetchRealReviews = async () => {
      const { data, error } = await supabase
        .from("realreview")
        .select("*")
        .eq("isForbidden", false)
        .limit(4)
        .order("id", { ascending: false })

      if (error) {
        console.error("Error fetching Real Reviews:", error);
      } else {
        setRealReviewList(data);
      }
    };

    fetchRealReviews();
  }, []);
  return (
    <div
      class="relative"
      tabindex="-1"
      uk-slider="auto play: true;finite: true"
    >
      <div class="sm:my-6 my-3 flex items-center justify-between border-t pt-3 dark:border-slate-800">
        <div className="page-heading">
          <h1 class="page-title my-3">BEST 리얼리뷰</h1>
        </div>
        <div class="flex items-center gap-2 [&:has(a.uk-invisible)][&*>a]:bg-red-600">
          <a
            href="#"
            class="!block [&:has(.uk-invisible)]:opacity-20"
            uk-slider-item="previous"
          >
            <ion-icon name="chevron-back-outline"></ion-icon>{" "}
          </a>
          <a href="#" class="!block" uk-slider-item="next">
            <ion-icon name="chevron-forward-outline"></ion-icon>{" "}
          </a>
          <a href="/review" class="text-blue-500 sm:block hidden text-sm">
            더보기
          </a>
        </div>
      </div>

      <div class="uk-slider-container pb-1">
        <ul
          class="uk-slider-items w-[calc(100%+14px)]"
          uk-scrollspy="target: > li; cls: uk-animation-scale-up; delay: 1;repeat:true;"
        >
          {realReviewList.map((review) => (
            <li
              class="pr-4 sm:w-1/2 w-full"
              uk-scrollspy-class="uk-animation-fade"
            >
              <div class="card flex gap-1">
                <Link href={`/review/realreview/${review.id}`}>
                  <div class="card-media w-32 max-h-full h-full shrink-0">
                    <img src={review.thumbImage || "/images/logo-mobile-light.png"} alt="" />
                    <div class="card-overly"></div>
                  </div>
                </Link>
                <div class="card-body flex-1 py-4">
                  <Link href={`/review/realreview/${review.id}`}>
                    <h4 class="text-sm font-bold line-clamp-2"> {review.title} </h4>{" "}
                  </Link>
                  <Link href={`/review/realreview/${review.id}`}>
                    <p class="text-xs line-clamp-2"> {review.description} </p>
                  </Link>
                  <div class="text-xl flex mt-2 justify-end">
                    <p class="text-xs text-gray-500"> {new Date(review.regiDate).toLocaleDateString()} </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HomeRealReview;
