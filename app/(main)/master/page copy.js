"use client";

import {useState,useCallback} from "react";
import {Avatar, Button, Spacer, Tab, Tabs, Tooltip, useDisclosure} from "@nextui-org/react";
import {Icon} from "@iconify/react";
import {AcmeIcon} from "./components/acme";
import ManagePoint from "./components/ManagePoint";
import AppearanceSetting from "./components/appearance-setting";
import Queries from "./components/queries";
import FAQ from "./components/faq";
import TeamSetting from "./components/queries";
import SidebarDrawer from "./components/sidebar-drawer";
import Sidebar from "./components/sidebar";
import {cn} from "./components/cn";

import {items} from "./components/items";

export default function Component() {
  const {isOpen, onOpenChange} = useDisclosure();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onToggle = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  return (
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
          <Tab key="포인트관리" title="포인트관리">
            <ManagePoint />
          </Tab>
          {/* <Tab key="출금 신청 및 확인" title="출금 신청 및 확인">
            <AppearanceSetting />
          </Tab> */}
          <Tab key="1:1문의" title="1:1문의">
            <Queries />
          </Tab>
          <Tab key="자주하는 질문" title="자주하는 질문">
            <FAQ/>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
