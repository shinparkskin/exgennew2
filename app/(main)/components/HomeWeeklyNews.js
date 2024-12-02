"use client";
import React from "react";
import { createClient } from "../../../utils/supabase/client";

function HomeWeeklyNews() {
  const supabase = createClient();
  const [weeklyNews, setWeeklyNews] = React.useState([]);

  React.useEffect(() => {
    const fetchWeeklyNews = async () => {
      const { data, error } = await supabase
        .from("weeklynews")
        .select("*")
        .eq("isForbidden", false)
        .limit(5)
        .order("id", { ascending: false })


      if (error) {
        console.error("Error fetching notifications:", error);
      } else {
        setWeeklyNews(data);
      }
    };

    fetchWeeklyNews();
  }, []);

  return (
    <div className="box p-5 px-6">
      <div className="flex items-baseline justify-between text-black dark:text-white">
        <h3 className="font-bold text-xl"> 이번주 소식</h3>
        <a href="/notification" className="text-sm text-blue-500">
          더보기
        </a>
      </div>

      <div className="mt-4 space-y-4">
        {weeklyNews.map((weeklyNews, index) => (
          <div>
            <a href={`notification/weeklynews/${weeklyNews.id}`}>
              <h4 className="text-sm font-normal text-black dark:text-white duration-200 hover:opacity-80">
                {weeklyNews.title}
              </h4>
            </a>
            <div className=" text-xs text-gray-500 mt-2 flex items-center gap-2">
              <div className="flex gap-x-5">
                <div>
                  <p className="">
                    {new Date(weeklyNews.regiDate).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div> {weeklyNews.viewCount} views</div>
              </div>
              {/* <div className="md:block hidden">·</div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeWeeklyNews;
