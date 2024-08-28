import React from "react";
import BoastBest from "./components/BoastBest";
import BoastList from "./components/BoastList";
function page() {
  return (
    <div class="flex-1 page-heading">
      <div class="w-full">
        <BoastBest></BoastBest>
        <BoastList></BoastList>
      </div>
    </div>
  );
}

export default page;
