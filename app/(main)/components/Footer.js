"use client";

import React from "react";
import { Divider, Link } from "@nextui-org/react";
import { Icon } from "@iconify/react";

import ThemeSwitch from "./theme-switch";

const footerNavigation = {
  services: [{ name: "공생마케팅", href: "#" }],

  supportOptions: [{ name: "체험단시대", href: "#" }],

  aboutUs: [{ name: "신주원", href: "#" }],

  legal: [{ name: "010 9935 3659", href: "#" }],

  email: [{ name: "quizman3245@naver.com", href: "#" }],

  businessNo: [{ name: "861-32-00236", href: "#" }],

  address: [{ name: "서울시 마곡동 777-5 보타닉타워  513호 ", href: "#" }],

  social: [
    {
      name: "Facebook",
      href: "#",
      icon: (props) => <Icon {...props} icon="fontisto:facebook" />,
    },
    {
      name: "Instagram",
      href: "#",
      icon: (props) => <Icon {...props} icon="fontisto:instagram" />,
    },
    {
      name: "Twitter",
      href: "#",
      icon: (props) => <Icon {...props} icon="fontisto:twitter" />,
    },
    {
      name: "GitHub",
      href: "#",
      icon: (props) => <Icon {...props} icon="fontisto:github" />,
    },
  ],
};

export default function Component() {
  const renderList = React.useCallback(
    ({ title, items }) => (
      <div className="text-foreground ">
        <h3 className="text-small font-semibold text-default-600">{title}</h3>
        <ul className="mt-2 md:space-y-4">
          {items.map((item) => (
            <li key={item.name} style={{ wordBreak: "break-all" }}>
                {item.name}
            </li>
          ))}
        </ul>
      </div>
    ),

    []
  );

  return (
    <footer className="flex w-full flex-col ">
      <div className="max-w-7xl px-6 pb-8 lg:px-8 md:pt-10">
        <div className="xl:grid xl:grid-cols-2 xl:gap-8">
          <div className="mt-10 grid grid-cols-2 md:gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                {renderList({
                  title: "회사명",
                  items: footerNavigation.services,
                })}
              </div>
              <div className="mt-2">
                {renderList({
                  title: "브랜딩채널",
                  items: footerNavigation.supportOptions,
                })}
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                {renderList({
                  title: "대표자명",
                  items: footerNavigation.aboutUs,
                })}
              </div>
              <div className="mt-2">
                {renderList({
                  title: "대표번호",
                  items: footerNavigation.legal,
                })}
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className="mt-2">
                {renderList({
                  title: "이메일",
                  items: footerNavigation.email,
                })}
              </div>
              <div className="mt-2">
                {renderList({
                  title: "사업자번호",
                  items: footerNavigation.businessNo,
                })}
              </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-4=">
              <div className="mt-2">
                {renderList({
                  title: "회사주소",
                  items: footerNavigation.address,
                })}
              </div>
            </div>
          </div>
        </div>
        <Divider className="mt-5 md:mt-16 sm:mt-5 lg:mt-10" />
        <div className="flex flex-wrap justify-between gap-2 pt-8">
          <p className="text-small text-default-400">
            &copy; 2024 공생마케팅. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
