"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "../../../utils/supabase/client";
import { Spinner } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";

function HomeNotification() {
  const [isCompleted, setIsCompleted] = useState(false);
  const supabase = createClient();
  const [notifications, setNotifications] = React.useState([]);
  const searchParams = useSearchParams();
  React.useEffect(() => {
    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from("notification")
        .select("*")
        .order("id", { ascending: false })
        .eq("isForbidden", false)
        .limit(5);

      if (error) {
        console.error("Error fetching notifications:", error);
      } else {
        setNotifications(data);
      }
    };
    setIsCompleted(true);

    fetchNotifications();
  }, []);

  return (
    <>
      {isCompleted ? (
        <div>
          <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <div class="page-heading">
            <h1 class="page-title my-3"> 공지사항 </h1>
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
                {notifications.map((notification, index) => (
                  <li
                    class="pr-3 md:w-1/4 w-1/2"
                    uk-scrollspy-class="uk-animation-fade"
                  >
                    <div class="card h-72 flex flex-col">
                      <a href={`/notification/notification/${notification.id}`}>
                        <div class="h-full w-full">
                          <img
                            src={
                              notification.thumbImage ||
                              "/images/logo-mobile-light.png"
                            }
                            alt=""
                            class="w-full h-40 object-fill"
                          />
                          <div class="card-overly"></div>
                        </div>
                      </a>
                      <div class="card-body relative">
                        <a
                          href={`/notification/notification/${notification.id}`}
                        >
                          <span class="text-teal-600 font-semibold text-xs line-clamp-2 my-1">
                            {notification.title}
                          </span>
                        </a>
                        <a
                          href={`/notification/notification/${notification.id}`}
                        >
                          <p class=" text-xs mt-0.5 line-clamp-2 my-1">
                            {notification.description}
                          </p>
                        </a>
                        <div class="text-xs flex justify-end">
                          <span class="text-gray-500 text-xs">
                            {new Date(notification.regiDate).toLocaleDateString(
                              "ko-KR",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
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
        </div>
      ) : (
        <div className="flex justify-center items-center h-[100vh] w-[100vw]">
          <Spinner></Spinner>
        </div>
      )}
    </>
  );
}

export default HomeNotification;
