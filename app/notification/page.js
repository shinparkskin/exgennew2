import React from "react";
import NotificationIntroduction from "./components/NotificationIntroduction";
import NotificationEvent from "./components/NotificationEvent";
import NotificationWeeklyNews from "./components/NotificationWeeklyNews";
function page() {
  return (
    <>
      <div className="flex-1">
        <div className="lg:max-w-[680px] w-full">
          <NotificationIntroduction />
          <NotificationEvent />
          <NotificationWeeklyNews></NotificationWeeklyNews>

        </div>
      </div>
    </>
  );
}

export default page;
