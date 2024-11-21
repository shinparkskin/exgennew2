"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../../../utils/supabase/client";
import {Spinner} from "@nextui-org/react";
function NotificationIntroduction() {
  const [isCompleted, setIsCompleted] = useState(false);
  const supabase = createClient();
  const [postings, setPostings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("introduction").select("*");

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setPostings(data);
      }
    };
    setIsCompleted(true);
    fetchData();
  }, []);

  return (
    <>
      {isCompleted ? (
        <div className="page-heading">
          <h1 class="page-title my-3">회사소개</h1>

          <div
            className="relative my-3"
            tabindex="-1"
            uk-slider="autoplay: true;finite: false;autoplayInterval:2000"
          >
            <div className="uk-slider-container pb-1">
              <ul
                className="uk-slider-items w-[calc(100%+14px)]"
                uk-scrollspy="target: > li; cls: uk-animation-scale-up; delay: 20;repeat:true"
              >
                {postings.map((posting) => (
                  <li
                    className="pr-3 w-full md:w-1/2"
                    uk-scrollspy-className="uk-animation-fade"
                    key={posting.id}
                  >
                    <div className="card">
                      <a href={`/notification/introduction/${posting.id}`}>
                        <div className="card-media sm:aspect-[2/1.7] h-72">
                          <img src={posting.thumbImage || "/images/product/product-3.jpg"} alt="" />
                          <div className="card-overly"></div>
                        </div>
                      </a>
                      <div className="card-body relative">
                        <a href={`/notification/introduction/${posting.id}`}>
                          <span className=" text-teal-600 font-semibold text-xs line-clamp-2">
                            {posting.title}
                          </span>
                        </a>
                        <a href={`/notification/introduction/${posting.id}`}>
                          <p className="text-black text-xs mt-0.5 line-clamp-2">
                            {posting.description}
                          </p>
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="max-md:hidden">
              <a
                className="nav-prev !bottom-1/2 !top-auto"
                href="#"
                uk-slider-item="previous"
              >
                {" "}
                <ion-icon
                  name="chevron-back"
                  className="text-2xl"
                ></ion-icon>{" "}
              </a>
              <a
                className="nav-next !bottom-1/2 !top-auto"
                href="#"
                uk-slider-item="next"
              >
                {" "}
                <ion-icon
                  name="chevron-forward"
                  className="text-2xl"
                ></ion-icon>
              </a>
            </div>

            <div className="flex justify-center">
              <ul className="inline-flex flex-wrap justify-center my-5 gap-2 uk-dotnav uk-slider-nav">
                {" "}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[100vh] w-[100vw]">
          <Spinner></Spinner>
        </div>
      )}
    </>
  );
}

export default NotificationIntroduction;
