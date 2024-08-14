"use client";
import React from "react";
import {createClient} from "@/utils/supabase/client"

function HomeNotification() {
  const supabase = createClient();
  const [notifications, setNotifications] = React.useState([]);

  React.useEffect(() => {
    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from('notification')
        .select('*')
        .limit(5);

      if (error) {
        console.error('Error fetching notifications:', error);
      } else {
        setNotifications(data);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      <div class="page-heading my-3">
        <h1 class="text-xl font-bold"> 공지사항 </h1>
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
            {notifications.map((notification,index) => (
            <li
              class="pr-3 md:w-1/3 w-1/2"
              uk-scrollspy-class="uk-animation-fade"
            >
              <div class="card h-64 flex flex-col"> {/* Set a fixed height for the card */}
                <a href={`/notification/notification/${notification.id}`}>
                  <div class="card-media sm:aspect-[2/1.7] h-36">
                    <img src={notification.thumbImage} alt="" />
                    <div class="card-overly"></div>
                  </div>
                </a>
                <div class="card-body relative">
                  <a href={`/notification/notification/${notification.id}`}>
                    <span class="text-teal-600 font-semibold text-xs">
                      {notification.title}
                    </span>
                  </a>
                  <a href={`/notification/notification/${notification.id}`}>
                    <p class="card-text block text-black mt-0.5 line-clamp-3"> {/* Limit the number of lines */}
                      {notification.description}
                    </p>
                  </a>
                  <div class="flex justify-end">
                    <span class="text-gray-500 text-xs"> 
                      {`${parseInt(notification.regiDate.substring(4, 6))}월 ${parseInt(notification.regiDate.substring(7, 9))}일`}
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
  );
}

export default HomeNotification;
