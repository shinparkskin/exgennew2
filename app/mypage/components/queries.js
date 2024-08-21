import React from "react";
import {
  Button,
  Input,
  Chip,
  User,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tabs,
  Tab,
  Card,
  CardBody,
  Spinner,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { ChevronDownIcon, SearchIcon } from "@nextui-org/shared-icons";
import { useAsyncList } from "@react-stately/data";

function queries() {
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <Card className={"border border-default-200 bg-transparent"} shadow="none">
      <CardBody>
        <div className="flex items-center justify-between gap-3">
          <Input
            isClearable
            className="w-full"
            placeholder="검색어를 입력하세요 찾기"
            startContent={<SearchIcon />}
          />
        </div>
        <div className="my-5">
          <Table removeWrapper aria-label="Example static collection table">
            <TableHeader>
              <TableColumn className="w-2/3 text-center">제목</TableColumn>
              <TableColumn className="w-1/3 text-center">작성일</TableColumn>
              
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell className="w-2/3 text-center">Tony Reichert</TableCell>
                <TableCell className="w-1/3 text-center">CEO</TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell className="w-2/3 text-center">Zoey Lang</TableCell>
                <TableCell className="w-1/3 text-center">Technical Lead</TableCell>
              </TableRow>
              <TableRow key="3">
                <TableCell className="w-2/3 text-center">Jane Fisher</TableCell>
                <TableCell className="w-1/3 text-center">Senior Developer</TableCell>
              </TableRow>
              <TableRow key="4">
                <TableCell className="w-2/3 text-center">William Howard</TableCell>
                <TableCell className="w-1/3 text-center">Community Manager</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
}

export default queries;
