"use client";

import * as React from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Icon } from "@iconify/react";
import { Button, Badge, Input, Spacer, Textarea } from "@nextui-org/react";

import { cn } from "./cn";

export default function ProfileSetting() {
  
  return (
  <div className="p2">
    {/* Profile */}
    <div>
      <p className="text-base font-medium text-default-700">내 정보</p>
      <p className="mt-1 text-sm font-normal text-default-400"></p>
      <Card className="mt-4 bg-default-100" shadow="none">
        <CardBody>
          <div className="flex items-center gap-4">
            <Badge
              disableOutline
              classNames={{
                badge: "w-5 h-5",
              }}
              content={
                <Button
                  isIconOnly
                  className="h-5 w-5 min-w-5 bg-background p-0 text-default-500"
                  radius="full"
                  size="sm"
                  variant="bordered"
                >
                  <Icon className="h-[9px] w-[9px]" icon="solar:pen-linear" />
                </Button>
              }
              placement="bottom-right"
              shape="circle"
            >
              <Avatar
                className="h-16 w-16"
                src="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatars/e1b8ec120710c09589a12c0004f85825.jpg"
              />
            </Badge>
            <div>
              <p className="text-sm font-medium text-default-600">이중재</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
    <Spacer y={4} />
    {/* Title */}
    <div>
      <p className="text-base font-medium text-default-700">이메일</p>
      <Input className="mt-2" placeholder="이메일 주소를 입력해주세요." />
    </div>
    <Spacer y={2} />
    {/* Location */}
    <div>
      <p className="text-base font-medium text-default-700">연락처</p>
      <Input className="mt-2" placeholder="연락처를 입력해주세요." />
    </div>
    <Spacer y={4} />
    <div>
      <p className="text-base font-medium text-default-700">출금계좌</p>
      <div className="grid grid-cols-5">
        <div className="col-span-1">
          <Input className="mt-2" placeholder="은행를 입력해주세요." />
        </div>
        <div className="col-span-4">
          <Input className="mt-2" placeholder="출금계좌를 입력해주세요." />
        </div>
      </div>
    </div>
    <Spacer y={4} />
    {/* Biography */}

    <Button color="primary" size="sm">
      수정
    </Button>
  </div>
  );
}


