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
  Pagination,
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
import { createClient } from "../../../../utils/supabase/client";

function queries() {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [datas, setDatas] = useState([]);
  const [details, setDetails] = useState([]);
  const [answer, setAnswer] = useState("");
  const [search, setSearch] = useState("");
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
  const supabase=createClient();
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

  const getDatas = async () => {
    const { data, error, count } = await supabase
      .from("queries")
      .select("*", { count: "exact" })
      .order("id", { ascending: false })
      .ilike("question", `%${search}%`)
      .range((currentPage - 1) * pageSize, currentPage * pageSize - 1);
    setDatas(data);
    setTotalPages(Math.ceil(count / pageSize));
  };

  const debounce = (func, delay) => {
    let debounceTimer;
    return function(...args) {
      const context = this;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const debouncedGetDatas = debounce(getDatas, 500);

  useEffect(() => {
    debouncedGetDatas();
  }, [currentPage, search]);

  const getDetails=async(id)=>{
    const { data, error } = await supabase.from("queries").select("*").eq("id", id).single();
    setDetails(data);
    setAnswer(data.answer)
  }

  const handleUpdate=async()=>{
    const { data, error } = await supabase.from("queries").update({answer:answer}).eq("id", details.id);
    if(error){
      console.error("Error updating query:", error);
    }else{
      console.log("Query updated successfully:", data);
      getDatas();
      setAnswer("");
    }
  }

  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const { isOpen: isImageModalOpen, onOpen: onImageModalOpen, onOpenChange: onImageModalOpenChange } = useDisclosure();

  const handleImageView = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    onImageModalOpen();
  };

  console.log('details:',details)
  return (
    <Card className={"border border-default-200 bg-transparent"} shadow="none">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                문의내용
              </ModalHeader>
              <ModalBody>
                <p>{details.question}</p>

                <div className="flex flex-wrap gap-x-5 justify-start items-center gap-y-5 my-5">
                  {details.images && details.images.length > 0 ? details.images.map((image, index) => (
                    <div
                      key={index}
                      className="w-20 h-20 relative rounded cursor-pointer"
                      onClick={() => handleImageView(image)}
                    >
                      <Image
                        fill
                        src={image}
                        alt={`Selected image ${index + 1}`}
                        className="rounded-2xl"
                      />
                    </div>
                  )) : (
                    <div></div>
                  )}
                </div>
                <hr />
                <h2 className="font-bold text-lg">답변내용</h2>
                <Textarea
                  placeholder="답변 내용 작성해주세요"
                  className="w-full"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  취소
                </Button>
                <Button color="primary" onPress={() => { handleUpdate(); onClose(); }}>
                  저장
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal 
        isOpen={isImageModalOpen} 
        onOpenChange={onImageModalOpenChange}
        size="5xl"
      >
        <ModalContent>
          {(onClose) => (
            <ModalBody>
              <Image
                src={selectedImageUrl}
                alt="Selected image"
                width={1000}
                height={1000}
                layout="responsive"
                objectFit="contain"
              />
              <Button auto flat color="" variant='bordered' onClick={onClose}>
                닫기
              </Button>
            </ModalBody>
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* <Button onClick={onOpen2} color="default" variant="bordered">
            작성하기
          </Button> */}
        </div>
        <div className="my-5">
          <Table removeWrapper aria-label="Example static collection table">
            <TableHeader>
              <TableColumn className="w-3/5 text-center">질문</TableColumn>
              <TableColumn className="w-1/5 text-center">작성일</TableColumn>
              <TableColumn className="w-1/5 text-center">작성자</TableColumn>
            </TableHeader>
            <TableBody>
              {datas.map((data) => (
                <TableRow key={data.id}>
                  <TableCell className="w-3/5 text-center">
                    <Button onClick={() => { getDetails(data.id);onOpen(); }}>
                      {data.question}
                    </Button>
                  </TableCell>
                  <TableCell className="w-1/5 text-center">
                    {new Date(data.regiDate).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    })}
                  </TableCell>
                  <TableCell className="w-1/5 text-center">
                    {data.creator}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex w-full justify-center my-5">
            <Pagination
              total={totalPages}
              initialPage={currentPage}
              onChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default queries;