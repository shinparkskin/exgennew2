"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import { createClient } from "../../../../utils/supabase/client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { MdOutlineCancel } from "react-icons/md";

function page() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [category, setCategory] = useState("자랑하기");
  const [postingType, setPostingType] = useState("당첨자랑");
  const [thumbUrl, setThumbUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [email, setEmail] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [registerId, setRegisterId] = useState(null);
  const [selectedImages, setSelectedImages] = useState([
    "/images/product/product-3.jpg", // initial placeholder images
    // "/images/product/product-3.jpg",
    // "/images/product/product-3.jpg",
    // "/images/product/product-3.jpg",
    // "/images/product/product-3.jpg",
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Error getting user:", error);
      onOpen();
    } else {
      setEmail(data.user.email);
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (profileError) {
        console.error("Error fetching profile:", profileError);
      } else {
        setNickname(profileData.nickname);
        setAvatarUrl(profileData.avatar_url);
        setEmail(profileData.email);
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
      setSelectedImages([URL.createObjectURL(file), ...selectedImages]);
    }
  };

  const handleImageClick = (index) => {
    // Trigger a hidden file input click when an image is clicked
    document.getElementById(`imageInput${index}`).click();
  };

  const handleSubmit = () => {
    setIsLoading(true);
    let urlPath = "";

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
    let data, error;
    uploadImages()
      .then((paths) => {
        console.log("Uploaded image paths:", paths);
        let tableName, data;
        if (category == "자랑하기") {
          tableName = "boast";
        } else if (category == "회사소개") {
          tableName = "introduction";
        } else if (category == "공지사항") {
          tableName = "notification";
        } else if (category == "프로모션 이벤트") {
          tableName = "promotion";
        } else if (category == "매니저 이야기") {
          tableName = "manager";
        } else if (category == "이번 주 소식") {
          tableName = "weeklynews";
        } else if (category == "체험단시대 YOUTUBE") {
          tableName = "youtube";
        } else if (category == "리얼리뷰") {
          tableName = "realreview";
        } else if (category == "감사해요") {
          tableName = "thankyou";
        }
        const insertData = async () => {
          const insertPayload = {
            title: title,
            description: content,
            thumbImage: paths[0],
            creator: nickname,
            email: email,
            totalImages: paths,
            avatarUrl: avatarUrl,
          };

          if (category === "자랑하기") {
            insertPayload.boastType = postingType;
            insertPayload.avatarUrl = avatarUrl;
          } else if (category === "체험단시대 YOUTUBE") {
            insertPayload.thumbImage = thumbUrl;
            insertPayload.videoUrl = videoUrl;
          }

          // Insert into main table
          let { data, error } = await supabase
            .from(tableName)
            .insert([insertPayload])
            .select("id");

          if (error) {
            console.error("Error inserting data:", error);
            return;
          }

          let postingId = data[0].id;
          console.log("Data inserted successfully. ID:", postingId);

          // Insert into notifications table for specific tableNames
          if (["notification", "promotion", "weeklynews"].includes(tableName)) {
            const notificationPayload = {
              body: title,
              deepLink: `momPlayground://notification/${tableName}/${postingId}`
            };

            const { error: notificationError } = await supabase
              .from("notifications")
              .insert([notificationPayload]);

            if (notificationError) {
              console.error("Error inserting notification:", notificationError);
            }
          } else if (tableName === "youtube") {
            const notificationPayload = {
              body: title,
              deepLink: `momPlayground://review/youtube/${postingId}`
            };

            const { error: notificationError } = await supabase
              .from("notifications")
              .insert([notificationPayload]);

            if (notificationError) {
              console.error("Error inserting notification:", notificationError);
            }
          }

          // Set URL path based on tableName
          if (tableName === "boast") {
            urlPath = `/${tableName}/${postingId}`;
          } else if (["introduction", "notification", "promotion", "manager", "weeklynews"].includes(tableName)) {
            urlPath = `/notification/${tableName}/${postingId}`;
          } else if (["realreview", "thankyou"].includes(tableName)) {
            urlPath = `/review/${tableName}/${postingId}`;
          }

          setIsLoading(false);
          setIsCompleted(true);
          setCategory("자랑하기");
          setTitle("");
          setContent("");
          setThumbUrl("");
          setVideoUrl("");
          setSelectedImages([
            "/images/product/product-3.jpg", // initial placeholder images
          ]);
        };

        insertData();

        // toast("글 작성이 완료 되었습니다.");
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
        setIsLoading(false);
      });
  };

  const handleTitleChange = (e) => {
    const inputTitle = e.target.value;
    if (inputTitle.length > 1000000000000000000) {
      toast.error("최대 30글자까지 입력 가능합니다.");
      setTitle(inputTitle.slice(0, 30));
    } else {
      setTitle(inputTitle);
    }
  };

  const handleContentChange = (e) => {
    const inputContent = e.target.value;
    if (inputContent.length > 100000000000000000) {
      toast.error("최대 1000글자까지 입력 가능합니다.");
      setContent(inputContent.slice(0, 1000));
    } else {
      setContent(inputContent);
    }
  };

  return (
    <div className="py-12 text-black text-sm flex justify-center items-center flex-col w-full">
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">안내</ModalHeader>
              <ModalBody>
                <p>로그인 하신 후에 글작성이 가능합니다.</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={() => {
                    onClose();
                    window.location.href = "/login";
                  }}
                >
                  확인
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="space-y-6 w-full flex justify-center items-center flex-col">
        <div className="flex flex-col gap-y-4 justify-start items-start w-full">
          <div>
            <label className="md:w-16 text-right"> 카테고리 </label>
          </div>

          <div className="flex w-full">
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
          <div className="flex flex-col justify-start items-start gap-y-4 w-full">
            <div>
              <label className="md:w-16 text-right"> 타입 </label>
            </div>

            <div className="w-full">
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
        <div className="flex flex-col items-start justify-center gap-y-4 w-full">
          <div>
            <label className="w-16 text-right"> 제목 </label>
          </div>

          <div className="flex w-full">
            <input
              type="text"
              placeholder="제목을 입력하세요"
              className="w-full"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
        </div>
        {category === "체험단시대 YOUTUBE" && (
          <>
            <div className="flex flex-col items-start justify-center gap-y-4  w-full">
              <div>
                <label className="w-full ">썸네일</label>
              </div>

              <div className="w-full">
                <input
                  type="text"
                  placeholder="이미지 URL을 입력해주세요"
                  className="w-full"
                  value={thumbUrl}
                  onChange={(e) => setThumbUrl(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col items-start justify-center gap-y-4  w-full">
              <div>
                <label className="w-full">영상주소</label>
              </div>

              <div className="w-full">
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

        <div className="flex flex-col items-start gap-y-4 w-full">
          <div>
            <label className="md:w-16 text-right"> 글내용 </label>
          </div>

          <div className="flex w-full">
            <textarea
              className="w-full"
              rows="5"
              placeholder="글 내용을 입력하세요"
              value={content}
              onChange={handleContentChange}
            ></textarea>
          </div>
        </div>
        {category !== "체험단시대 YOUTUBE" && (
          <div className="md:flex items-start w-full gap-10">
            <div className="flex flex-col justify-center items-start">
              <div className="flex justify-center items-center">
                <label className="text-right"> 이미지 </label>
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
                  {image !== "/images/product/product-3.jpg" && (
                    <div className="absolute top-0 right-0">
                      <div
                        className=" rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          const updatedImages = selectedImages.filter(
                            (_, i) => i !== index
                          );
                          setSelectedImages(updatedImages);
                        }}
                      >
                        <MdOutlineCancel className="text-gray-500 text-lg" />
                      </div>
                    </div>
                  )}
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
