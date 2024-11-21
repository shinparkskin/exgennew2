"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../../../utils/supabase/client";
import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";
import { Spinner } from "@nextui-org/react";

function NotificationWeeklyNews() {
  const supabase = createClient();
  const [weeklyNews, setWeeklyNews] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 6; // Number of items to fetch per request

  useEffect(() => {
    const fetchWeeklyNews = async () => {
      const { data, error } = await supabase
        .from("weeklynews")
        .select("*")
        .order("regiDate", { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        console.error("Error fetching weekly news:", error);
      } else {
        setWeeklyNews((prevNews) => {
          const newNews = [...prevNews, ...data];
          const uniqueNews = newNews.filter(
            (news, index, self) =>
              index === self.findIndex((n) => n.id === news.id)
          );
          uniqueNews.sort(
            (a, b) => new Date(b.regiDate) - new Date(a.regiDate)
          ); // Sort by regiDate in descending order
          return uniqueNews;
        });
        if (data.length < limit) {
          setHasMore(false); // No more data to load
        }
      }
    };

    fetchWeeklyNews();
  }, [offset]);

  const fetchMoreData = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  return (
    <>
      <div className="sm:my-6 my-3 flex items-center justify-between border-t pt-3 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-semibold text-black"> 이번 주 소식 </h2>
        </div>
      </div>

      <InfiniteScroll
        dataLength={weeklyNews.length}
        next={fetchMoreData}
        hasMore={hasMore}
        // loader={<Spinner />}
        endMessage={<p className="text-center"></p>}
        className="grid sm:grid-cols-4 grid-cols-2 gap-3"
      >
        {weeklyNews.map((news) => (
          <div key={news.id} className="card uk-transition-toggle">
            <a href={`notification/weeklynews/${news.id}`}>
              <div className="card-media sm:aspect-[2/1.7] h-36">
                <img src={news.thumbImage} alt="" />
                <div className="card-overly"></div>
              </div>
            </a>
            <div className="card-body flex justify-between">
              <Link href={`notification/weeklynews/${news.id}`}>
                <div className="flex-1">
                  <p className="card-text text-black font-medium line-clamp-2">
                    {news.title}
                  </p>
                  <p className="text-xs mt-1 line-clamp-2">
                    {news.description}
                  </p>
                </div>
              </Link>
            </div>
            {/* <div className="absolute w-full bottom-0 bg-white/20 backdrop-blur-sm uk-transition-slide-bottom-small max-xl:h-full z-[2] flex flex-col justify-center">
              <div className="flex gap-3 py-4 px-3">
                <button type="button" className="button border bg-white w-full">
                  <Link href={`notification/weeklynews/${news.id}`}>View</Link>
                </button>
              </div>
            </div> */}
          </div>
        ))}
      </InfiniteScroll>
    </>
  );
}

export default NotificationWeeklyNews;
