"use client";
import { useMediaQuery } from "usehooks-ts";
import { useCallback } from "react";
import { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Spacer,
  Tab,
  Tabs,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { AcmeIcon } from "./components/acme";
import ProfileSetting from "./components/profile-setting";
import MyQueries from "./components/MyQueries";
import MyPoint from "./components/MyPoint";
import FAQ from "./components/faq";
import TeamSetting from "./components/queries";
import SidebarDrawer from "./components/sidebar-drawer";
import Sidebar from "./components/sidebar";
import { cn } from "./components/cn";
import { createClient } from "../../../utils/supabase/client";
import { items } from "./components/items";
import { useRouter } from "next/navigation";
import MyPost from "./components/MyPost";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";


export default function Component() {
  const { isOpen, onOpenChange } = useDisclosure();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const supabase = createClient();
  const onToggle = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Error fetching user:", error);
      return router.push("/login");
    } else {
      console.log("User fetched successfully:", data);
      if (!data) {
        return router.push("/login");
      }
      setUser(data);
      setIsComplete(true);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {isComplete ? (
        <div className="flex h-dvh w-full gap-4">
          <div className="w-full flex-1">
            <Tabs
              fullWidth
              classNames={{
                base: "mt-6",
                cursor: "bg-content1 dark:bg-content1",
                panel: "w-full",
              }}
            >
              <Tab key="프로필" title="프로필">
                <ProfileSetting />
              </Tab>

              <Tab key="출금 신청 및 확인" title="출금 신청 및 확인">
                <MyPoint />
              </Tab>
              <Tab key="내가 작성한 글" title="내가 작성한 글">
                <MyPost />
              </Tab>
              <Tab key="1:1문의" title="1:1문의">
                <MyQueries/>
              </Tab>
              <Tab key="자주하는 질문" title="자주하는 질문">
                <FAQ />
              </Tab>
              
            </Tabs>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
