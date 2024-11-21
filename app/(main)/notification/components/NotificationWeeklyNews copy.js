'use client'
import {useState,useEffect} from "react";
import {createClient} from "../../../../utils/supabase/client";
import axios from "axios";
import Link from 'next/link'
function NotificationWeeklyNews() {
  const supabase = createClient();
  const [weeklyNews, setWeeklyNews] = useState([]);

  useEffect(() => {
    const fetchWeeklyNews = async () => {
      const { data, error } = await supabase
        .from('weeklynews')
        .select('*')
        .limit(6);

      if (error) {
        console.error('Error fetching weekly news:', error);
      } else {
        setWeeklyNews(data);
      }
    };

    fetchWeeklyNews();
  }, []);
  
  return (
    <>
      <div className="sm:my-6 my-3 flex items-center justify-between border-t pt-3 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-semibold text-black"> 이번 주 소식 </h2>
        </div>
      </div>

      <div
        className="grid sm:grid-cols-3 grid-cols-2 gap-3"
        uk-scrollspy="target: > div; cls: uk-animation-scale-up; delay: 100 ;repeat: true"
      >
        {weeklyNews.map((news) => (
          <div className="card uk-transition-toggle">
          <a href={`notification/weeklynews/${news.id}`}>
            <div className="card-media sm:aspect-[2/1.7] h-36">
              <img src={news.thumbImage} alt="" />
              <div className="card-overly"></div>
            </div>
          </a>
          <div className="card-body flex justify-between">
            <div className="flex-1">
              <p className="card-text text-black font-medium line-clamp-1">
                {news.title}
              </p>
              <div className="text-xs line-clamp-1 mt-1"> {news.description} </div>
            </div>
          </div>
          <div className="absolute w-full bottom-0 bg-white/20 backdrop-blur-sm uk-transition-slide-bottom-small max-xl:h-full z-[2] flex flex-col justify-center">
            <div className="flex gap-3 py-4 px-3">
              <button type="button" className="button border bg-white w-full">
                <Link href={`notification/weeklynews/${news.id}`}>Veiw</Link>
              </button>
            </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default NotificationWeeklyNews;
