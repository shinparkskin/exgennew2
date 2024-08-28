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
  const [category, setCategory] = useState("자랑하기");
  const [postingType, setPostingType] = useState("당첨자랑");
  const [thumbUrl, setThumbUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [email, setEmail] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [selectedImages, setSelectedImages] = useState([
    "/images/product/product-3.jpg", // initial placeholder images
    "/images/product/product-3.jpg",
    "/images/product/product-3.jpg",
    "/images/product/product-3.jpg",
    "/images/product/product-3.jpg",
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Error getting user:", error);
    } else {
      setEmail(data.user.email);
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("nickname")
        .eq("id", data.user.id)
        .single();

      if (profileError) {
        console.error("Error fetching profile:", profileError);
      } else {
        setNickname(profileData.nickname);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

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

        const insertData = async () => {
          let data, error;
          if (category === "자랑하기") {
            ({ data, error } = await supabase.from("boast").insert([
              {
                title: title,
                description: content,
                totalImages: paths,
                thumbImage: paths[0],
                creator: "이중재",
                boastType: postingType,
              },
            ]));
          } else if (category === "회사소개") {
            ({ data, error } = await supabase.from("introduction").insert([
              {
                title: title,
                description: content,
                // totalImages: paths,
                thumbImage: paths[0],
                creator: nickname,
              },
            ]));
          } else if (category === "공지사항") {
            ({ data, error } = await supabase.from("notification").insert([
              {
                title: title,
                description: content,
                thumbImage: paths[0],
                creator: nickname,
              },
            ]));
          } else if (category === "프로모션 이벤트") {
            ({ data, error } = await supabase.from("promotion").insert([
              {
                title: title,
                description: content,
                thumbImage: paths[0],
                creator: nickname,
              },
            ]));
          } else if (category === "매니저 이야기") {
            ({ data, error } = await supabase.from("manager").insert([
              {
                title: title,
                description: content,
                thumbImage: paths[0],
                creator: nickname,
              },
            ]));
          } else if (category === "이번 주 소식") {
            ({ data, error } = await supabase.from("weeklynews").insert([
              {
                title: title,
                description: content,
                thumbImage: paths[0],
                creator: nickname,
              },
            ]));
          } else if (category === "체험단시대 YOUTUBE") {
            ({ data, error } = await supabase.from("youtube").insert([
              {
                title: title,
                description: content,
                thumbImage: thumbUrl,
                videoUrl: videoUrl,
                creator: nickname,
              },
            ]));
          } else if (category === "리얼리뷰") {
            ({ data, error } = await supabase.from("realreview").insert([
              {
                title: title,
                description: content,
                thumbImage: paths[0],
                creator: nickname,
              },
            ]));
          } else if (category === "감사해요") {
            ({ data, error } = await supabase.from("thankyou").insert([
              {
                title: title,
                description: content,
                thumbImage: paths[0],
                creator: nickname,
              },
            ]));
          }

          if (error) {
            console.error("Error inserting data:", error);
          } else {
            console.log("Data inserted successfully:", data);
          }
        };

        insertData();

        setIsLoading(false);
        setIsCompleted(true);
        setCategory("자랑하기");
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
    <div className="py-12 text-black text-sm flex justify-center items-center flex-col w-full">
      <div className="space-y-6 w-full flex justify-center items-center flex-col">
        <div className="flex justify-start items-center gap-10 w-full">
          <label className="md:w-16 text-right"> 카테고리 </label>
          <div className="flex-1 max-md:mt-4">
            <select
              className="!border-0 !rounded-md w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {email === "quizman3245@naver.com" ? (
                <>
                  <option value="자랑하기">자랑하기</option>
                  <option value="회사소개">회사소개</option>
                  <option value="공지사항">공지사항</option>
                  <option value="프로모션 이벤트">프로모션 이벤트</option>
                  <option value="매니저 이야기">매니저 이야기</option>
                  <option value="이번 주 소식">이번 주 소식</option>
                  <option value="체험단시대 YOUTUBE">체험단시대 YOUTUBE</option>
                  <option value="리얼리뷰">리얼리뷰</option>
                  <option value="감사해요">감사해요</option>
                </>
              ) : (
                <option value="자랑하기">자랑하기</option>
              )}
            </select>
          </div>
        </div>
        {category === "자랑하기" && (
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
        )}
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
        {category === "체험단시대 YOUTUBE" && (
          <>
            <div className="md:flex items-center gap-10 w-full">
              <label className="w-16 text-right">썸네일</label>
              <div className="flex-1 max-md:mt-4 ">
                <input
                  type="text"
                  placeholder="이미지 URL을 입력해주세요"
                  className="w-full"
                  value={thumbUrl}
                  onChange={(e) => setThumbnailImage(e.target.value)}
                />
              </div>
            </div>
            <div className="md:flex items-center gap-10 w-full">
              <label className="w-16 text-right">영상주소</label>
              <div className="flex-1 max-md:mt-4 ">
                <input
                  type="text"
                  placeholder="영상 URL을 입력해주세요"
                  className="w-full"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
              </div>
            </div>
          </>
        )}

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
        {category !== "체험단시대 YOUTUBE" && (
          <div className="md:flex items-start w-full gap-10">
            <div className="flex flex-col justify-center items-start">
              <div className="flex justify-center items-center">
                <label className="md:w-16 text-right"> 이미지 </label>
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
        )}
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
