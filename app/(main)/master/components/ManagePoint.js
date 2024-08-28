"use client";

import * as React from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Icon } from "@iconify/react";
import { Button, Badge, Input, Spacer, Textarea } from "@nextui-org/react";
import { ChevronDownIcon, SearchIcon } from "@nextui-org/shared-icons";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import countries from "./countries";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

import { users } from "./data";
import { cn } from "./cn";

export default function ProfileSetting() {
  const variant = "flat";
  const [page, setPage] = React.useState(1);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const rowsPerPage = 4;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);
  return (
    <div className="p2">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">내용</ModalHeader>
              <ModalBody>
                <p>계좌번호 : 농협 / 123-1230-23923 / 이중재</p>
                <p></p>
                <p></p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  출금취소
                </Button>
                <Button color="primary" onPress={onClose}>
                  출금완료
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <p className="text-base font-medium text-default-700">아이디</p>
      <Spacer y={4} />

      <Autocomplete
        isRequired
        defaultItems={countries}
        label=""
        labelPlacement="outside"
        placeholder="아이디를 선택하세요"
        showScrollIndicators={false}
        variant={variant}
      >
        {(item) => (
          <AutocompleteItem
            key={item.code}
            startContent={
              <Avatar
                alt="Country Flag"
                className="h-6 w-6"
                src={`https://flagcdn.com/${item.code.toLowerCase()}.svg`}
              />
            }
            value={item.code}
          >
            {item.name}
          </AutocompleteItem>
        )}
      </Autocomplete>
      <Spacer y={4} />
      <p className="text-base font-medium text-default-700">보유 포인트</p>
      <Spacer y={4} />

      <Input type="email" placeholder="0" isDisabled />
      <Spacer y={4} />
      <p className="text-base font-medium text-default-700">포인트 증감</p>
      <div className="grid grid-cols-5 gap-x-5">
        <Input
          className="col-span-3"
          type="number"
          step="100"
          placeholder="증감할 포인트를 입력하세요"
        />
        <Button className="col-span-1" color="primary">
          적립
        </Button>
        <Button color="danger" variant="light">
          감소
        </Button>
      </div>
      <Spacer y={4} />
      <p className="text-base font-medium text-default-700">히스토리</p>
      <Spacer y={4} />

      <Table
        aria-label="Example table with client side pagination "
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px] overflow-x-scroll",
        }}
      >
        <TableHeader>
          <TableColumn className="w-1/5 text-center" key="name">
            내용
          </TableColumn>
          <TableColumn className="w-1/5 text-center" key="role">
            증감
          </TableColumn>
          <TableColumn className="w-1/5 text-center" key="role">
            합계
          </TableColumn>
          <TableColumn className="w-1/5 text-center" key="status">
            날짜
          </TableColumn>
          <TableColumn className="w-1/5 text-center" key="result">
            결과
          </TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow className="" key={item.name}>
              {(columnKey) => (
                <TableCell style={{ textAlign: "center" }}>
                  {columnKey === "result" ? (
                    getKeyValue(item, columnKey) ? (
                      <Button onClick={onOpen} variant="ghost">
                        {getKeyValue(item, columnKey)}
                      </Button>
                    ) : null
                  ) : (
                    getKeyValue(item, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
