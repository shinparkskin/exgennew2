"use client";

import {useState,useCallback} from "react";
import {Avatar, Button, Spacer, Tab, Tabs, Tooltip, useDisclosure} from "@nextui-org/react";
import ManagePoint from "./components/ManagePoint";
import Queries from "./components/queries";
import FAQ from "./components/faq";

export default function Component() {
  const tabItems = [
    { key: "포인트관리", title: "포인트관리", content: <ManagePoint /> },
    { key: "1:1문의", title: "1:1문의", content: <Queries /> },
    { key: "자주하는 질문", title: "자주하는 질문", content: <FAQ /> },
  ];

  return (
    <div className="flex h-dvh w-full gap-4">
      <div className="w-full flex-1">
        <Tabs
          fullWidth
          items={tabItems}
          classNames={{
            base: "mt-6",
            cursor: "bg-content1 dark:bg-content1",
            panel: "w-full",
          }}
        >
          {(item) => (
            <Tab key={item.key} title={item.title}>
              {item.content}
            </Tab>
          )}
        </Tabs>
      </div>
    </div>
  );
}
