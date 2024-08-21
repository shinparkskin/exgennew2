"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import { createClient } from "@/utils/supabase/client";
function page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [postingType, setPostingType] = useState("당첨자랑");
  const [selectedImages, setSelectedImages] = useState([
    "/images/product/product-3.jpg", // initial placeholder images
    "/images/product/product-3.jpg",
    "/images/product/product-3.jpg",
    "/images/product/product-3.jpg",
    "/images/product/product-3.jpg",
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

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
  console.log("selectedImages", selectedImages);
  return (
    <div className="py-12 text-black text-sm flex justify-center items-center flex-col w-full">
      <div className="space-y-6 w-full flex justify-center items-center flex-col">
        <div className="flex justify-start items-center gap-10 w-full">
          <label className="md:w-16 text-right"> 카테고리 </label>
          <div className="flex-1 max-md:mt-4">
            <select className="!border-0 !rounded-md w-full">
              <option value="1">자랑하기</option>
            </select>
          </div>
        </div>
        <div className="flex justify-start items-center gap-10 w-full">
          <label className="md:w-16 text-right"> 타입 </label>
          <div className="flex-1 max-md:mt-4">
            <select
              className="!border-0 !rounded-md w-full"
              value={postingType}
              onChange={(e) => setPostingType(e.target.value)}
            >
              <option value="당첨자랑">당첨자랑</option>
              <option value="택배자랑">택배자랑</option>
              <option value="부업자랑">부업자랑</option>
              <option value="입금인증">입금인증</option>
              <option value="맛집인증">맛집인증</option>
            </select>
          </div>
        </div>
        <div className="md:flex items-center gap-10 w-full">
          <label className="w-16 text-right"> 제목 </label>
          <div className="flex-1 max-md:mt-4 ">
            <input
              type="text"
              placeholder="제목을 입력하세요"
              className="w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        <div className="md:flex items-start gap-10 w-full">
          <label className="md:w-16 text-right"> 글내용 </label>
          <div className="flex-1 max-md:mt-4">
            <textarea
              className="w-full"
              rows="5"
              placeholder="글 내용을 입력하세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="md:flex items-start w-full gap-10">
          <div className="flex flex-col justify-center items-start">
            <div className="flex justify-center items-center">
              <label className="md:w-16 text-right"> 이미지 </label>
              {/* <button
                type="button"
                class=" p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="sr-only">Attach file</span>
              </button> */}
            </div>
          </div>

          <div className="flex flex-wrap gap-x-5 justify-center items-center gap-y-5 mt-5 md:mt-0">
            {selectedImages.map((image, index) => (
              <div
                key={index}
                className="w-20 h-20 relative rounded cursor-pointer"
                onClick={() => handleImageClick(index)}
              >
                <Image
                  fill
                  src={image}
                  alt={`Selected image ${index + 1}`}
                  className="rounded-2xl"
                />
                <input
                  id={`imageInput${index}`}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, index)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center w-full justify-center my-5">
        <Button className="bg-gray-500">취소</Button>
        <Button color="primary" isLoading={isLoading} onClick={handleSubmit}>
          저장
        </Button>
      </div>
    </div>
  );
}

export default page;
