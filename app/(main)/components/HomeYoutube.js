"use client";
import { createClient } from "../../../utils/supabase/client";
import { useState, useEffect } from "react";
import Link from "next/link";

function HomeYoutube() {
  const supabase = createClient();
  const [youtubeList, setYoutubeList] = useState([]);

  useEffect(() => {
    const fetchYoutubeVideos = async () => {
      const { data, error } = await supabase
        .from("youtube")
        .select("*")
        .eq("isForbidden", false)
        .limit(6)
        .order("id", { ascending: false })


      if (error) {
        console.error("Error fetching Youtube videos:", error);
      } else {
        setYoutubeList(data);
      }
    };

    fetchYoutubeVideos();
  }, []);

  return (
    <>
      <div class="page-heading">
        <h1 class="page-title my-3"> 체험단시대 YOUTUBE </h1>
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
            {youtubeList.map((youtube) => (
              <li
                class="pr-3 md:w-1/4 w-1/2"
                uk-scrollspy-class="uk-animation-fade"
              >
                <div class="card">
                  <a href={youtube.url}>
                    <div class="card-media sm:aspect-[2/1.7] h-36">
                      <Link href={`/review/youtube/${youtube.id}`}>
                        <img src={youtube.thumbImage || "/images/logo-mobile-light.png"} alt="" />
                      </Link>
                      <div class="card-overly"></div>
                    </div>
                  </a>
                  <div class="card-body relative">
                    <Link href={`/review/youtube/${youtube.id}`}>
                      <span class="text-teal-600 font-semibold text-sm line-clamp-2">
                        {youtube.title}
                      </span>
                    </Link>
                    <a href={`/review/youtube/${youtube.id}`}>
                      <p class="text-xs text-right text-gray-500 mt-0.5 line-clamp-2">
                        {new Date(youtube.regiDate).toLocaleDateString()}
                      </p>
                    </a>
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
            <ion-icon name="chevron-back" class="text-2xl"></ion-icon>{" "}
          </a>
          <a
            class="nav-next !bottom-1/2 !top-auto"
            href="#"
            uk-slider-item="next"
          >
            <ion-icon name="chevron-forward" class="text-2xl"></ion-icon>
          </a>
        </div>

        <div class="flex justify-center">
          <ul class="inline-flex flex-wrap justify-center my-5 gap-2 uk-dotnav uk-slider-nav"></ul>
        </div>
      </div>
    </>
  );
}

export default HomeYoutube;
