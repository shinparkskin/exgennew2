"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Card, Skeleton,Spacer,Spinner } from "@nextui-org/react";

import ReplyText from "@/app/(main)/components/ReplyText";
export default function Page({params}) {
  const [posting, setPosting] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const pathname = usePathname();
  const pathParts = pathname.split("/");
  const postingId = pathParts[pathParts.length - 1];
  const tableName = pathParts[pathParts.length - 2];
  const [user, setUser] = useState(null);
  const supabase = createClient();

  

    const fetchData = async () => {
      const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .eq("id", postingId)
        .single();

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        console.log("Fetched data:", data);
      }
      setPosting(data);
      setIsCompleted(true);
    };

    const getUser=async()=>{
      const { data: user, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
      } else {
        console.log("Fetched user:", user);
        const { data: existingData, error: selectError } = await supabase
          .from('noticheck')
          .select('*')
          .eq('category1', 'notification')
          .eq('category2', tableName)
          .eq('postingId', postingId)
          .eq('userId', user.user.id);
  
        if (selectError) {
          console.error("Error checking existing data:", selectError);
        } else if (existingData.length === 0) {
          const { data, error: insertError } = await supabase
            .from('noticheck')
            .insert([{category1:'notification',category2:tableName,postingId: postingId, userId: user.user.id }]);
  
          if (insertError) {
            console.error("Error inserting data:", insertError);
          } else {
            console.log("Data inserted successfully:", data);
          }
        } else {
          console.log("Matching data already exists:", existingData);
        }
        
      }
    }
  useEffect(() => {
    fetchData();
    getUser();
  }, []);
  return (
    <div class="flex-1">
      {isCompleted ? (
        <>
          <div class="box overflow-hidden">
            <div class="relative h-80">
              <img
                src={posting.thumbImage || "/images/logo-mobile-light.png"}
                class="h-36 mb-4 w-full h-full object-cover"
              />
            </div>
            <div class="p-6">
              <h1 class="text-xl font-semibold mt-1">{posting.title}</h1>

              <div class="flex gap-3 text-sm mt-6 flex items-center">
                <img
                  src="/images/logo.png"
                  alt=""
                  class="w-9 h-9 rounded-full object-contain"
                />
                <div class="flex-1 ">
                  <h4 class="text-black font-medium dark:text-white">
                    {posting.creator}
                  </h4>

                </div>
                <div class="font-normal text-gray-500 gap-1">
                  <span class="text-sm ml-auto text-gray-400">
                    {new Date(posting.regiDate).toLocaleString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                </div>
              </div>

              <div class="space-y-2 text-sm font-normal mt-6 leading-6 text-black dark:text-white">
                <p className="whitespace-pre-line">
                  {posting.description}
                </p>
                  
              </div>
            </div>
            </div>

  <Spacer y={5}></Spacer>
        <ReplyText></ReplyText>


        </>
      ) : (
        <div className="flex justify-center items-center w-[100vw] h-[100vh]">
          <Spinner color="primary" />
        </div>
      )}
    </div>
  );
}
