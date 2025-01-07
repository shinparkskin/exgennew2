import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { createClient } from "../../../utils/supabase/client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";

export default function SendReport({ tableName, postingId }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedReason, setSelectedReason] = useState("dislike");

  const supabase = createClient();
  const handleReport = async () => {
    if (!selectedReason) return;

    const { data, error } = await supabase
      .from("report")
      .insert([{ tableName, postingId, reason: selectedReason }]);

    if (error) {
      console.error("Error reporting post:", error);
    } else {
      console.log("신고가 완료되었습니다. ", data);
      toast.error("신고가 완료되었습니다. 24시간 내에 내용 확인하여 추가 조치 할 예정입니다.");
    }
  };
  console.log("selectedReason", selectedReason);
  return (
    <>
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
      <Button color="danger" variant="light" size="sm" onClick={onOpen}>
        신고하기
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black">
                신고하기
              </ModalHeader>
              <ModalBody>
                <h1>이 게시물을 신고하는 이유는 무엇인가요? </h1>
                <p>
                  지적 재산권 침해를 신고하는 경우를 제외하고 귀하의 신고는
                  익명으로 처리됩니다. 누군가 즉각적인 위험에 처해 있는 경우
                  지역 응급 서비스에 전화하세요. 기다리지 마세요.
                </p>
                <RadioGroup
                  value={selectedReason}
                  onValueChange={(value) => setSelectedReason(value)}
                >
                  <Radio value="dislike">그냥 싫어요</Radio>
                  <Radio value="spam">스팸입니다</Radio>
                  <Radio value="nudity">나체 또는 성적 활동</Radio>
                  <Radio value="violence">폭력 또는 위험한 조직</Radio>
                  <Radio value="false-info">허위 정보</Radio>
                  <Radio value="harassment">괴롭힘 또는 괴롭힘</Radio>
                  <Radio value="scam">사기 또는 사기</Radio>
                  <Radio value="intellectual-property">지적 재산권 침해</Radio>
                </RadioGroup>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={() => {
                    onClose();
                    handleReport();
                  }}
                  isDisabled={!selectedReason}
                >
                  제출하기
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
