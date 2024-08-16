'use client'
import React from "react";
import ReviewYoutube from "./components/ReviewYoutube";
import ReviewRealreview from "./components/ReviewRealreview";
function page() {
  return (
    <div class="flex-1">
      <div class="lg:max-w-[680px] w-full">
        <ReviewYoutube />
        <ReviewRealreview />
      </div>
    </div>
  );
}

export default page;
