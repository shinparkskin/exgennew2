"use client";
import { useState, useEffect } from "react";
import { createClient } from "../../../../utils/supabase/client";

function NotificationEvent() {
  const [activeTab, setActiveTab] = useState(0);
  const supabase = createClient();
  const [events, setEvents] = useState([]);
  const [tabName, setTabName] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      let tableName = "";
      if (activeTab === 0) {
        tableName = "notification";
        setTabName("notification");
      } else if (activeTab === 1) {
        tableName = "promotion";
        setTabName("promotion");
      } else if (activeTab === 2) {
        tableName = "manager";
        setTabName("manager");
      }

      const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .order("regiDate", { ascending: false })
        .limit(8);

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setEvents(data);
      }
    };

    fetchData();
  }, [activeTab]);
  console.log(events);

  return (
    <>
      <div className="page-heading">
        <h1 className="page-title"> 이벤트 </h1>
        <nav className="nav__underline">
          <ul
            uk-tab
            className="group"
            uk-switcher="connect: #ttabs ; animation: uk-animation-slide-right-medium, uk-animation-slide-left-medium"
          >
            <li>
              
              <a className="cursor-pointer" onClick={() => setActiveTab(0)}> 공지사항 </a>{" "}
            </li>
            <li>
              {" "}
              <a className="cursor-pointer" onClick={() => setActiveTab(1)}> 프로모션 이벤트 </a>{" "}
            </li>
            <li>
              {" "}
              <a className="cursor-pointer" onClick={() => setActiveTab(2)}> 매니저 이야기 </a>{" "}
            </li>
          </ul>
        </nav>
      </div>

      <div className="relative mt-5" tabindex="-1" uk-slider="finite:true">
        <div className="uk-slider-container pb-1">
          <ul className="uk-slider-items grid-small">
            {events.map((event, index) => (
              <li key={index} className="lg:w-1/4 sm:w-1/3 w-1/2">
                <div className="card h-full">
                  <a href={`notification/${tabName}/${event.id}`}>
                    <div className="card-media h-32">
                      <img src={event.thumbImage || "/images/logo-mobile-light.png"} alt="" />
                      <div className="card-overly"></div>
                    </div>
                  </a>
                  <div className="card-body flex flex-col">
                    <div>
                      <p className="text-xs font-medium text-blue-600 mb-1 line-clamp-2">
                        {event.title}
                      </p>
                      <a href={`notification/${tabName}/${event.id}`}>
                        <p className="card-title text-sm line-clamp-2">
                          {event.description}
                        </p>
                      </a>
                      
                    </div>
                    <div className="flex flex-col items-end  card-list-info text-xs mt-1">
                      <p className="card-text text-black ">
                        {event.creator}{" "}
                      </p>
                      <p> {new Date(event.regiDate).toLocaleString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit'})} </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <a className="nav-prev !top-20" href="#" uk-slider-item="previous">
          {" "}
          <ion-icon name="chevron-back" className="text-2xl"></ion-icon>{" "}
        </a>
        <a className="nav-next !top-20" href="#" uk-slider-item="next">
          {" "}
          <ion-icon name="chevron-forward" className="text-2xl"></ion-icon>
        </a>
      </div>
    </>
  );
}

export default NotificationEvent;
