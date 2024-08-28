import React from "react";
import NotificationIntroduction from "./components/NotificationIntroduction";
import NotificationEvent from "./components/NotificationEvent";
import NotificationWeeklyNews from "./components/NotificationWeeklyNews";
function page() {
  return (
    <>
      <div className="flex w-full">
        <div className="w-full">
          <NotificationIntroduction />
          <NotificationEvent />
          <NotificationWeeklyNews></NotificationWeeklyNews>

        </div>
      </div>
    </>
  );
}

export default page;
