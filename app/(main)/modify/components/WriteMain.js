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
import {useSearchParams} from "next/navigation";
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
  const [postingId, setPostingId] = useState(null);
  const [tableName, setTableName] = useState(null);
  const searchParams = useSearchParams();
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

  const getPostingData = async () => {
    const postingId = searchParams.get("postingId");
    const tableName = searchParams.get("second");
    const { data, error } = await supabase
      .from(tableName)
      .select("*")
      .eq("id", postingId)
      .single();
    if (error) {
      console.error("Error fetching posting data:", error);
    } else {
      console.log('postingdata:',data)
      setTitle(data.title);
      setContent(data.description);
      setThumbUrl(data.thumbImage);
      setVideoUrl(data.videoUrl);
      setSelectedImages([...data.totalImages, "/images/product/product-3.jpg"]);
      setPostingId(data.id);
    }
  };  

  const handleSelectCategory = (e) => {
    const postingId = searchParams.get("postingId");
    const tableName = searchParams.get("second");
  
    setPostingId(postingId);
    setTableName(tableName);
  
    
    };
  

  useEffect(() => {
    getUser();
    getPostingData();
    handleSelectCategory();
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
        let data;
        // if (category == "자랑하기") {
        //   tableName = "boast";
        // } else if (category == "회사소개") {
        //   tableName = "introduction";
        // } else if (category == "공지사항") {
        //   tableName = "notification";
        // } else if (category == "프로모션 이벤트") {
        //   tableName = "promotion";
        // } else if (category == "매니저 이야기") {
        //   tableName = "manager";
        // } else if (category == "이번 주 소식") {
        //   tableName = "weeklynews";
        // } else if (category == "체험단시대 YOUTUBE") {
        //   tableName = "youtube";
        // } else if (category == "리얼리뷰") {
        //   tableName = "realreview";
        // } else if (category == "감사해요") {
        //   tableName = "thankyou";
        // }
        const updateData = async () => {
          const updatePayload = {
            title: title,
            description: content,
            thumbImage: paths[0],
            creator: nickname,
            email: email,
          };

          if (category === "자랑하기") {
            updatePayload.totalImages = paths;
            // updatePayload.boastType = postingType;
            updatePayload.avatarUrl = avatarUrl;
          } else if (category === "체험단시대 YOUTUBE") {
            updatePayload.thumbImage = thumbUrl;
            updatePayload.videoUrl = videoUrl;
          }
          let { data, error } = await supabase
          .from(tableName)
          .update(updatePayload)
          .eq('id', postingId)
          .select();

          if (error) {
            console.error("Error inserting data:", error);
          } else {
            // let postingId = data[0].id;
            console.log("tableName:", tableName);
            console.log("postingId:", postingId);
            console.log("Data inserted successfully. ID:", postingId);
            let urlPath;
            if (tableName === "boast") {
              urlPath = `/${tableName}/${postingId}`;
            } else if (
              [
                "introduction",
                "notification",
                "promotion",
                "manager",
                "weeklynews",
              ].includes(tableName)
            ) {
              urlPath = `/notification/${tableName}/${postingId}`;
            } else if (["realreview", "thankyou"].includes(tableName)) {
              urlPath = `/review/${tableName}/${postingId}`;
            }
            router.push(urlPath);
          }
        };
        console.log("data1111:", registerId);
        updateData();

        setIsLoading(false);
        setIsCompleted(true);
        setCategory("자랑하기");
        setTitle("");
        setContent("");
        setSelectedImages([
          "/images/product/product-3.jpg", // initial placeholder images
        ]);
        
        // toast("글 작성이 완료 되었습니다.");
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
        setIsLoading(false);
      });
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
        {/* <div className="flex flex-col gap-y-4 justify-start items-start w-full">
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
        </div> */}
        {/* {category === "자랑하기" && (
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
        )} */}
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
              onChange={(e) => setContent(e.target.value)}
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
          수정
        </Button>
      </div>
    </div>
  );
}

export default page;
