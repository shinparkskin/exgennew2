"use client";
import { createClient } from "../../../../utils/supabase/client";
import Link from "next/link";
import { useState, useEffect } from "react";
import {Spinner} from "@nextui-org/react";
function ReviewYoutube() {
  const [isCompleted, setIsCompleted] = useState(false);
  const supabase = createClient();
  const [youtubeList, setYoutubeList] = useState([]);

  useEffect(() => {
    const fetchYoutubeVideos = async () => {
      const { data, error } = await supabase
        .from("youtube")
        .select("*")
        .order("regiDate", { ascending: false })
        .limit(6);

      if (error) {
        console.error("Error fetching Youtube videos:", error);
      } else {
        setYoutubeList(data);
      }
    };
    setIsCompleted(true);
    fetchYoutubeVideos();
  }, []);

  return (
    <>
    {isCompleted ?  (
      <>
      <div class="page-heading my-3">
        <h1 class="text-xl font-bold"> 체험단시대 YOUTUBE </h1>
      </div>
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
            {youtubeList.map((video) => (
              <li class="pr-3 w-1/2 md:w-1/4" uk-scrollspy-class="uk-animation-fade">
                <div class="card">
                  <Link href={`/review/youtube/${video.id}`}>
                    <div class="card-media sm:aspect-[2/1.7] h-36">
                    <img src={video.thumbImage || "/images/product/product-3.jpg"} alt="" />
                    <div class="card-overly"></div>
                    </div>
                  </Link>
                  <div class="card-body relative">
                      <Link href={`/review/youtube/${video.id}`}>
                      <span class="text-teal-600 font-semibold text-xs line-clamp-2">
                        {video.title}
                      </span>
                    </Link>
                    <Link href={`/review/youtube/${video.id}`}>
                      <p class="card-text block text-black mt-0.5 text-right">
                        {new Date(video.regiDate).toLocaleDateString()}
                      </p>
                    </Link>
                  </div>
                </div>
              </li>
            ))}
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
    </>
    ) : (
      <div className="flex justify-center items-center h-[100vh] w-[100vw]">
        <Spinner></Spinner>
      </div>
    )}
    </>
  );
}

export default ReviewYoutube;
