"use client";
import { useState, useEffect } from "react";
import {
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
import { Textarea } from "@nextui-org/react";
import Image from "next/image";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

function queries() {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [selectedImages, setSelectedImages] = useState([
    "/images/product/product-3.jpg", // initial placeholder images
    "/images/product/product-3.jpg",
    "/images/product/product-3.jpg",
  ]);
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onOpenChange: onOpenChange1,
  } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onOpenChange: onOpenChange2,
  } = useDisclosure();
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedImages = [...selectedImages];
      updatedImages[index] = URL.createObjectURL(file);
      setSelectedImages(updatedImages);
    }
  };
  const handleImageClick = (index) => {
    // Trigger a hidden file input click when an image is clicked
    document.getElementById(`imageInput${index}`).click();
  };
  const handleSubmit = () => {
    setIsLoading(true);
    const uploadImages = async () => {
      const uploadPromises = selectedImages
        .filter((image) => !image.includes("product-3"))
        .map(async (image, index) => {
          const response = await fetch(image);
          const blob = await response.blob();
          const fileExt = image.split(".").pop();
          const fileName = `${Date.now()}-${index}.jpg`;
          const filePath = `images/${fileName}`;
          console.log("filePath:", filePath);
          console.log("fileName:", fileName);

          const { data, error } = await supabase.storage
            .from("images")
            .upload(filePath, blob);

          if (error) {
            console.error("Error uploading image:", error);
            return null;
          }

          return (
            "https://rxgvhikbaexklehfaurw.supabase.co/storage/v1/object/public/images/" +
            data.path
          );
        });

      const imagePaths = await Promise.all(uploadPromises);
      return imagePaths.filter((path) => path !== null);
    };

    uploadImages()
      .then((paths) => {
        console.log("Uploaded image paths:", paths);

        const insertBoast = async () => {
          const { data, error } = await supabase.from("boast").insert([
            {
              title: title,
              description: content,
              totalImages: paths,
              thumbImage: paths[0],
              creator: "이중재",
              boastType: postingType,
            },
          ]);

          if (error) {
            console.error("Error inserting boast:", error);
          } else {
            console.log("Boast inserted successfully:", data);
          }
        };

        insertBoast();

        setIsLoading(false);
        setIsCompleted(true);

        setTitle("");
        setContent("");
        setSelectedImages([
          "/images/product/product-3.jpg", // initial placeholder images
          "/images/product/product-3.jpg",
          "/images/product/product-3.jpg",
          "/images/product/product-3.jpg",
          "/images/product/product-3.jpg",
        ]);
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
        setIsLoading(false);
      });
  };
  return (
    <Card className={"border border-default-200 bg-transparent"} shadow="none">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                체험단 신청했는데 답이 안와요
              </ModalHeader>
              <ModalBody>
                <p>잠도 안와요</p>
                <hr />
                <p></p>
                <h2 className="font-bold text-lg">답변하기</h2>
                <Textarea
                  placeholder="답변 내용 작성해주세요"
                  className="w-full"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  취소
                </Button>
                <Button color="primary" onPress={onClose}>
                  저장
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <CardBody>
        <div className="flex items-center justify-between gap-3">
          <Input
            isClearable
            className="w-full"
            placeholder="검색어를 입력하세요"
            startContent={<SearchIcon />}
          />
          {/* <Button onClick={onOpen2} color="default" variant="bordered">
            작성하기
          </Button> */}
        </div>
        <div className="my-5">
          <Table removeWrapper aria-label="Example static collection table">
            <TableHeader>
              <TableColumn className="w-3/5 text-center">제목</TableColumn>
              <TableColumn className="w-1/5 text-center">작성일</TableColumn>
              <TableColumn className="w-1/5 text-center">작성자</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell className="w-3/5 text-center">
                  <Button onClick={onOpen}>
                    체험단 신청했는데 답이 안와요
                  </Button>
                </TableCell>
                <TableCell className="w-1/5 text-center">
                  2024년 8월 10일
                </TableCell>
                <TableCell className="w-1/5 text-center">
                  {/* <Button onClick={onOpen1}>답변보기</Button> */}
                  이중재
                </TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell className="w-3/6 text-center">
                  <Button onClick={onOpen}>방법을 잘 모르겠어요</Button>
                </TableCell>
                <TableCell className="w-1/5 text-center">
                  2024년 8월 10일
                </TableCell>
                <TableCell className="w-1/5 text-center">
                  {/* <Button onClick={onOpen1}>답변보기</Button> */}
                  신주원
                </TableCell>
              </TableRow>
              <TableRow key="3">
                <TableCell className="w-3/5 text-center">
                  <Button onClick={onOpen}>출금신청 어떻게 해요?</Button>
                </TableCell>
                <TableCell className="w-1/5 text-center">
                  2024년 8월 10일
                </TableCell>
                <TableCell className="w-1/5 text-center">
                  {/* <Button onClick={onOpen1}>답변보기</Button> */}
                  이중재
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
}

export default queries;
